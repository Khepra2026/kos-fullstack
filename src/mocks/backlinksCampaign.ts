export interface BacklinkTarget {
  id: string;
  nom: string;
  url: string;
  categorie: 'Institution Financière' | 'Organisation Internationale' | 'Université & Think Tank' | 'Média Économique' | 'Plateforme Fintech';
  da: number;
  traficMensuel: number;
  statut: 'Contacté' | 'En discussion' | 'Acquis' | 'Refusé' | 'À contacter';
  priorite: 'Critique' | 'Élevée' | 'Moyenne';
  dateContact?: string;
  dateAcquisition?: string;
  pageCible: string;
  typeLien: 'Citation rapport' | 'Article invité' | 'Partenariat' | 'Répertoire' | 'Interview';
  contactNom?: string;
  notes?: string;
}

export const backlinkTargets: BacklinkTarget[] = [
  { id: 'bceao', nom: 'BCEAO', url: 'https://www.bceao.int', categorie: 'Institution Financière', da: 68, traficMensuel: 520000, statut: 'En discussion', priorite: 'Critique', dateContact: '2026-06-10', pageCible: '/barometre-bceao-2026', typeLien: 'Citation rapport', contactNom: 'Direction Communication', notes: 'Intérêt pour le Baromètre — validation en cours' },
  { id: 'beac', nom: 'BEAC', url: 'https://www.beac.int', categorie: 'Institution Financière', da: 62, traficMensuel: 310000, statut: 'À contacter', priorite: 'Critique', pageCible: '/barometre-bceao-2026', typeLien: 'Citation rapport', contactNom: 'Département Études', notes: 'À contacter avec le Baromètre Q2' },
  { id: 'afdb', nom: 'Banque Africaine de Développement', url: 'https://www.afdb.org', categorie: 'Organisation Internationale', da: 82, traficMensuel: 2100000, statut: 'Contacté', priorite: 'Critique', dateContact: '2026-06-08', pageCible: '/barometre-bceao-2026', typeLien: 'Citation rapport', contactNom: 'Knowledge Center', notes: 'En attente de réponse' },
  { id: 'boad', nom: 'BOAD', url: 'https://www.boad.org', categorie: 'Institution Financière', da: 56, traficMensuel: 180000, statut: 'À contacter', priorite: 'Élevée', pageCible: '/regulation-financiere', typeLien: 'Partenariat', contactNom: 'Département Études Économiques' },
  { id: 'imf', nom: 'FMI', url: 'https://www.imf.org', categorie: 'Organisation Internationale', da: 94, traficMensuel: 8500000, statut: 'À contacter', priorite: 'Critique', pageCible: '/barometre-bceao-2026', typeLien: 'Citation rapport', contactNom: 'African Department' },
  { id: 'worldbank', nom: 'Banque Mondiale', url: 'https://www.worldbank.org', categorie: 'Organisation Internationale', da: 95, traficMensuel: 10000000, statut: 'À contacter', priorite: 'Critique', pageCible: '/barometre-bceao-2026', typeLien: 'Citation rapport', contactNom: 'Africa Region KM' },
  { id: 'afreximbank', nom: 'Afreximbank', url: 'https://www.afreximbank.com', categorie: 'Institution Financière', da: 67, traficMensuel: 480000, statut: 'À contacter', priorite: 'Élevée', pageCible: '/barometre-bceao-2026', typeLien: 'Citation rapport' },
  { id: 'uncdf', nom: 'UNCDF', url: 'https://www.uncdf.org', categorie: 'Organisation Internationale', da: 76, traficMensuel: 750000, statut: 'En discussion', priorite: 'Élevée', dateContact: '2026-06-09', pageCible: '/industries/microfinance', typeLien: 'Partenariat', notes: 'Webinaire conjoint en discussion' },
  { id: 'cgap', nom: 'CGAP', url: 'https://www.cgap.org', categorie: 'Organisation Internationale', da: 72, traficMensuel: 620000, statut: 'Contacté', priorite: 'Élevée', dateContact: '2026-06-10', pageCible: '/barometre-bceao-2026', typeLien: 'Citation rapport', contactNom: 'Research Team' },
  { id: 'afd', nom: 'AFD', url: 'https://www.afd.fr', categorie: 'Organisation Internationale', da: 77, traficMensuel: 1400000, statut: 'À contacter', priorite: 'Élevée', pageCible: '/regulation-financiere', typeLien: 'Partenariat', contactNom: 'Division Afrique' },
  { id: 'giz', nom: 'GIZ', url: 'https://www.giz.de', categorie: 'Organisation Internationale', da: 81, traficMensuel: 2100000, statut: 'À contacter', priorite: 'Moyenne', pageCible: '/barometre-bceao-2026', typeLien: 'Citation rapport' },
  { id: 'ecowas', nom: 'CEDEAO', url: 'https://www.ecowas.int', categorie: 'Institution Financière', da: 72, traficMensuel: 780000, statut: 'À contacter', priorite: 'Élevée', pageCible: '/barometre-bceao-2026', typeLien: 'Citation rapport', contactNom: 'Macroeconomic Policy Dept' },
  { id: 'africanunion', nom: 'Union Africaine', url: 'https://au.int', categorie: 'Organisation Internationale', da: 77, traficMensuel: 1100000, statut: 'À contacter', priorite: 'Moyenne', pageCible: '/barometre-bceao-2026', typeLien: 'Citation rapport' },
  { id: 'ifc', nom: 'IFC', url: 'https://www.ifc.org', categorie: 'Organisation Internationale', da: 86, traficMensuel: 3200000, statut: 'À contacter', priorite: 'Critique', pageCible: '/barometre-bceao-2026', typeLien: 'Citation rapport', contactNom: 'SSA Department' },
  { id: 'undp', nom: 'PNUD', url: 'https://www.undp.org', categorie: 'Organisation Internationale', da: 91, traficMensuel: 5200000, statut: 'À contacter', priorite: 'Moyenne', pageCible: '/barometre-bceao-2026', typeLien: 'Citation rapport' },
  { id: 'hbs', nom: 'Harvard Business School Africa', url: 'https://www.hbs.edu/africa', categorie: 'Université & Think Tank', da: 93, traficMensuel: 4800000, statut: 'À contacter', priorite: 'Critique', pageCible: '/case-studies', typeLien: 'Article invité' },
  { id: 'brookings', nom: 'Brookings Africa Growth', url: 'https://www.brookings.edu/africa', categorie: 'Université & Think Tank', da: 84, traficMensuel: 2400000, statut: 'À contacter', priorite: 'Élevée', pageCible: '/think-tank', typeLien: 'Article invité' },
  { id: 'chatham', nom: 'Chatham House Africa', url: 'https://www.chathamhouse.org/africa', categorie: 'Université & Think Tank', da: 82, traficMensuel: 1900000, statut: 'À contacter', priorite: 'Élevée', pageCible: '/barometre-bceao-2026', typeLien: 'Article invité' },
  { id: 'aerc', nom: 'AERC', url: 'https://www.aercafrica.org', categorie: 'Université & Think Tank', da: 62, traficMensuel: 280000, statut: 'Contacté', priorite: 'Élevée', dateContact: '2026-06-08', pageCible: '/barometre-bceao-2026', typeLien: 'Partenariat', contactNom: 'Research Director', notes: 'Réponse positive — collaboration recherche' },
  { id: 'insead', nom: 'INSEAD Africa Initiative', url: 'https://www.insead.edu/africa', categorie: 'Université & Think Tank', da: 87, traficMensuel: 2200000, statut: 'À contacter', priorite: 'Moyenne', pageCible: '/case-studies', typeLien: 'Article invité' },
  { id: 'jeuneafrique', nom: 'Jeune Afrique', url: 'https://www.jeuneafrique.com', categorie: 'Média Économique', da: 77, traficMensuel: 2100000, statut: 'En discussion', priorite: 'Critique', dateContact: '2026-06-07', pageCible: '/barometre-bceao-2026', typeLien: 'Article invité', contactNom: 'Rédaction Économie', notes: 'Tribune en cours de rédaction' },
  { id: 'africareport', nom: 'The Africa Report', url: 'https://www.theafricareport.com', categorie: 'Média Économique', da: 72, traficMensuel: 1100000, statut: 'Contacté', priorite: 'Élevée', dateContact: '2026-06-09', pageCible: '/barometre-bceao-2026', typeLien: 'Interview', contactNom: 'Business Editor' },
  { id: 'africanbusiness', nom: 'African Business Magazine', url: 'https://african.business', categorie: 'Média Économique', da: 67, traficMensuel: 820000, statut: 'À contacter', priorite: 'Élevée', pageCible: '/barometre-bceao-2026', typeLien: 'Article invité' },
  { id: 'financialafrik', nom: 'Financial Afrik', url: 'https://www.financialafrik.com', categorie: 'Média Économique', da: 57, traficMensuel: 290000, statut: 'Acquis', priorite: 'Élevée', dateContact: '2026-06-05', dateAcquisition: '2026-06-11', pageCible: '/barometre-bceao-2026', typeLien: 'Interview', contactNom: 'Rédaction', notes: 'Interview CEO KHEPRA publiée le 11/06' },
  { id: 'techcabal', nom: 'TechCabal', url: 'https://techcabal.com', categorie: 'Média Économique', da: 62, traficMensuel: 520000, statut: 'En discussion', priorite: 'Élevée', dateContact: '2026-06-10', pageCible: '/industries/fintech', typeLien: 'Article invité' },
  { id: 'disruptafrica', nom: 'Disrupt Africa', url: 'https://disrupt-africa.com', categorie: 'Média Économique', da: 57, traficMensuel: 310000, statut: 'À contacter', priorite: 'Moyenne', pageCible: '/industries/fintech', typeLien: 'Article invité' },
  { id: 'cioafrica', nom: 'CIO Africa', url: 'https://www.cio.co.ke', categorie: 'Média Économique', da: 52, traficMensuel: 190000, statut: 'À contacter', priorite: 'Moyenne', pageCible: '/services/transformation-digitale', typeLien: 'Article invité' },
  { id: 'gsma', nom: 'GSMA Mobile for Development', url: 'https://www.gsma.com/mobilefordevelopment', categorie: 'Plateforme Fintech', da: 82, traficMensuel: 2100000, statut: 'À contacter', priorite: 'Critique', pageCible: '/barometre-bceao-2026', typeLien: 'Citation rapport' },
  { id: 'fintechngr', nom: 'Fintech Association of Nigeria', url: 'https://www.fintechngr.org', categorie: 'Plateforme Fintech', da: 47, traficMensuel: 95000, statut: 'À contacter', priorite: 'Moyenne', pageCible: '/industries/fintech', typeLien: 'Partenariat' },
  { id: 'africafintech', nom: 'Africa Fintech Network', url: 'https://www.africafintechnetwork.com', categorie: 'Plateforme Fintech', da: 50, traficMensuel: 140000, statut: 'Contacté', priorite: 'Élevée', dateContact: '2026-06-10', pageCible: '/barometre-bceao-2026', typeLien: 'Partenariat', notes: 'Intérêt pour co-branding Baromètre' },
  { id: 'apbef', nom: 'APBEF Sénégal', url: 'https://www.apbef.sn', categorie: 'Institution Financière', da: 47, traficMensuel: 95000, statut: 'Acquis', priorite: 'Élevée', dateContact: '2026-06-03', dateAcquisition: '2026-06-08', pageCible: '/services/audit-pre-inspection-bceao', typeLien: 'Partenariat', notes: 'Partenariat signé — webinaire conjoint juillet 2026' },
  { id: 'apim', nom: 'APIM-UEMOA', url: 'https://www.apim-uemoa.org', categorie: 'Institution Financière', da: 42, traficMensuel: 78000, statut: 'En discussion', priorite: 'Élevée', dateContact: '2026-06-08', pageCible: '/industries/microfinance', typeLien: 'Partenariat', contactNom: 'Direction Technique', notes: 'Accord de principe — formalisation en cours' },
  { id: 'cerdi', nom: 'CERDI', url: 'https://cerdi.uca.fr', categorie: 'Université & Think Tank', da: 67, traficMensuel: 220000, statut: 'À contacter', priorite: 'Moyenne', pageCible: '/barometre-bceao-2026', typeLien: 'Partenariat' },
  { id: 'ird', nom: 'IRD', url: 'https://www.ird.fr', categorie: 'Université & Think Tank', da: 72, traficMensuel: 480000, statut: 'À contacter', priorite: 'Moyenne', pageCible: '/barometre-bceao-2026', typeLien: 'Citation rapport' },
  { id: 'lse', nom: 'LSE Africa Centre', url: 'https://www.lse.ac.uk/africa', categorie: 'Université & Think Tank', da: 88, traficMensuel: 3800000, statut: 'À contacter', priorite: 'Moyenne', pageCible: '/think-tank', typeLien: 'Article invité' },
];

export const statsBacklinks = {
  totalCibles: backlinkTargets.length,
  acquis: backlinkTargets.filter(b => b.statut === 'Acquis').length,
  enDiscussion: backlinkTargets.filter(b => b.statut === 'En discussion').length,
  contactes: backlinkTargets.filter(b => b.statut === 'Contacté').length,
  aContacter: backlinkTargets.filter(b => b.statut === 'À contacter').length,
  refuses: backlinkTargets.filter(b => b.statut === 'Refusé').length,
  daMoyenCibles: Math.round(backlinkTargets.reduce((s, b) => s + b.da, 0) / backlinkTargets.length),
  traficPotentielTotal: backlinkTargets.reduce((s, b) => s + b.traficMensuel, 0),
  scoreProgression: 22,
  scoreCible90jours: 55,
};

export const KPIsBacklinks = {
  backlinksAcquis: 2,
  backlinksEnCours: 8,
  domainesReferents: 2,
  domainesCible: 50,
  daActuel: 22,
  daCible: 35,
  traficOrganiqueMensuel: 8500,
  traficCibleMensuel: 15000,
};

export const contenuLinkable = [
  { titre: 'Baromètre BCEAO 2026 — Inclusion Financière UEMOA', type: 'Rapport Annuel', statut: 'Publié', backlinks: 3, telechargements: 128, datePublication: '2026-06-12' },
  { titre: 'Guide Pré-Inspection BCEAO — 127 Points de Contrôle', type: 'Guide Premium', statut: 'Publié', backlinks: 5, telechargements: 342, datePublication: '2026-05-15' },
  { titre: 'Checklist Conformité LBC/FT UEMOA', type: 'Lead Magnet', statut: 'Publié', backlinks: 2, telechargements: 215, datePublication: '2026-04-20' },
  { titre: 'Livre Blanc : Prix de Transfert BEPS Action 13', type: 'Livre Blanc', statut: 'Publié', backlinks: 4, telechargements: 187, datePublication: '2026-03-10' },
  { titre: 'Étude de Cas : Agrément SFD Multinational UEMOA-CEMAC', type: 'Case Study', statut: 'Publié', backlinks: 1, telechargements: 93, datePublication: '2026-02-28' },
  { titre: 'Position Paper : Résilience SFD UEMOA', type: 'Think Tank', statut: 'Publié', backlinks: 2, telechargements: 76, datePublication: '2026-06-08' },
  { titre: 'Rapport État de la Fintech Afrique 2026', type: 'Rapport Annuel', statut: 'En préparation', backlinks: 0, telechargements: 0, datePublication: '2026-09-01' },
  { titre: 'Guide Transformation Digitale Institutions Financières', type: 'Guide Premium', statut: 'En préparation', backlinks: 0, telechargements: 0, datePublication: '2026-10-15' },
];