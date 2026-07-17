import { Paragraph, TextRun, AlignmentType } from 'docx';
import { heading1, heading2, item } from './helpers';

export const title3Paragraphs: Paragraph[] = [
  heading1("TITRE III — SÉQUENÇAGE ET FEUILLE DE ROUTE"),
  heading2('Article 3.1 — Phase 1 : Pré-licensing et Cadrage (Mois 1 à 2)'),
  item('3.1.1', "Diagnostic prudentiel complet de l'actionnariat, de la gouvernance, et du modèle économique prévisionnel pour chaque pays cible ;", { after: 60, indent: 720 }),
  item('3.1.2', "Cartographie des risques réglementaires, juridiques, financiers, technologiques et réputationnels par pays et par zone monétaire ;", { after: 60, indent: 720 }),
  item('3.1.3', "Analyse de conformité préliminaire aux exigences BCEAO (UEMOA) et COBAC/BEAC (CEMAC) ;", { after: 60, indent: 720 }),
  item('3.1.4', "Identification des écarts et élaboration du plan d'action correctif (roadmap) ;", { after: 60, indent: 720 }),
  item('3.1.5', "Note de cadrage stratégique et proposition de mission détaillée par pays.", { after: 200, indent: 720 }),
  heading2('Article 3.2 — Phase 2 : Ingénierie Réglementaire (Mois 3 à 7)'),
  item('3.2.1', "Élaboration des sept (07) Business Plans prévisionnels sur 5 ans, conformes au SYSCOHADA révisé, par pays, avec ratios de solvabilité (ratio de fonds propres ≥ 10 %) et de liquidité (ratio de liquidité générale ≥ 100 %) ;", { after: 60, indent: 720 }),
  item('3.2.2', "Rédaction des statuts juridiques conformes à l'OHADA, des pactes d'actionnaires, et des procès-verbaux constitutifs ;", { after: 60, indent: 720 }),
  item('3.2.3', "Constitution des dossiers de moralité des dirigeants et actionnaires (KYC, casiers judiciaires, attestations bancaires, CV certifiés) ;", { after: 60, indent: 720 }),
  item('3.2.4', "Élaboration des manuels de procédures (administratives, RH, opérationnelles, crédit, épargne, scoring IA, comptables) ;", { after: 60, indent: 720 }),
  item('3.2.5', "Élaboration des manuels de contrôle interne conformes au Règlement COBAC R-2019/01 et au cadre BCEAO, et du Plan de Continuité d'Activité (PCA) conforme au Règlement R-2021/01 ;", { after: 60, indent: 720 }),
  item('3.2.6', "Mise en place du dispositif LBC/FT conforme au Règlement COBAC R-2018/01 et aux normes BCEAO en matière de lutte contre le blanchiment de capitaux et le financement du terrorisme ;", { after: 60, indent: 720 }),
  item('3.2.7', "Rédaction de la note technique SIG (système d'information de gestion) couvrant l'hébergement Cloud, la souveraineté des données locales, la sécurité informatique, et la conformité RGPD et protections locales des données ;", { after: 60, indent: 720 }),
  item('3.2.8', "Validation interne des dossiers par le Comité de Revue Khepra (audit qualité, cohérence réglementaire, conformité des ratios).", { after: 200, indent: 720 }),
  heading2('Article 3.3 — Phase 3 : Dépôt et Instruction (Mois 8 à 12/14)'),
  item('3.3.1', "Dépôt officiel des dossiers complets auprès des Commissions Bancaires et des Ministères des Finances concernés, en version physique et électronique ;", { after: 60, indent: 720 }),
  item('3.3.2', "Suivi de l'instruction, réponse aux réquisitions, préparation aux auditions des dirigeants devant les Commissions Bancaires ;", { after: 60, indent: 720 }),
  item('3.3.3', "Accompagnement des enquêtes de moralité (visites sur site, entretiens avec les régulateurs, fourniture de pièces complémentaires) ;", { after: 60, indent: 720 }),
  item('3.3.4', "Négociation des conditions suspensives et mise en conformité des dossiers suite aux observations des régulateurs ;", { after: 60, indent: 720 }),
  item('3.3.5', "Obtention des agréments définitifs et accompagnement au lancement opérationnel (post-licensing).", { after: 300, indent: 720 }),
];