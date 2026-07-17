import { Paragraph } from 'docx';
import { h1, h2, h3, h4, body, bullet, bulletBold, alertBox, spacer, divider, buildTable, numberedItem, organigramItem } from './helpers';

export const section3Paragraphs: Paragraph[] = [
  h1('SECTION 3 — ORGANISATION DES COMITÉS DE CONTRÔLE ET LIGNES DE REPORTING TIER-1'),
  divider(),
  spacer(),

  h2('3.1 Articulation des comités obligatoires au niveau des filiales et de la Holding'),
  body('Conformément au Règlement COBAC R-2019/01 et aux Circulaires BCEAO 01-03/2017, chaque EMF/SFD de 2ème catégorie doit disposer de comités spécialisés permanents au niveau de son Conseil d\'Administration. La Holding régionale exerce une supervision stratégique et technique sur ces comités sans en détourner les prérogatives.'),
  spacer(),

  h3('3.1.1 Structure des comités obligatoires — Niveau filiale'),
  organigramItem(0, 'CONSEIL D\'ADMINISTRATION LOCAL', 'Filiale EMF/SFD (pays)', 'AG des actionnaires'),
  organigramItem(1, 'Comité d\'Audit et de Conformité (CAC)', 'Filiale EMF/SFD', 'CA local + DG local'),
  organigramItem(2, 'Responsable du Contrôle Interne (RCI)', 'Filiale EMF/SFD', 'CAC local + DG de la Holding'),
  organigramItem(2, 'Responsable de la Conformité (RCC)', 'Filiale EMF/SFD', 'CAC local + DG de la Holding'),
  organigramItem(2, 'Responsable de la Lutte contre le Blanchiment (RLBC)', 'Filiale EMF/SFD', 'RCC local + CAC local'),
  organigramItem(1, 'Comité des Risques et du Crédit (CRC)', 'Filiale EMF/SFD', 'CA local + DG local'),
  organigramItem(2, 'Directeur des Risques (DRC)', 'Filiale EMF/SFD', 'CRC local + DG de la Holding'),
  organigramItem(2, 'Directeur du Crédit (DC)', 'Filiale EMF/SFD', 'DRC local + DG local'),
  organigramItem(1, 'Comité des Nominations et des Rémunérations (CNR)', 'Filiale EMF/SFD', 'CA local'),
  organigramItem(2, 'Président du CNR (Administrateur indépendant)', 'Filiale EMF/SFD', 'CA local'),
  spacer(),

  h3('3.1.2 Tableau de composition des comités — Niveau filiale'),
  buildTable(
    ['Comité', 'Composition obligatoire', 'Fréquence', 'Attributions principales', 'Référence'],
    [
      ['Comité d\'Audit et de Conformité (CAC)', '3 membres minimum : 2 administrateurs indépendants (dont le Président du CAC) + 1 administrateur non-exécutif. Le DG et le DAF assistent avec voix consultative. Le CAC de la Holding peut être invité.', 'Minimum 4 réunions par an + réunions d\'urgence', 'Surveillance du contrôle interne, de la conformité réglementaire, des états financiers, des relations avec le CAC externe, de la politique LBC/FT', 'BCEAO Circulaire 01/2017 Art. 5 ; COBAC R-2019/01 Art. 4'],
      ['Comité des Risques et du Crédit (CRC)', '3 membres minimum : 2 administrateurs indépendants + 1 administrateur non-exécutif. Le DRC, le DC et le DG assistent avec voix consultative.', 'Minimum 4 réunions par an + réunions mensuelles si portefeuille à risque > 10% du total', 'Définition de la politique de risques, validation des plafonds de crédit, suivi des impayés, provisioning, concentration, risque de change, risque de liquidité', 'BCEAO Circulaire 03/2017 Art. 4 ; COBAC R-2017/05 Art. 12'],
      ['Comité des Nominations et Rémunérations (CNR)', '2 administrateurs indépendants minimum + 1 administrateur non-exécutif. Le DG ne peut pas être membre. Le CNR de la Holding est informé.', '2 réunions par an + réunions extraordinaires', 'Sélection des candidats aux fonctions clés, procédure Fit and Proper, fixation des rémunérations, politique de succession, clauses de malus/clawback', 'BCEAO Circulaire 02/2017 Art. 3 ; COBAC R-2023/01 Art. 10'],
    ],
    { colWidths: [18, 28, 14, 28, 12], boldFirstCol: true }
  ),
  spacer(),

  h3('3.1.3 Supervision par la Holding — Niveau régional'),
  body('La Holding Régionale (Cameroun) dispose de ses propres comités qui supervisent les comités locaux par un mécanisme de « double supervision » :'),
  bullet('Le Comité d\'Audit et de Conformité de la Holding (CAC-H) examine les rapports de conformité de toutes les filiales et émet des recommandations transversales.'),
  bullet('Le Comité des Risques de la Holding (CR-H) agrège les indicateurs de risque de toutes les filiales et surveille les concentrations inter-filiales.'),
  bullet('Le Comité des Nominations de la Holding (CN-H) valide les candidatures aux fonctions clés (DG, DGA, DRC, RCC, RCI) avant soumission au régulateur.'),
  bullet('Les Présidents des comités locaux assistent aux réunions des comités de la Holding à titre consultatif, au minimum 2 fois par an.'),
  spacer(),

  h2('3.2 Double ligne de reporting (Dual-Reporting Line) des Fonctions de Contrôle Clés'),
  alertBox('Les Fonctions de Contrôle Clés (RCC, RCI, RLBC) doivent bénéficier d\'une double ligne de reporting : fonctionnelle au Board local et opérationnelle à la Holding. Cette dualité est la seule garantie de leur indépendance vis-à-vis des lignes de métier. Son absence est un motif de non-conformité majeur.', 'critical'),
  spacer(),

  h3('3.2.1 Schéma de la Dual-Reporting Line'),
  organigramItem(0, 'FONCTIONS DE CONTRÔLE CLÉS', 'Filiale EMF/SFD', 'Double reporting'),
  organigramItem(1, 'Ligne Fonctionnelle (Board Local)', 'CAC local + CA local', 'Validation des objectifs, évaluation de la performance, validation du budget fonctionnel, protection contre les représailles'),
  organigramItem(1, 'Ligne Opérationnelle (Holding)', 'DG de la Holding + DRC de la Holding + RCC de la Holding', 'Alignement des standards, partage des bonnes pratiques, formation continue, outils de surveillance transversaux, remontée des alertes transfrontalières'),
  organigramItem(1, 'Ligne de Métier (DÉCONSEILLÉE)', 'DG local + lignes commerciales', 'Informations opérationnelles uniquement — AUCUNE autorité hiérarchique sur les décisions de contrôle'),
  spacer(),

  h3('3.2.2 Tableau de synthèse — Dual-Reporting par fonction de contrôle'),
  buildTable(
    ['Fonction', 'Ligne fonctionnelle (Board)', 'Ligne opérationnelle (Holding)', 'Ligne de métier (Informationnelle)', 'Sanction si déviation'],
    [
      ['Responsable du Contrôle Interne (RCI)', 'CAC local : validation du plan de contrôle, évaluation des résultats, protection des lanceurs d\'alerte', 'DG Holding : alignement des standards de contrôle, audit transversal, formation', 'DG local : informations sur les opérations commerciales — SANS INFLUENCE sur le contrôle', 'Révocation de l\'agrément du DG local ; Mise en cause de la conformité de la filiale'],
      ['Responsable de la Conformité (RCC)', 'CAC local : validation de la politique de conformité, suivi des réquisitions réglementaires, relations avec le régulateur', 'DG Holding + RCC Holding : standards de conformité groupe, veille réglementaire, reporting transversal', 'DG local : coordination opérationnelle — SANS AUTORITÉ HIÉRARCHIQUE', 'Rejet de l\'agrément ; Poursuite disciplinaire du DG local'],
      ['Responsable LBC/FT (RLBC)', 'CAC local : validation du dispositif LBC/FT, déclarations CENTIF/TRACFIN, suivi des dossiers à haut risque', 'DG Holding + RCC Holding : standards LBC/FT groupe, partage des informations sur les clients transfrontaliers, formation', 'DG local : coordination des opérations de déclaration — SANS INFLUENCE sur les décisions de déclaration', 'Révocation de l\'agrément ; Transmission au Procureur pour blanchiment'],
    ],
    { colWidths: [16, 24, 24, 24, 12], boldFirstCol: true }
  ),
  spacer(),

  h3('3.2.3 Garanties d\'indépendance des fonctions de contrôle'),
  numberedItem(1, 'Budget fonctionnel autonome : Le budget du RCI, du RCC et du RLBC est déterminé par le CAC local et validé par le CA local. Il ne peut être réduit par le DG local sans l\'accord du CAC.'),
  numberedItem(2, 'Accès direct au Board : Les fonctions de contrôle ont un accès direct et permanent au Président du CAC et aux administrateurs indépendants, sans l\'intermédiaire du DG.'),
  numberedItem(3, 'Protection des lanceurs d\'alerte : Le RCI, le RCC et le RLBC bénéficient d\'une protection renforcée s\'ils signalent des dysfonctionnements au CAC ou au régulateur.'),
  numberedItem(4, 'Rotation et mobilité : Les fonctions de contrôle ne peuvent être nommées par le DG local. Leur nomination relève du CNR, validée par le CA local et le CA de la Holding.'),
  numberedItem(5, 'Évaluation de la performance : L\'évaluation du RCI, du RCC et du RLBC est réalisée par le CAC local (et non par le DG local), sur la base de critères objectifs liés à la qualité du contrôle et de la conformité.'),
  spacer(),

  h2('3.3 Comités de la Holding et articulation transversale'),
  h3('3.3.1 Comité d\'Audit et de Conformité de la Holding (CAC-H)'),
  body('Le CAC-H est l\'organe de supervision transversale de la conformité et du contrôle interne de l\'ensemble des entités du Groupe. Il se réunit 4 fois par an minimum.'),
  bullet('Composition : 3 administrateurs indépendants de la Holding + 1 administrateur non-exécutif + 1 représentant des CAC locaux (à tour de rôle).'),
  bullet('Attributions : Examen des rapports de conformité des filiales, validation des politiques transversales, suivi des réquisitions réglementaires, supervision des audits internes groupe, validation des relations avec les CAC externes des filiales.'),
  bullet('Lien avec les filiales : Le CAC-H reçoit les rapports trimestriels du RCI, du RCC et du RLBC de chaque filiale. Il peut convoquer les responsables de contrôle locaux en réunion.'),
  spacer(),

  h3('3.3.2 Comité des Risques de la Holding (CR-H)'),
  body('Le CR-H supervise la politique de risques de l\'ensemble du Groupe et veille à la cohérence des pratiques de crédit et de gestion des risques entre les filiales.'),
  bullet('Composition : 3 administrateurs indépendants de la Holding + le DG de la Holding + le DRC de la Holding.'),
  bullet('Attributions : Définition des standards de gestion des risques groupe, agrégation des indicateurs de risque, suivi des concentrations inter-filiales, validation des modèles de scoring transversaux, supervision du risque de change et du risque de liquidité transfrontaliers.'),
  bullet('Lien avec les filiales : Le CR-H reçoit les tableaux de bord des risques des filiales. Il émet des recommandations de limitation des risques transfrontaliers.'),
  spacer(),

  h3('3.3.3 Comité des Nominations de la Holding (CN-H)'),
  body('Le CN-H centralise la gestion des talents et la sélection des dirigeants pour l\'ensemble des entités du Groupe.'),
  bullet('Composition : 2 administrateurs indépendants de la Holding + 1 administrateur non-exécutif. Le DG de la Holding assiste avec voix consultative.'),
  bullet('Attributions : Validation des candidatures aux fonctions clés (DG, DGA, DRC, RCC, RCI), vérification des critères Fit and Proper, organisation des enquêtes de moralité, définition de la politique de succession, supervision des clauses de malus/clawback.'),
  bullet('Lien avec les filiales : Le CN-H examine les candidats proposés par les CNR locaux. Il peut proposer des candidats externes. Il informe le CNR local de sa décision.'),
  spacer(),

  h3('3.3.4 Tableau de synthèse — Articulation des comités Holding vs Locaux'),
  buildTable(
    ['Comité', 'Niveau Holding', 'Niveau Filiale', 'Fréquence de coordination', 'Mode de coordination'],
    [
      ['CAC', 'CAC-H : supervision transversale, standards groupe, audit interne', 'CAC local : contrôle interne, conformité locale, relations CAC externe', 'Trimestrielle (4 réunions / an)', 'Rapports trimestriels du RCI/RCC/RLBC local vers CAC-H + Réunions communes annuelles'],
      ['CRC', 'CR-H : agrégation des risques, standards scoring, concentration transfrontalière', 'CRC local : politique crédit, plafonds, provisioning, impayés', 'Trimestrielle (4 réunions / an)', 'Tableaux de bord des risques locaux vers CR-H + Alertes immédiates en cas de dépassement de seuils'],
      ['CNR', 'CN-H : validation des candidats, Fit and Proper, succession', 'CNR local : propositions de candidats, évaluation des dirigeants locaux', 'Semestrielle (2 réunions / an)', 'Candidatures locales transmises au CN-H pour validation avant soumission au régulateur'],
    ],
    { colWidths: [12, 28, 28, 16, 16], boldFirstCol: true }
  ),
  spacer(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];