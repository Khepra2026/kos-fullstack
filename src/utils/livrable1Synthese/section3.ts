import { Paragraph, TextRun, AlignmentType } from 'docx';
import { TEAL, DARK, RED, AMBER, h1, h2, h3, body, bulletBold, alertBox, buildTable, divider, numberedItem } from './helpers';

export const section3Paragraphs: Paragraph[] = [
  h1('PARTIE III — ARCHITECTURE DE GOUVERNANCE CONDENSÉE'),
  divider(),
  body('Structure de gouvernance cible à 3 niveaux : FZCO Dubaï → Holding Cameroun → 7 filiales. Délégation de pouvoirs, comités de contrôle, conventions réglementées, Fit and Proper.'),
  h2('III.1 — Chain of Control (traçabilité actionnariat)'),
  buildTable(
    ['Niveau', 'Entité', 'Forme juridique', 'Juridiction', 'Capital', 'Contrôle exercé'],
    [
      ['Niveau 1', 'OPTASIA SOLUTIONS FZCO', 'Free Zone Company (Dubaï)', 'DIFC / DMCC', 'Capital libre', 'Propriété intellectuelle + licence technologique'],
      ['Niveau 2', 'OPTASIA HOLDING AFRICA', 'SA / SARL (OHADA)', 'Cameroun', '100 M FCFA min', 'Contrôle financier + opérationnel des filiales'],
      ['Niveau 3', 'OPTASIA TOGO SFD', 'SFD 2ème cat.', 'Togo', '100 M FCFA', 'Opérationnel local — conformité BCEAO'],
      ['Niveau 3', 'OPTASIA BÉNIN SFD', 'SFD 2ème cat.', 'Bénin', '100 M FCFA', 'Opérationnel local — conformité BCEAO'],
      ['Niveau 3', 'OPTASIA BURKINA SFD', 'SFD 2ème cat.', 'Burkina Faso', '100 M FCFA', 'Opérationnel local — conformité BCEAO'],
      ['Niveau 3', 'OPTASIA MALI SFD', 'SFD 2ème cat.', 'Mali', '100 M FCFA', 'Opérationnel local — conformité BCEAO'],
      ['Niveau 3', 'OPTASIA CAMEROUN EMF', 'EMF 2ème cat.', 'Cameroun', '100 M FCFA', 'Opérationnel local — conformité COBAC+BEAC'],
      ['Niveau 3', 'OPTASIA GABON EMF', 'EMF 2ème cat.', 'Gabon', '100 M FCFA', 'Opérationnel local — conformité COBAC+BEAC'],
      ['Niveau 3', 'OPTASIA CONGO EMF', 'EMF 2ème cat.', 'Congo', '100 M FCFA', 'Opérationnel local — conformité COBAC+BEAC'],
    ],
    { colWidths: [10, 22, 16, 14, 14, 24], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  h2('III.2 — Matrice de délégation de pouvoirs (Groupe vs Local)'),
  buildTable(
    ['Domaine', 'Prérogative exclusive CA local', 'Orientation Groupe (validable)'],
    [
      ['Stratégie locale', 'Plan d\'affaires, segments cibles, tarification locale', 'Validation annuelle du budget global'],
      ['Conformité réglementaire', 'Politique LBC/FT, reporting régulateur, réponses aux réquisitions', 'Standards globaux de conformité'],
      ['Gestion des risques de crédit', 'Politique de crédit, plafonds, provisions, recouvrement', 'Cadre de scoring global + algorithmes'],
      ['Nominations fonctions clés', 'RCI, RCC, RLBC, DRC — nomination et révocation', 'Profil type et validation des compétences'],
      ['Technologie', 'SIG local, sécurité IT, PCA, hébergement', 'CBS global, moteur IA, API Banking'],
      ['Rémunérations', 'Grille locale, respect plafonds 8%', 'Philosophie globale et alignment actionnariale'],
    ],
    { colWidths: [18, 38, 44], headerBg: AMBER, headerColor: 'FFFFFF' }
  ),
  h3('III.2.1 — Mécanisme de Veto Prudentiel'),
  alertBox('Le DG local peut opposer un Veto Prudentiel à toute directive du Groupe qui contrevient aux ratios prudentiels locaux, aux règles de change ou aux obligations LBC/FT. Ce Veto est un droit, pas une option.', 'info'),
  numberedItem(1, 'Détection : Le DG local identifie la non-conformité d\'une directive Groupe.'),
  numberedItem(2, 'Opposition écrite : Le DG notifie par écrit le Groupe et le CA local dans les 5 jours.'),
  numberedItem(3, 'Réunion CA local : Le CA local examine le Veto dans les 10 jours.'),
  numberedItem(4, 'Décision : Le CA local statue à la majorité des indépendants (vote favorable requis).'),
  numberedItem(5, 'Information régulateur : Si le Veto est confirmé, le CA local informe BCEAO/COBAC.'),
  numberedItem(6, 'Médiation : En cas de conflit persistant, médiation par le CAC ou un arbitre OHADA.'),
  h2('III.3 — Comités de contrôle (CAC, CRC, CNR)'),
  buildTable(
    ['Comité', 'Composition', 'Fréquence', 'Attributions principales', 'Référence'],
    [
      ['CAC — Comité Audit & Conformité', '3 membres : 2 indépendants + 1 administrateur', 'Trimestrielle', 'Surveillance contrôle interne, LBC/FT, réponses régulateur, intégrité financière', 'Circ. BCEAO 03/2017 ; COBAC R-2019/01'],
      ['CRC — Comité Risques & Crédit', '3 membres : 2 indépendants + DG', 'Mensuelle', 'Politique crédit, plafonds, provisions, scoring, concentration, récupération', 'Circ. BCEAO 01/2017 ; COBAC R-2023/01'],
      ['CNR — Comité Nominations & Rémunérations', '3 membres : 2 indépendants + PCA', 'Semestrielle', 'Fit and Proper, nominations, évaluation DG, rémunérations, succession', 'Circ. BCEAO 02/2017 ; COBAC R-2023/01'],
    ],
    { colWidths: [18, 24, 12, 30, 16], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  h2('III.4 — Conventions réglementées inter-compagnies'),
  buildTable(
    ['Convention', 'Objet', 'Critère de validité OHADA', 'Risque si invalide'],
    [
      ['MSA — Management Services Agreement', 'Frais de management Holding → Filiales', 'Approbation CA + rapport CAC + prix de transfert OCDE', 'Requalification en distribution déguisée de bénéfices'],
      ['Licence technologique', 'Redevance FZCO → Holding pour algorithme IA', 'Approbation CA + rapport CAC + plafond 5% PNB', 'Requalification en transfert indirect de bénéfices'],
      ['Maintenance informatique', 'Support technique FZCO → Holding', 'Approbation CA + rapport CAC + méthode Cost-Plus', 'Refus de déduction fiscale'],
      ['Shared Services Agreement', 'Services partagés (RH, juridique, finance) Holding → Filiales', 'Approbation CA + rapport CAC + prix de transfert OCDE', 'Requalification en siphonnage du PNB local'],
      ['Distribution de liquidité', 'Placement des excédents de trésorerie filiales → Holding', 'Approbation CA + rapport CAC + respect ratios prudentiels', 'Réquisition réglementaire + sanction'],
    ],
    { colWidths: [18, 24, 32, 26], headerBg: AMBER, headerColor: 'FFFFFF' }
  ),
  h2('III.5 — Fit and Proper — Check-list dossier dirigeant'),
  buildTable(
    ['Fonction', 'Expérience min.', 'Nationalité', 'Casier', 'Incompatibilités'],
    [
      ['PCA', '10 ans dont 5 en direction', 'UEMOA (recommandée) / CEMAC (souhaitée)', 'Vierge', 'DG, DGA, RCI, RCC, salarié'],
      ['DG', '5 ans UEMOA / 7 ans CEMAC secteur financier', 'UEMOA (obligatoire UEMOA) / CEMAC (souhaitée)', 'Vierge', 'PCA, DGA (> 2 mandats), salarié Holding'],
      ['DGA', '3 ans UEMOA / 5 ans CEMAC', 'UEMOA / CEMAC', 'Vierge', 'PCA, DG (> 2 mandats)'],
      ['RCI', '5 ans en contrôle interne ou audit', 'UEMOA / CEMAC', 'Vierge', 'Ligne opérationnelle, commerciale'],
      ['RCC', '5 ans en conformité bancaire', 'UEMOA / CEMAC', 'Vierge', 'Ligne opérationnelle, commerciale'],
      ['RLBC', '5 ans en LBC/FT', 'UEMOA / CEMAC', 'Vierge', 'Ligne opérationnelle, commerciale'],
      ['DRC', '7 ans en gestion des risques', 'UEMOA / CEMAC', 'Vierge', 'Ligne commerciale'],
      ['DC / DSI', '5 ans en IT bancaire', 'UEMOA / CEMAC', 'Vierge', 'Ligne commerciale'],
    ],
    { colWidths: [10, 22, 14, 10, 44], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  h3('III.5.1 — Dossier individuel agrément (10 documents obligatoires)'),
  numberedItem(1, 'Formulaire de demande d\'agrément (modèle BCEAO/COBAC).'),
  numberedItem(2, 'CV détaillé certifié (parcours, expériences, compétences).'),
  numberedItem(3, 'Casier judiciaire < 3 mois, certifié et apostillé.'),
  numberedItem(4, 'Attestation de non-faillite personnelle et des sociétés dirigées.'),
  numberedItem(5, 'Attestation de solvabilité bancaire (comptes bancaires).'),
  numberedItem(6, 'Attestation de régularité fiscale (administration fiscale).'),
  numberedItem(7, 'Déclaration sur l\'honneur d\'honorabilité (modèle régulateur).'),
  numberedItem(8, 'Rapport de due diligence signé par un cabinet Big Four agréé.'),
  numberedItem(9, 'Deux lettres de recommandation d\'anciens employeurs ou pairs.'),
  numberedItem(10, 'Preuve d\'expérience (attestations de service, contrats, rapports d\'activité).'),
  new Paragraph({ children: [], pageBreakBefore: true }),
];