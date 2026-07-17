import { Paragraph, TextRun, AlignmentType } from 'docx';
import { TEAL, DARK, SLATE, RED, AMBER, h1, h2, h3, body, bullet, bulletBold, alertBox, spacer, divider, numberedItem, buildTable } from './helpers';

export const masterSummaryParagraphs: Paragraph[] = [
  h1('AVANT-PROPOS — PORTÉE ET ARTICULATION DU DOCUMENT INTÉGRÉ'),
  divider(),

  body(
    'Le présent document constitue la synthèse intégrée du Livrable 1 de la mission KHEPRA EXPERTS × OPTASIA. Il fusionne et articule en cinq parties cohérentes l\'ensemble des analyses stratégiques, réglementaires, prudentielles et architecturales réalisées pour le compte exclusif du CEO du Groupe OPTASIA dans le cadre du programme d\'obtention des agréments d\'Établissements de Microfinance (EMF) et de Systèmes Financiers Décentralisés (SFD) de 2ème catégorie dans les zones UEMOA et CEMAC.'
  ),

  alertBox(
    'Ce document n\'est pas un catalogue de recommandations génériques. C\'est une radiographie clinique des risques réels auxquels est exposé le modèle d\'affaires d\'OPTASIA, avec une carte de navigation précise pour les contourner et obtenir les agréments dans les 7 pays cibles dans les délais optimaux.',
    'info'
  ),

  h2('Structure et logique de lecture'),
  body('Les cinq parties de ce document s\'articulent selon une logique de progression stratégique, du diagnostic à l\'action :'),

  buildTable(
    ['Partie', 'Titre', 'Angle d\'analyse', 'Destinataires principaux'],
    [
      ['PARTIE I', 'Pré-diagnostic et Cartographie Réglementaire', 'Réglementaire — Cartographie des textes, conditions d\'agrément, ratios prudentiels, délais et gaps par pays', 'CEO, Directeur Juridique, Directeur Financier'],
      ['PARTIE II', 'Mémorandum de Hardening', 'Conformité critique — UBO, souveraineté technique, gouvernance hard core, rémunérations, risques de rejet', 'CEO exclusivement — Document stratégique prioritaire'],
      ['PARTIE III', 'Architecture de Gouvernance', 'Structurel et organisationnel — Chain of Control, délégation de pouvoirs, comités de contrôle, conventions réglementées, Fit and Proper', 'CEO, Directeur Général Holding, Présidents des CA'],
      ['PARTIE IV', 'Cadre Réglementaire Produits & Services', 'Opérationnel et commercial — Réglementation applicable aux produits financiers numériques, API Banking, Mobile Money, scoring alternatif par pays', 'CEO, Directeur Commercial, Directeur Technique'],
      ['PARTIE V', 'Modèle Économique Conforme Fintech', 'Stratégique et commercial — Blueprint du modèle économique conforme aux normes BCEAO/COBAC pour une Fintech mondiale en microfinance africaine', 'CEO, Board, Investisseurs'],
    ],
    { colWidths: [12, 22, 36, 30], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  spacer(),

  h2('Comment lire ce document'),
  numberedItem(1, 'Le CEO lira en priorité la Partie II (Hardening) et la Partie V (Modèle Économique). Ces deux parties contiennent les décisions stratégiques irréversibles qui conditionnent la viabilité de l\'ensemble du programme.'),
  numberedItem(2, 'L\'équipe juridique et de conformité lira en priorité les Parties I et III, qui constituent le référentiel réglementaire opérationnel de la mission.'),
  numberedItem(3, 'L\'équipe technique et commerciale lira en priorité la Partie IV, qui décrit les contraintes réglementaires applicables à chaque produit et service financier numérique.'),
  numberedItem(4, 'Les investisseurs et membres du Board liront en priorité l\'Executive Summary de chaque partie et la Partie V.'),

  spacer(),
  h2('Avertissements stratégiques préliminaires'),
  alertBox('Les 3 décisions irréversibles qui doivent être prises AVANT tout dépôt de dossier : (1) Constitution d\'une Holding de substance en Afrique — la maison-mère FZCO de Dubaï ne peut pas être l\'actionnaire direct des filiales ; (2) Architecture IT hybride obligatoire — les données financières locales ne peuvent pas être hébergées dans un cloud global non certifié ; (3) Recrutement anticipé des DG locaux résidents dans chaque pays pilote — ils doivent être présentés aux régulateurs 3 mois avant le dépôt des dossiers.', 'critical'),

  spacer(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];