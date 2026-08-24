import { Paragraph, TextRun, AlignmentType } from 'docx';
import { TEAL, DARK, RED, AMBER, h1, h2, h3, body, bulletBold, alertBox, buildTable, divider, numberedItem } from '';

export const section4Paragraphs: Paragraph[] = [
  h1('PARTIE IV — CADRE RÉGLEMENTAIRE PRODUITS & SERVICES'),
  divider(),
  body('Conformité réglementaire des produits financiers numériques : crédit, dépôts, Mobile Money, scoring, assurance. Références BCEAO 2024, COBAC, CIMA, GAFI.'),
  h2('IV.1 — Classification réglementaire des produits'),
  buildTable(
    ['Catégorie', 'Produits', 'Régime UEMOA', 'Régime CEMAC', 'Autorisation'],
    [
      ['Crédit numérique', 'Micro-crédits Mobile Money, BNPL, scoring alternatif', 'SFD 2ème cat. + Inst. BCEAO 026/2024', 'EMF 2ème cat. + COBAC R-2023/01', 'Agrément standard + autorisation numérique'],
      ['Collecte dépôts', 'Wallets, comptes épargne digitaux', 'SFD 2ème cat. exclusif', 'EMF 2ème cat. + garantie BEAC 50 M', 'Agrément standard'],
      ['Transfert fonds', 'Virements, remises, inter-opérateurs', 'BCEAO + partenariats MNO', 'BEAC + COBAC + partenariats MNO', 'Agrément + convention MNO approuvée'],
      ['Assurance crédit', 'Micro-assurance vie, invalidité, crédit', 'BCEAO + CIMA', 'COBAC + CIMA', 'Agrément + partenariat assureur CIMA'],
      ['Scoring & Data', 'Scoring alternatif, profiling clients', 'Inst. BCEAO 028/2024 + 029/2024', 'COBAC R-2021/01 + R-2023/01', 'Déclaration + certification algorithme'],
    ],
    { colWidths: [16, 20, 24, 24, 16], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  h2('IV.2 — Crédit numérique : contraintes réglementaires'),
  alertBox('Le crédit numérique via Mobile Money est le cœur du modèle. Sa non-conformité entraîne la suspension immédiate des opérations et la mise en cause pénale des dirigeants.', 'critical'),
  buildTable(
    ['Exigence', 'UEMOA', 'CEMAC', 'Sanction'],
    [
      ['TEG maximum', '27% annuel (Loi anti-usure)', '33% annuel (COBAC R-2017/05 + lois anti-usure)', 'Nullité contrat + sanction pénale'],
      ['Centrale des risques', 'Consultation obligatoire > 500 K FCFA', 'Consultation obligatoire > 500 K FCFA', 'Amende + réquisition'],
      ['Capacité remboursement', 'Évaluation obligatoire avant octroi', 'Évaluation obligatoire avant octroi', 'Réquisition + suspension'],
      ['Transparence algorithmique', 'Documentation + absence biais + droit explication (Inst. 029/2024)', 'Documentation + absence biais + traçabilité (COBAC R-2023/01)', 'Réquisition + révision obligatoire'],
      ['Protection données crédit', 'Non-partage sans consentement', 'Non-partage sans consentement', 'Amende + signalement CENTIF'],
    ],
    { colWidths: [22, 26, 26, 26], headerBg: RED, headerColor: 'FFFFFF' }
  ),
  h2('IV.3 — Wallet numérique et collecte de dépôts'),
  buildTable(
    ['Caractéristique', 'UEMOA', 'CEMAC', 'Sanction'],
    [
      ['KYC', 'Photo + ID + localisation + téléphone vérifié (Inst. 026/2024)', 'Idem + vérification base nationale (COBAC R-2023/01)', 'Suspension + amende + signalement CENTIF'],
      ['Plafond mensuel', '2 M FCFA mouvements', '3 M FCFA mouvements (BEAC)', 'Gel du wallet'],
      ['Stockage données', 'UEMOA ou certifié BCEAO (Inst. 028/2024)', 'Pays d\'implantation (COBAC R-2021/01)', 'Rejet agrément'],
      ['PCA', 'Obligatoire (Circ. 001-2020)', 'Obligatoire (COBAC R-2021/01)', 'Réquisition + suspension'],
      ['Détection fraude', 'Temps réel obligatoire (Inst. 029/2024)', 'Monitoring obligatoire (COBAC R-2021/01)', 'Responsabilité civile + signalement'],
    ],
    { colWidths: [22, 26, 26, 26], headerBg: AMBER, headerColor: 'FFFFFF' }
  ),
  h2('IV.4 — Partenariats MNO par pays'),
  buildTable(
    ['Pays', 'Opérateurs', 'Mobile Money', 'Agrément partenariat', 'Vigilance'],
    [
      ['Togo', 'Togocom + Moov Africa', 'T-Money + Flooz', 'BCEAO + Ministère Numérique', 'Togocom ~60% parts — antitrust'],
      ['Bénin', 'MTN + Moov Africa', 'MTN Mobile Money + Moov Money', 'BCEAO + ARCEP', 'Interopérabilité partielle MTN/Moov'],
      ['Burkina Faso', 'Orange + Moov Africa', 'Orange Money + Moov Money', 'BCEAO + ARCEP', 'Instabilité réseau zones rurales'],
      ['Mali', 'Orange + Moov Africa', 'Orange Money + Moov Money', 'BCEAO + AUTOREG', 'Contexte sécuritaire — couverture réseau'],
      ['Cameroun', 'Orange + MTN', 'Orange Money + MTN Mobile Money', 'COBAC + ART', 'Bilinguisme FR/EN obligatoire'],
      ['Gabon', 'Airtel + Moov Africa', 'Airtel Money + Moov Money', 'COBAC + ARCEP', 'Marché Mobile Money moins développé'],
      ['Congo', 'Airtel + MTN', 'Airtel Money + MTN Mobile Money', 'COBAC + ART', 'Infrastructure bancaire limitée'],
    ],
    { colWidths: [10, 18, 16, 28, 28], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  h2('IV.5 — Reporting réglementaire numérique (obligations renforcées)'),
  buildTable(
    ['Rapport', 'Contenu', 'Fréquence', 'Destinataire', 'Sanction défaut'],
    [
      ['Prudentiel mensuel', 'Ratios solvabilité, liquidité, concentration, PAR 30/90', 'Mensuelle', 'BCEAO / COBAC + BEAC', 'Amende + réquisition + suspension'],
      ['LBC/FT', 'Déclarations soupçon, transactions inhabituelles, profils à haut risque', 'Mensuelle + ad hoc', 'CENTIF / TRACFIN + BCEAO/COBAC', 'Amende + responsabilité pénale RLBC'],
      ['IT / Cybersécurité', 'Incidents, violations, disponibilité, tests PCA', 'Trimestrielle + ad hoc', 'BCEAO / COBAC', 'Réquisition + audit spécial + suspension'],
      ['Scoring', 'Précision, faux positifs/négatifs, Fairness Audit', 'Semestrielle', 'BCEAO / COBAC', 'Réquisition + révision algorithmique'],
      ['Gouvernance', 'Délibérations CA, comités, évaluation dirigeants, rémunérations', 'Annuelle', 'BCEAO/COBAC + Ministère Finances', 'Réquisition + avis défavorable renouvellement'],
    ],
    { colWidths: [18, 28, 12, 22, 20], headerBg: AMBER, headerColor: 'FFFFFF' }
  ),
  new Paragraph({ children: [], pageBreakBefore: true }),
];



