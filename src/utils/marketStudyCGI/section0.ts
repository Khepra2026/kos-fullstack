import { Paragraph, Table } from 'docx';
import {
  sp, h1, h2, h3, body, bullet, tbl, kpiRow, pb, infoBox, successBox, alertBox,
} from '@/utils/businessPlanCGI/helpers';

export function section0(): (Paragraph | Table)[] {
  return [
    h1('EXECUTIVE SUMMARY — SYNTHÈSE STRATÉGIQUE'),
    sp(),

    h2('1. Synthèse du marché des granulats en Afrique de l\'Ouest'),
    body('L\'Afrique de l\'Ouest constitue l\'un des marchés les plus dynamiques au monde pour les matériaux de construction, avec une demande structurelle en granulats concassés estimée à 45 millions de tonnes par an (TAM), représentant une valeur de 360 milliards de FCFA. Le marché connaît une croissance annuelle moyenne (CAGR) de +4,8 %, portée par l\'urbanisation galopante, les programmes d\'infrastructures régionaux et les investissements publics massifs. Dans le périmètre adressable par CGI SA (SAM : Togo, Bénin, Ghana — rayon 500 km), la demande atteint 8,5 millions de tonnes par an (68 Mds FCFA), avec une croissance structurelle de +4,2 %/an sur 2026-2036.'),
    sp(),
    body('Le Togo, marché prioritaire de CGI SA, présente un déficit structurel chronique : la demande nationale est évaluée à 3,2 millions de tonnes par an, tandis que la production nationale ne couvre que 2,5 millions de tonnes, laissant un écart de 700 000 tonnes comblé par des importations coûteuses depuis le Ghana et le Bénin. Ce déséquilibre structurel, confirmé par les données de la Direction Générale des Mines du Togo (DGMG, 2024) et l\'INSEED (2023), constitue l\'opportunité fondamentale du projet.'),
    sp(),

    h2('2. Opportunités commerciales clés'),
    sp(),
    bullet('Fenêtre de marché 2026-2028 : Aucun nouveau producteur industriel de grande envergure n\'est annoncé au Togo avant 2028. CGI SA dispose d\'une fenêtre stratégique de 2 à 3 ans pour consolider sa position industrielle et commerciale avant toute réaction concurrentielle majeure de Granutogo.'),
    sp(),
    bullet('Contrat cadre CIMCO : La base installée de 150 000 tonnes par an (19 % du SOM cible) réduit le risque de démarrage commercial et fournit un revenu prévisible dès la première année d\'exploitation. Ce contrat, négocié en 2025, démontre la traction commerciale réelle du projet.'),
    sp(),
    bullet('Export Bénin : Le déficit structurel béninois (700 000 T/an) offre un marché immédiat et peu concurrentiel, avec des prix supérieurs au marché togolais de 8 à 12 %. CGI SA peut capter 50 000 à 80 000 tonnes par an via des contrats cadres B2B avec les grands entrepreneurs béninois (SETSTO, EGIS Bénin, Colas Bénin).'),
    sp(),
    bullet('Spécialité haute résistance : Ce segment premium, à forte marge (48-55 %), est sous-alimenté dans toute la CEDEAO. CGI SA est l\'un des trois seuls producteurs capables de certifier des granulats > 120 MPa, avec une demande adressée de 155 000 tonnes par an.'),
    sp(),
    bullet('Avantage logistique nord : La position de Siyimé à 150 km de Lomé et 176 km de Cotonou confère à CGI SA un avantage logistique de 20 à 40 % par rapport aux carrières du sud du Togo, réduisant les coûts de transport et les délais de livraison.'),
    sp(),

    h2('3. Contraintes réglementaires et institutionnelles'),
    sp(),
    body('Le cadre réglementaire togolais, bien que favorable à l\'investissement industriel, impose des contraintes significatives en matière de conformité :'),
    sp(),
    bullet('Code Minier Loi 2014-010 (Togo) : L\'exploitation de granulats industriels requiert un permis d\'exploitation délivré par la DGMG, un plan d\'exploitation et de réhabilitation (PER), et une caution environnementale. CGI SA détient déjà le permis DGMG pour la Phase 1 (24 ha), éliminant la principale barrière réglementaire.'),
    sp(),
    bullet('OHADA AUSC (Acte Uniforme relatif au Droit des Sociétés Commerciales et du GIE) : Les obligations de gouvernance (conseil d\'administration, commissaires aux comptes, publication des comptes) s\'appliquent pleinement à CGI SA dès l\'exercice 2026. Le coût de conformité est estimé à 45 M FCFA par an.'),
    sp(),
    bullet('Normes LNBTP et NF EN 12620 : La certification LNBTP est obligatoire pour l\'accès aux marchés publics ARMP > 50 M FCFA. CGI SA a obtenu la certification complète pour 7 classes granulométriques, représentant un investissement de 85 M FCFA en équipements de laboratoire et de 12 M FCFA par an en audits.'),
    sp(),
    bullet('Politique environnementale : L\'étude d\'impact environnemental (EIE) et le plan de gestion environnementale et sociale (PGES) sont requis par la Direction de l\'Environnement (DGE) avant toute mise en service. CGI SA a soumis son PGES en mars 2025, en conformité avec les Performance Standards IFC (PS 1 à 8).'),
    sp(),

    h2('4. Enjeux ESG (Environnement, Social, Gouvernance)'),
    sp(),
    body('Les enjeux ESG représentent à la fois des contraintes réglementaires et des opportunités de différenciation pour CGI SA :'),
    sp(),
    bullet('Environnement : Le secteur des carrières est soumis à une surveillance croissante des bailleurs (IFC, BAD, BIDC) sur la gestion des poussières, des eaux de ruissellement et de la réhabilitation des sites. Le coût de conformité ESG environnementale est estimé à 180 M FCFA (centrale solaire 3-4 MWc, système de suppression des poussières, lagunage des eaux).'),
    sp(),
    bullet('Social : L\'exploitation de Siyimé implique la création de 85 emplois directs et 200 emplois indirects. Les attentes des communautés locales (formation, infrastructures communautaires, partenariat agricole) sont formalisées dans le Plan d\'Action de Réinstallation (PAR) et le Plan de Développement Communautaire (PDC), conformes aux normes IFC PS 5 (Acquisition de Terres et Relocalisation Involontaire).'),
    sp(),
    bullet('Gouvernance : Les bailleurs internationaux (BIDC, BAD, IFC) exigent un niveau de gouvernance « investment grade » : conseil d\'administration indépendant (minimum 3 administrateurs non exécutifs), comité d\'audit, commissaire aux comptes externe, et politique anticorruption. CGI SA a structuré sa gouvernance en conséquence, avec un coût annuel de 75 M FCFA.'),
    sp(),
    bullet('Coût total de conformité ESG : 342 M FCFA sur 2026-2028, soit 4,3 % du CAPEX total. Ce coût est amplement compensé par l\'accès aux financements concessionnels (BIDC : taux 5,5 %, 12 ans) et par la prime ESG sur les contrats internationaux (5-8 % de premium sur les granulats certifiés ESG).'),
    sp(),

    h2('5. Risques clés et évaluation'),
    sp(),
    body('L\'analyse des risques identifie 7 familles de risques, évaluées selon leur probabilité et leur impact financier potentiel :'),
    sp(),

    tbl(
      ['Risque', 'Probabilité', 'Impact', 'Mitigation principale', 'Coût mitigation (M FCFA)'],
      [
        ['Réglementaire (retard permis, nouvelles taxes)', 'Moyenne (25%)', 'Retard 6-12 mois', 'Permis DGMG déjà acquis, avocats spécialisés, lobbying institutionnel', '15'],
        ['ESG (non-conformité, sanctions bailleurs)', 'Faible (15%)', 'Suspension financement', 'PGES IFC soumis, audits trimestriels, consultant ESG', '45'],
        ['Macroéconomique (inflation, change, taux)', 'Élevée (45%)', 'Baisse marge 3-5 pts', 'Contrats en FCFA, couverture change, prix indexé', '20'],
        ['Logistique (routes, congestion, carburant)', 'Moyenne (30%)', 'Hausse coût transport 10-15%', 'Contrats logistiques long terme, centrale solaire, camions propres', '120'],
        ['Énergétique (coût électricité, pénurie)', 'Moyenne (35%)', 'Baisse marge 3-5 pts', 'Centrale solaire 3-4 MWc (réduction 35% facture)', '280'],
        ['Climatique (inondations, saison sèche)', 'Moyenne (25%)', 'Arrêt production 15-30 jours/an', 'Bassin de rétention, planification maintenance saison sèche', '60'],
        ['Politique (changement gouvernement, instabilité)', 'Faible (10%)', 'Retard projets publics', 'Diversification client (export, privé), relations multipartisanes', '10'],
      ],
      [22, 14, 14, 35, 15]
    ),
    sp(),

    h2('6. Conclusion stratégique et recommandation'),
    sp(),
    body('Au terme de cette étude de marché institutionnelle, KHEPRA EXPERTS formule un jugement final favorable au projet CGI SA, avec les conclusions suivantes :'),
    sp(),
    bullet('Marché exceptionnellement porteur : Le TAM de 45 M T/an, le SAM de 8,5 M T/an, et le déficit structurel togolais de 700 000 T/an créent un environnement de marché exceptionnellement favorable. Le SOM cible de 795 000 T/an (9,4 % du SAM) est réaliste, prudent, et directement corrélé à des programmes d\'investissement publics vérifiables.'),
    sp(),
    bullet('Positionnement unique et défendable : CGI SA dispose de cinq avantages cumulatifs (logistique nord, technologie METSO, gisement 201 ha / 50M+ T, certification LNBTP complète, flexibilité industrielle) créant des barrières à l\'entrée de 3 à 5 ans. Aucun concurrent actuel ne peut répliquer l\'ensemble de ces avantages à court ou moyen terme.'),
    sp(),
    bullet('Rentabilité confirmée : Avec une marge brute moyenne de 37,1 %, un DSCR de 1,85x (scénario central), et un TRI de 16,8 %, le projet dépasse largement les seuils de rentabilité exigés par les bailleurs de fonds institutionnels (BIDC : DSCR > 1,30x ; BAD : TRI > 12 %).'),
    sp(),
    bullet('Conformité réglementaire et ESG maîtrisée : Les permis sont acquis, le PGES IFC est soumis, la gouvernance est structurée, et le budget de conformité ESG (342 M FCFA) est intégré dans le plan de financement sans dégradation des indicateurs de rentabilité.'),
    sp(),
    bullet('Bancabilité avérée : Le projet remplit l\'ensemble des critères de bancabilité des institutions de financement du développement : marché vérifié, contrat cadre existant, technologie éprouvée, équipe expérimentée, gouvernance robuste, ESG conforme, et modèle financier stress-testé.'),
    sp(),

    successBox('Jugement final KHEPRA EXPERTS : RECOMMANDATION FAVORABLE. Le projet CGI SA présente un profil commercial, technique, financier et ESG exceptionnel. Nous recommandons favorablement l\'investissement et le financement du projet aux standards des comités d\'investissement IFC, BAD et BIDC.'),
    sp(),

    kpiRow([
      { label: 'TAM Afrique de l\'Ouest', value: '45 M T/an', sub: '360 Mds FCFA — CAGR +4,8%' },
      { label: 'SAM (rayon 500 km)', value: '8,5 M T/an', sub: '68 Mds FCFA — Togo/Bénin/Ghana' },
      { label: 'SOM cible 2028', value: '795 K T/an', sub: '9,4% du SAM — 6,4 Mds FCFA' },
      { label: 'Marge brute moyenne', value: '37,1%', sub: 'Segments standards + spécialité' },
    ]),
    sp(),

    infoBox('Sources : Banque Mondiale — « West Africa BTP & Extractive Industries Outlook 2024 » | FMI — « Regional Economic Outlook : Sub-Saharan Africa, October 2024 » | BCEAO — « Note de conjoncture économique UEMOA, T4 2024 » | INSEED Togo — « Annuaire statistique 2023 » | DGMG Togo — « Rapport annuel 2024 » | LNBTP — « Cahier des charges granulats 2023 » | IFC — « Performance Standards 1-8, 2012 » | BAD — « Governance Guidelines for Private Sector Operations, 2021 ».'),
    pb(),
  ];
}



