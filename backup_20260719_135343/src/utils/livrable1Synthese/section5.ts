import { Paragraph, TextRun, AlignmentType } from 'docx';
import { TEAL, DARK, RED, AMBER, h1, h2, h3, body, bulletBold, alertBox, buildTable, divider, numberedItem } from '';

export const section5Paragraphs: Paragraph[] = [
  h1('PARTIE V — MODÈLE ÉCONOMIQUE CONFORME'),
  divider(),
  body('Blueprint du modèle économique conforme aux normes BCEAO/COBAC pour une Fintech mondiale en microfinance africaine.'),
  h2('V.1 — Structure à 3 niveaux (revenus et charges)'),
  buildTable(
    ['Niveau', 'Entité', 'Revenus', 'Charges', 'Flux autorisés'],
    [
      ['1 — Tech Globale', 'OPTASIA FZCO (Dubaï)', 'Redevances licence IA (5% PNB) + maintenance CBS', 'R&D, salaires tech, cloud global', 'Redevances → Holding (plafond 5% PNB)'],
      ['2 — Holding Régionale', 'OPTASIA HOLDING (Cameroun)', 'MSA filiales (3% PNB) + services partagés + dividendes filiales', 'DG, DAF, DRC, RCC, juridique, conformité', 'MSA → Filiales (plafond 3% PNB) + Dividendes → FZCO'],
      ['3 — Filiales Locales', 'EMF/SFD (7 pays)', 'Intérêts crédits (TEG 22-28%) + commissions MNO + frais dossier + placement dépôts + assurance', 'Salaires, IT local, provisions, redevances Holding, LBC/FT', 'Intérêts clients → Filiale (comptabilisation locale) + Dividendes → Holding (après CA)'],
    ],
    { colWidths: [14, 18, 28, 24, 16], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  h2('V.2 — Compte de résultat prévisionnel — Filiale type (An 1)'),
  buildTable(
    ['Ligne', 'Montant (M FCFA)', 'Commentaire'],
    [
      ['Produits d\'intérêts nets', '180,0', 'TEG 22% × 500 M × 12 rotations annuelles'],
      ['Commissions MNO', '18,0', '1,5% × volume traité'],
      ['Frais de dossier', '7,5', '750 FCFA × 10 000 clients'],
      ['Produits placement dépôts', '12,0', 'Taux interbancaire 2,5%'],
      ['Revenus distribution assurance', '5,0', 'Commission 10% des primes'],
      ['= PRODUIT NET BANCAIRE', '222,5', 'Référence pour tous les ratios'],
      ['Frais généraux', '(80,0)', '36% du PNB — norme < 50%'],
      ['Redevances licence (FZCO)', '(11,1)', '5% du PNB — plafond réglementaire'],
      ['Frais management (Holding)', '(6,7)', '3% du PNB — plafond réglementaire'],
      ['Provisions (PAR 30 4%)', '(20,0)', '4% × 500 M portefeuille'],
      ['Impôts (~30%)', '(31,4)', 'IS moyen zone'],
      ['= RÉSULTAT NET', '73,3', '73% du capital investi'],
      ['Rémunérations dirigeants (8% max)', '(5,9)', 'Plafond BCEAO/COBAC'],
      ['Dividendes Holding (50% max)', '(33,7)', 'Sous réserve ratios prudentiels'],
      ['= RÉSERVES (renforcement FP)', '33,7', 'Améliore ratio solvabilité'],
    ],
    { colWidths: [42, 20, 38], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  h2('V.3 — Tarification conforme par segment'),
  buildTable(
    ['Segment', 'Montant crédit', 'TEG UEMOA', 'TEG CEMAC', 'Durée', 'Marge nette'],
    [
      ['Micro-entrepreneur urbain', '50 K — 200 K FCFA', '22-24%', '28-30%', '15-30 j', '8-12%'],
      ['Employé informel', '100 K — 500 K FCFA', '18-20%', '24-26%', '30-90 j', '6-9%'],
      ['TPE', '500 K — 2 M FCFA', '15-18%', '20-25%', '90-180 j', '4-7%'],
      ['Agriculteur', '50 K — 300 K FCFA', '20-22%', '—', '60-180 j', '5-8%'],
      ['BNPL Mobile Money', '10 K — 100 K FCFA', '18-20%', '18-20%', '7-30 j', '10-15%'],
    ],
    { colWidths: [18, 16, 14, 14, 14, 24], headerBg: AMBER, headerColor: 'FFFFFF' }
  ),
  h2('V.4 — Déploiement en vagues'),
  buildTable(
    ['Vague', 'Pays', 'Période', 'Objectif', 'KPI succès'],
    [
      ['1 — Pilotes', 'Togo, Bénin, Cameroun', 'Mois 1-14', 'Valider modèle réglementaire, commercial, technologique', 'Agrément < 12 mois, PAR 30 < 5%, PNB > 150 M, 5 000 clients'],
      ['2 — Duplication', 'Burkina Faso, Mali, Gabon', 'Mois 10-22', 'Répliquer avec adaptation locale', 'Agrément < 10 mois, démarrage < 3 mois, PAR 30 < 4%'],
      ['3 — Expansion', 'Congo + Côte d\'Ivoire, Sénégal', 'Mois 18-30', 'Maximiser couverture et économies d\'échelle', '10 pays, 50 000 clients, portefeuille > 5 Mds FCFA'],
    ],
    { colWidths: [12, 18, 10, 30, 30], headerBg: '1A5F6E', headerColor: 'FFFFFF' }
  ),
  h2('V.5 — KPI prudentiels cibles (Holding consolidé)'),
  buildTable(
    ['KPI', 'Définition', 'An 1', 'An 3', 'An 5'],
    [
      ['Solvabilité', 'FP / APR', '≥ 12%', '≥ 14%', '≥ 16%'],
      ['Liquidité', 'Actifs liquides < 30j / Engagements < 30j', '≥ 120%', '≥ 130%', '≥ 140%'],
      ['PAR 30', 'Créances > 30j / Portefeuille brut', '≤ 5%', '≤ 3%', '≤ 2%'],
      ['Couverture', 'Provisions / Créances douteuses', '≥ 100%', '≥ 120%', '≥ 130%'],
      ['ROE', 'RN / FP moyens', '≥ 40%', '≥ 50%', '≥ 60%'],
      ['Cost-to-Income', 'Charges / PNB', '≤ 45%', '≤ 38%', '≤ 32%'],
    ],
    { colWidths: [18, 26, 14, 14, 14, 14], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  h2('V.6 — 15 actions prioritaires (90 jours)'),
  buildTable(
    ['#', 'Action', 'Délai', 'Responsable'],
    [
      ['1', 'Constitution Holding de substance Afrique', 'J+15', 'CEO'],
      ['2', 'Recrutement DG résidents Togo/Bénin/Cameroun', 'J+15', 'DRH'],
      ['3', 'Audit Ownership Chain UBO (Big Four)', 'J+30', 'CEO'],
      ['4', 'Architecture IT hybride Edge+Cloud local', 'J+20', 'DSI'],
      ['5', 'Libération capital 300 M FCFA (3 pays)', 'J+30', 'DAF'],
      ['6', 'Certification algorithme scoring (Fairness Audit)', 'J+30', 'CTO'],
      ['7', 'Conventions MNO pilotes (Orange, MTN)', 'J+45', 'Partnerships'],
      ['8', 'Politique Prix de Transfert OCDE', 'J+45', 'DAF + Big Four'],
      ['9', 'Recrutement PCA indépendants (3 filiales)', 'J+45', 'CNR'],
      ['10', 'Déploiement TMS LBC/FT', 'J+60', 'RLBC'],
      ['11', 'Rédaction statuts filiales (OHADA + local)', 'J+60', 'Juridique'],
      ['12', 'Pré-présentation régulateurs (BCEAO, COBAC)', 'J+60', 'KHEPRA + DG'],
      ['13', 'Business Plans 3 filiales (SYSCOHADA, 5 ans)', 'J+75', 'KHEPRA Finance'],
      ['14', '6 manuels de procédures filiales', 'J+75', 'KHEPRA'],
      ['15', 'Déploiement PCA conforme BCEAO/COBAC', 'J+90', 'DSI'],
    ],
    { colWidths: [6, 50, 12, 32], headerBg: AMBER, headerColor: 'FFFFFF' }
  ),
  alertBox('Score conformité modèle économique : 60/100 — Seuil requis 80/100. Écarts : prix de transfert non formalisé, plafonds rémunérations non encadrés, politique IT cloud non conforme. Ces 3 écarts doivent être clos dans les 45 jours.', 'warning'),
  new Paragraph({ children: [], pageBreakBefore: true }),
];



