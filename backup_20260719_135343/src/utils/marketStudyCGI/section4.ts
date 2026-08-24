import {
  Paragraph, Table,
} from 'docx';
import {
  sp, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox,
} from '@/utils/businessPlanCGI/helpers';

export function section4(): (Paragraph | Table)[] {
  return [
    h1('SECTION IV — ANALYSE CONCURRENTIELLE ET POSITIONNEMENT'),
    sp(),

    h2('IV.1 Introduction — Cartographie concurrentielle'),
    body('Le marché des granulats au Togo est structuré autour de trois catégories d\'acteurs : (i) le producteur industriel dominant (Granutogo), (ii) une myriade de carrières artisanales et semi-industrielles concentrées dans le sud du pays, et (iii) des importateurs ponctuels depuis le Ghana et le Bénin. CGI SA entre dans ce marché comme un nouvel acteur industriel de grande envergure, positionné dans le nord du Togo avec des avantages logistiques et qualitatifs distinctifs.'),
    sp(),

    h2('IV.2 Acteur dominant : Granutogo'),
    sp(),
    body('Granutogo, filiale du Groupe EBOMAF (groupe BTP togolais de référence), est le principal producteur industriel de granulats au Togo. Son positionnement, ses forces et ses faiblesses structurelles déterminent le cadre concurrentiel dans lequel CGI SA évoluera.'),
    sp(),

    h3('IV.2.1 Profil opérationnel et stratégique'),
    body('Granutogo opère trois sites d\'extraction dans la région Maritime (sud du Togo), avec une capacité totale de 450 TPH répartie sur les trois sites. Le groupe EBOMAF est également un grand consommateur interne de granulats, ce qui assure à Granutogo une base de clientèle captive significative.'),
    sp(),

    tbl(
      ['Paramètre', 'Granutogo (données publiques + estimation KHEPRA)'],
      [
        ['Capacité totale', '450 TPH (3 sites : Adawlato, Kévé, Aného)'],
        ['Production annuelle', '1 200 000 à 1 500 000 T/an'],
        ['Parts de marché (Togo)', '55-60 % du marché national'],
        ['Certification', 'LNBTP partielle (2 classes seulement : 0/31,5 et 15/25)'],
        ['Technologie', 'Equipements chinois (non METSO), âge moyen 8-12 ans'],
        ['Gamme produit', '5 classes granulométriques'],
        ['Prix de vente moyen', '9 500 FCFA/T (sud Lomé, transport inclus)'],
        ['Coût logistique Lomé', '2 800-3 500 FCFA/T (dist. moyenne 80 km)'],
        ['Clientèle', 'EBOMAF (40%), marchés publics (30%), promoteurs (20%), export (10%)'],
        ['Faiblesses identifiées', 'Concentration sud, équipements vieillissants, gamme limitée, pas de spécialité'],
      ],
      [35, 65]
    ),
    sp(),

    h3('IV.2.2 Forces de Granutogo'),
    body('Granutogo bénéficie d\'atouts significatifs qui en font un concurrent de poids :'),
    sp(),
    bullet('Intégration verticale avec EBOMAF : 40% de la production est absorbée par le groupe mère, garantissant un revenu de base stable et réduisant le risque commercial.'),
    bullet('Positionnement sud : Proximité immédiate de Lomé (30-80 km), réduisant les coûts de transport vers le plus grand marché du Togo.'),
    bullet('Notoriété établie : 15 ans de présence sur le marché, portefeuille client fidélisé, relations institutionnelles avec les administrations publiques.'),
    bullet('Capacité financière : Appartenance au Groupe EBOMAF (CA 2019 : 38,5 Mds FCFA) fournit un accès au financement bancaire et une capacité d\'investissement.'),
    sp(),

    h3('IV.2.3 Faiblesses structurelles de Granutogo'),
    body('Malgré sa position dominante, Granutogo présente des vulnérabilités que CGI SA peut exploiter :'),
    sp(),
    bullet('Équipements obsolètes : Technologie chinoise de génération 2012-2016, taux de disponibilité estimé à 75-80% (vs 95% pour METSO). Risque croissant de pannes et d\'arrêts de maintenance imprévus.'),
    bullet('Qualité hétérogène : Certification LNBTP partielle (2 classes seulement). Pas de granulats haute résistance. Variabilité des paramètres LA et MDE d\'un site à l\'autre.'),
    bullet('Concentration excessive au sud : Aucune présence dans le nord et le centre du Togo. Les chantiers de Kara, Dapaong, Sokodé, Atakpamé doivent importer depuis Lomé ou le Ghana, avec des coûts de transport prohibitifs (5 000-7 000 FCFA/T).'),
    bullet('Structure de coûts élevée : Coûts logistiques vers Lomé de 2 800-3 500 FCFA/T en raison de la congestion routière sur l\'axe N1 (Lomé-Tabligbo).'),
    bullet('Pas de stratégie export : Aucune présence au Bénin ou au Ghana. L\'export représente moins de 10% de la production, et seulement vers des marchés opportunistes.'),
    bullet('Rigidité granulométrique : Difficulté à ajuster rapidement la production d\'une classe à l\'autre en fonction des commandes. Pas de sable de concassage fin (0/2, 0/5) de qualité constante.'),
    sp(),
    infoBox('Source : Groupe EBOMAF — « Rapport annuel 2019 » (dernier rapport public disponible) | Granutogo — fiches techniques produit (site web, 2024) | Entretiens KHEPRA EXPERTS avec 4 bureaux d\'études togolais (BECE, SETSTO, EGIS) | Visites techniques sur site Adawlato (KHEPRA, février 2025) | ARMP Togo — données des marchés publics attribués à Granutogo (2022-2024).'),

    h2('IV.3 Carrières artisanales et semi-industrielles'),
    sp(),
    body('Le marché togolais compte environ 40 à 60 carrières artisanales et semi-industrielles, principalement situées dans la région Maritime et le plateau des Batéké. Ces acteurs représentent 25-30% de la production nationale mais souffrent de handicaps structurels majeurs.'),
    sp(),

    tbl(
      ['Paramètre', 'Carrières artisanales (moyenne)'],
      [
        ['Nombre estimé', '40 à 60 sites actifs'],
        ['Capacité unitaire', '20-50 TPH'],
        ['Production totale', '600 000 à 900 000 T/an'],
        ['Part de marché', '25-30 %'],
        ['Certification', 'Aucune — produits non normalisés'],
        ['Technologie', 'Concasseurs à mâchoires artisanaux, cribles manuels'],
        ['Prix de vente', '5 500-7 500 FCFA/T (bas de gamme)'],
        ['Qualité', 'Très hétérogène — LA > 35, MDE > 25, absorption > 3%'],
        ['Clientèle', 'Artisans du BTP, petits promoteurs, auto-construction'],
        ['Impact concurrentiel', 'Faible sur le segment industriel — menace sur le bas de gamme'],
      ],
      [35, 65]
    ),
    sp(),

    h3('IV.3.1 Impact concurrentiel réel'),
    body('Les carrières artisanales ne constituent pas une menace directe pour CGI SA sur le segment industriel et les marchés publics, pour trois raisons :'),
    sp(),
    bullet('Non-conformité normative : Absence de certification LNBTP et de conformité NF EN 12620. Les bureaux d\'études et les maîtres d\'ouvrage publics (ARMP) exigent systématiquement des certificats de conformité LNBTP pour les marchés > 50 M FCFA.'),
    bullet('Fiabilité opérationnelle : Les concasseurs artisanaux ont un taux de disponibilité de 40-60%, avec des arrêts fréquents pour pannes et manque de pièces de rechange. Impossibilité de garantir des volumes > 500 T/mois avec régularité.'),
    bullet('Prix vs qualité : Bien que les prix soient 20-30% inférieurs à CGI SA, la qualité hétérogène génère des surcoûts importants pour les entrepreneurs (reprises, réparations, non-conformité). Sur le coût total de possession (TCO), les granulats certifiés CGI SA sont 15-20% moins chers.'),
    sp(),
    body('La menace réelle des carrières artisanales porte sur le segment bas de gamme (remblaiement, terrassement, fondations non structurales), où le prix prime sur la qualité. CGI SA adressera ce segment via le « rebut / tout-venant » (3% de la production, marge 16%), sans y consacrer de ressources commerciales stratégiques.'),
    sp(),

    h2('IV.4 Importateurs et producteurs étrangers'),
    sp(),
    body('Le Togo importe ponctuellement des granulats depuis le Ghana et le Bénin, principalement pour des projets spécifiques nécessitant des granulats haute résistance non disponibles localement. Cette concurrence reste marginale mais stratégique sur le segment premium.'),
    sp(),

    tbl(
      ['Origine', 'Producteurs clés', 'Volume importé (T/an)', 'Prix CIF Lomé (FCFA/T)', 'Segments ciblés'],
      [
        ['Ghana — Accra / Tema', 'Eastern Quarries, Kaneshie Quarry, Prime Stone', '80 000-120 000', '11 000-14 000', 'Haute résistance, ouvrages d\'art'],
        ['Bénin — Cotonou', 'CimBénin Granulats, SONAPIER', '40 000-60 000', '9 500-12 000', 'Béton structure, routes'],
        ['Ghana — Takoradi', 'West Rock, Consar Stone', '15 000-25 000', '12 000-15 000', 'Béton marin, ouvrages portuaires'],
      ],
      [18, 30, 20, 20, 12]
    ),
    sp(),
    body('Les importateurs sont vulnérables à trois facteurs : (i) la volatilité du taux de change Cedi/FCFA et Naira/FCFA, (ii) les coûts de transport international (douanes, transit, assurances), et (iii) les délais de livraison (3-7 jours vs 24-48h pour CGI SA). CGI SA peut capter une part significative de ces importations (50 000-80 000 T/an) en proposant une alternative locale certifiée à prix compétitif.'),
    sp(),

    h2('IV.5 Matrice de positionnement stratégique CGI SA'),
    sp(),
    body('La position concurrentielle de CGI SA se définit par la combinaison de cinq avantages différenciateurs, formalisés dans la matrice suivante :'),
    sp(),

    tbl(
      ['Avantage concurrentiel', 'Description', 'Impact sur le marché', 'Barrière à la réplication'],
      [
        ['Avantage logistique nord', '150 km de Lomé, 176 km de Cotonou — coûts transport -20 à -40% vs sud', 'Captation des marchés du centre et nord Togo + Bénin oriental', 'Investissement CAPEX (8 899 M FCFA) + permis DGMG'],
        ['Technologie METSO', 'Nordberg C120 + HP300 — fiabilité 95%, conformité NF EN 12620', 'Certification LNBTP complète, 7 classes granulométriques', 'CAPEX + expertise technique + formation'],
        ['Gisement exceptionnel', '201 ha global, 50M+ tonnes, Phase 1 = 24 ha viabilisés, masse volumique 2,63 g/cm³', 'Sécurité d\'approvisionnement > 100 ans, traçabilité qualité', 'Permis DGMG + investissement fondateur 2,1 Mds FCFA'],
        ['Certification LNBTP complète', 'Toutes classes granulométriques + granulats haute résistance', 'Accès aux marchés publics ARMP + grands chantiers internationaux', 'Processus qualité continu, labo intégré, audits LNBTP'],
        ['Flexibilité industrielle', 'Réglage rapide des cribles, production à la commande, lots traçables', 'Service personnalisé pour grands comptes et projets spécifiques', 'Formation opérateurs + système informatique de production'],
      ],
      [22, 32, 26, 20]
    ),
    sp(),

    h2('IV.6 Scénarios de réaction concurrentielle'),
    sp(),
    body('La réaction des concurrents face à l\'entrée de CGI SA sur le marché peut suivre plusieurs scénarios, avec des probabilités et des impacts évalués :'),
    sp(),

    tbl(
      ['Scénario', 'Probabilité', 'Description', 'Impact CGI SA', 'Contre-mesure'],
      [
        ['Aucune réaction (statu quo)', '35 %', 'Granutogo maintient sa stratégie sud, carrières artisanales incapables de réagir', 'Positif — CGI SA capte 9-12% du SAM en 3 ans', 'Accélérer Programme 1 et 2'],
        ['Réduction de prix (guerre des prix)', '25 %', 'Granutogo réduit ses prix de 10-15% sur le segment 0/31,5', 'Négatif court terme — marge compressée de 5-8 pts', 'Développer segments spécialité (marges 48-52%)'],
        ['Extension vers le nord (Granutogo)', '20 %', 'Granutogo tente d\'ouvrir un site dans la région des Plateaux ou Centrale', 'Modéré — retard de 2-3 ans, capacité limitée', 'Consolider position nord via contrats exclusifs'],
        ['Alliance / partenariat', '15 %', 'Granutogo propose un partenariat commercial ou un rachat partiel', 'Opportunité — mutualisation logistique, accès clientèle EBOMAF', 'Évaluer après validation de la position propre'],
        ['Réglementation restrictive', '5 %', 'Lobbying pour restreindre les nouveaux permis d\'exploitation', 'Faible — Code Minier protecteur, permis DGMG acquis', 'Renforcer relations institutionnelles (DGMG, ARMP)'],
      ],
      [22, 15, 28, 20, 15]
    ),
    sp(),
    body('Le scénario le plus probable (35%) est le statu quo, Granutogo étant satisfait de sa position dominante dans le sud et les carrières artisanales n\'ayant ni la capacité financière ni la technologie pour concurrencer CGI SA sur le segment industriel. Le scénario de guerre des prix (25%) constitue le principal risque commercial, mais il est atténué par la stratégie de différenciation sur les segments spécialité et par l\'avantage logistique structurel.'),
    sp(),
    successBox('Conclusion Section IV : CGI SA dispose d\'un positionnement concurrentiel solide, fondé sur cinq avantages différenciateurs cumulatifs (logistique nord, technologie METSO, gisement 201 ha/50M+ T, certification LNBTP complète, flexibilité industrielle). Les concurrents actuels ne peuvent répliquer l\'ensemble de ces avantages avant 3 à 5 ans. La probabilité d\'une guerre des prix est modérée (25%) et gérable via la stratégie de spécialité.'),
    pb(),
  ];
}



