// KOS Institutional Visibility Engine™ — Mock Data
// 9 Agents · Mode MOCK (données simulées réalistes Big Four)

// ============================================================
// AGENT 1 : INSTITUTION MAPPING ENGINE™
// Registre dynamique des organisations cibles
// ============================================================
export const institutionMappingOrganizations = [
  {
    id: 'org-001',
    name: 'Banque Mondiale — Bureau Régional Afrique de l\'Ouest',
    category: 'Banque de Développement',
    icon: 'ri-bank-card-line',
    country: 'Multi-pays',
    city: 'Dakar',
    domaines: ['Finance', 'Agriculture', 'Infrastructure', 'Éducation'],
    projets_actifs: 89,
    budget_annuel_musd: 5800,
    priorites: 'Inclusion financière, Digitalisation, Résilience climatique',
    derniere_consultation: 'DAO-2026-089 — Audit portefeuille microfinance UEMOA',
    contact_procurement: 'Non cartographié',
    statut: 'Prioritaire',
  },
  {
    id: 'org-002',
    name: 'AFD — Agence Française de Développement Siège Régional',
    category: 'Agence Bilatérale',
    icon: 'ri-globe-line',
    country: 'Multi-pays',
    city: 'Abidjan',
    domaines: ['Gouvernance', 'Climat', 'Finance', 'Infrastructure'],
    projets_actifs: 67,
    budget_annuel_musd: 2100,
    priorites: 'Gouvernance financière, Transition énergétique, PME',
    derniere_consultation: 'AMI-2026-034 — Appui gouvernance BCEAO Phase III',
    contact_procurement: 'Non cartographié',
    statut: 'Prioritaire',
  },
  {
    id: 'org-003',
    name: 'PNUD — Bureau Régional Afrique',
    category: 'Agence ONU',
    icon: 'ri-hand-heart-line',
    country: 'Multi-pays',
    city: 'Addis-Abeba',
    domaines: ['Gouvernance', 'Développement Durable', 'Inclusion Financière'],
    projets_actifs: 54,
    budget_annuel_musd: 450,
    priorites: 'ODD, Digitalisation services publics, Résilience',
    derniere_consultation: 'RFP-2026-012 — Évaluation programme gouvernance UEMOA',
    contact_procurement: 'Non cartographié',
    statut: 'Prioritaire',
  },
  {
    id: 'org-004',
    name: 'GIZ — Coopération Allemande',
    category: 'Agence Bilatérale',
    icon: 'ri-shake-hands-line',
    country: 'Multi-pays',
    city: 'Bamako',
    domaines: ['Formation Professionnelle', 'PME', 'Gouvernance'],
    projets_actifs: 38,
    budget_annuel_musd: 680,
    priorites: 'Formation duale, Entrepreneuriat, Digitalisation PME',
    derniere_consultation: 'EOI-2026-008 — Conseil gouvernance PME Afrique Ouest',
    contact_procurement: 'Non cartographié',
    statut: 'Élevée',
  },
  {
    id: 'org-005',
    name: 'USAID — West Africa Regional Mission',
    category: 'Agence Bilatérale',
    icon: 'ri-flag-line',
    country: 'Multi-pays',
    city: 'Accra',
    domaines: ['Croissance Économique', 'Démocratie', 'Santé', 'Éducation'],
    projets_actifs: 42,
    budget_annuel_musd: 950,
    priorites: 'Trade hub, Résilience économique, Jeunesse',
    derniere_consultation: 'RFQ-2026-045 — Due diligence partenaires financiers régionaux',
    contact_procurement: 'Non cartographié',
    statut: 'Moyenne',
  },
  {
    id: 'org-006',
    name: 'Expertise France — Direction Afrique',
    category: 'Agence Technique',
    icon: 'ri-user-star-line',
    country: 'Multi-pays',
    city: 'Paris',
    domaines: ['Finances Publiques', 'Justice', 'Sécurité', 'Assistance Technique'],
    projets_actifs: 23,
    budget_annuel_musd: 320,
    priorites: 'Mobilisation ressources intérieures, Gouvernance fiscale',
    derniere_consultation: 'AMI-2026-022 — Projet gouvernance fiscale CEDEAO',
    contact_procurement: 'Non cartographié',
    statut: 'Élevée',
  },
  {
    id: 'org-007',
    name: 'BAD — Banque Africaine de Développement',
    category: 'Banque de Développement',
    icon: 'ri-building-2-line',
    country: 'Multi-pays',
    city: 'Abidjan',
    domaines: ['Infrastructure', 'Intégration Régionale', 'PME', 'Digital'],
    projets_actifs: 156,
    budget_annuel_musd: 4200,
    priorites: 'Zone de libre-échange, Corridors, Énergie, Digital',
    derniere_consultation: 'RFP-2026-098 — Étude faisabilité Data Center Régional',
    contact_procurement: 'Non cartographié',
    statut: 'Prioritaire',
  },
  {
    id: 'org-008',
    name: 'JICA — Agence Japonaise de Coopération Internationale',
    category: 'Agence Bilatérale',
    icon: 'ri-earth-line',
    country: 'Multi-pays',
    city: 'Dakar',
    domaines: ['Agriculture', 'Santé', 'Infrastructure', 'Éducation'],
    projets_actifs: 31,
    budget_annuel_musd: 410,
    priorites: 'Sécurité alimentaire, Santé communautaire, TIC',
    derniere_consultation: 'EOI-2026-015 — Audit projets agricoles Sahel',
    contact_procurement: 'Non cartographié',
    statut: 'Moyenne',
  },
  {
    id: 'org-009',
    name: 'BCEAO — Banque Centrale des États de l\'Afrique de l\'Ouest',
    category: 'Banque Centrale',
    icon: 'ri-bank-line',
    country: 'UEMOA',
    city: 'Dakar',
    domaines: ['Régulation Bancaire', 'Stabilité Financière', 'Inclusion'],
    projets_actifs: 24,
    budget_annuel_musd: 340,
    priorites: 'Suptech, LCB/FT, Digitalisation, Bâle III/IV',
    derniere_consultation: 'AO-2026-056 — Mission pré-inspection banques 2026-2027',
    contact_procurement: 'M. Traoré — Directeur Conformité',
    statut: 'Prioritaire',
  },
  {
    id: 'org-010',
    name: 'BOAD — Banque Ouest Africaine de Développement',
    category: 'Banque de Développement',
    icon: 'ri-funds-box-line',
    country: 'UEMOA',
    city: 'Lomé',
    domaines: ['Développement', 'Énergie', 'Agriculture', 'Transport'],
    projets_actifs: 58,
    budget_annuel_musd: 890,
    priorites: 'Infrastructures énergétiques, Intégration régionale',
    derniere_consultation: 'AO-2026-067 — Audit gouvernance projets financés',
    contact_procurement: 'Non cartographié',
    statut: 'Élevée',
  },
  {
    id: 'org-011',
    name: 'Groupe Ecobank — Direction Régionale UEMOA',
    category: 'Banque Commerciale',
    icon: 'ri-bank-card-2-line',
    country: 'Multi-pays',
    city: 'Lomé',
    domaines: ['Banque', 'Finance Digitale', 'Trade Finance'],
    projets_actifs: 12,
    budget_annuel_musd: 'N/A',
    priorites: 'Transformation digitale, Conformité, Expansion',
    derniere_consultation: 'RFQ-2026-112 — Audit contrôle interne groupe',
    contact_procurement: 'Mme Koné — Head of Internal Audit',
    statut: 'Prioritaire',
  },
  {
    id: 'org-012',
    name: 'Orange Finances Mobiles — UEMOA',
    category: 'FinTech/Télécom',
    icon: 'ri-smartphone-line',
    country: 'Multi-pays',
    city: 'Abidjan',
    domaines: ['Mobile Money', 'Inclusion Financière', 'Digital'],
    projets_actifs: 8,
    budget_annuel_musd: 'N/A',
    priorites: 'Conformité réglementaire, Agrément, Expansion',
    derniere_consultation: 'EOI-2026-078 — Conformité LBC/FT mobile money',
    contact_procurement: 'Non cartographié',
    statut: 'Élevée',
  },
  {
    id: 'org-013',
    name: 'Ministère de l\'Économie et des Finances — Côte d\'Ivoire',
    category: 'Ministère',
    icon: 'ri-government-line',
    country: 'Côte d\'Ivoire',
    city: 'Abidjan',
    domaines: ['Finances Publiques', 'Fiscalité', 'Budget'],
    projets_actifs: 15,
    budget_annuel_musd: 'N/A',
    priorites: 'Modernisation fiscale, Digitalisation douane, PPP',
    derniere_consultation: 'AO-2026-134 — Audit organisationnel DGI',
    contact_procurement: 'M. Konaté — Directeur de Cabinet',
    statut: 'Prioritaire',
  },
  {
    id: 'org-014',
    name: 'Millennium Challenge Corporation — Africa',
    category: 'Agence Bilatérale',
    icon: 'ri-star-line',
    country: 'Multi-pays',
    city: 'Washington DC',
    domaines: ['Infrastructure', 'Énergie', 'Gouvernance', 'Agriculture'],
    projets_actifs: 6,
    budget_annuel_musd: 1800,
    priorites: 'Compacts Sénégal, Côte d\'Ivoire, Bénin',
    derniere_consultation: 'RFP-2026-055 — Due diligence projet énergie Sénégal',
    contact_procurement: 'Non cartographié',
    statut: 'Élevée',
  },
  {
    id: 'org-015',
    name: 'FMI — Département Afrique',
    category: 'Institution Financière',
    icon: 'ri-funds-line',
    country: 'Multi-pays',
    city: 'Washington DC',
    domaines: ['Macroéconomie', 'Assistance Technique', 'Réformes'],
    projets_actifs: 34,
    budget_annuel_musd: 1200,
    priorites: 'Programmes FEC, Dette, Gouvernance, Transparence',
    derniere_consultation: 'EOI-2026-091 — Diagnostic gouvernance banques centrales',
    contact_procurement: 'Non cartographié',
    statut: 'Prioritaire',
  },
  {
    id: 'org-016',
    name: 'Groupe Coris Bank International',
    category: 'Banque Commerciale',
    icon: 'ri-building-line',
    country: 'Multi-pays',
    city: 'Ouagadougou',
    domaines: ['Banque', 'Assurance', 'Microfinance'],
    projets_actifs: 9,
    budget_annuel_musd: 'N/A',
    priorites: 'Expansion régionale, Conformité COBAC/BCEAO',
    derniere_consultation: 'RFQ-2026-088 — Audit ICAAP/ILAAP groupe',
    contact_procurement: 'M. Ouédraogo — DAF',
    statut: 'Élevée',
  },
  {
    id: 'org-017',
    name: 'Commission de l\'UEMOA',
    category: 'Organisation Régionale',
    icon: 'ri-flag-2-line',
    country: 'UEMOA',
    city: 'Ouagadougou',
    domaines: ['Intégration Économique', 'Régulation', 'Commerce'],
    projets_actifs: 28,
    budget_annuel_musd: 520,
    priorites: 'Pacte convergence, PACIR, Marché commun',
    derniere_consultation: 'AO-2026-145 — Étude convergence réglementaire bancaire',
    contact_procurement: 'Non cartographié',
    statut: 'Prioritaire',
  },
  {
    id: 'org-018',
    name: 'COBAC — Commission Bancaire de l\'Afrique Centrale',
    category: 'Régulateur Financier',
    icon: 'ri-shield-check-line',
    country: 'CEMAC',
    city: 'Libreville',
    domaines: ['Régulation Bancaire', 'Supervision', 'Stabilité'],
    projets_actifs: 18,
    budget_annuel_musd: 180,
    priorites: 'Bâle III, LCB/FT, FinTech, Supervision basée risques',
    derniere_consultation: 'AO-2026-072 — Audit système supervision bancaire',
    contact_procurement: 'M. Mba — Secrétaire Général',
    statut: 'Prioritaire',
  },
];

// ============================================================
// AGENT 2 : DECISION MAKER INTELLIGENCE™
// Identification des fonctions clés par organisation
// ============================================================
export const decisionMakerIntelligence = [
  { id: 'dm-001', organisation: 'Banque Mondiale — Bureau Régional', fonction: 'Procurement Manager', nom: 'Sarah Mensah', pays: 'Ghana', secteur: 'Banque de Développement', domaine: 'Marchés Publics', contact_status: 'Non connecté', priorite: 'Critique' },
  { id: 'dm-002', organisation: 'Banque Mondiale — Bureau Régional', fonction: 'Country Director Sénégal', nom: 'Nathan Belete', pays: 'Sénégal', secteur: 'Banque de Développement', domaine: 'Direction Pays', contact_status: 'Non connecté', priorite: 'Très Haute' },
  { id: 'dm-003', organisation: 'AFD — Siège Régional', fonction: 'Directeur Régional Afrique', nom: 'Christian Yoka', pays: 'Côte d\'Ivoire', secteur: 'Agence Bilatérale', domaine: 'Direction Régionale', contact_status: 'Non connecté', priorite: 'Très Haute' },
  { id: 'dm-004', organisation: 'AFD — Siège Régional', fonction: 'Head of Procurement', nom: 'Fatou Binetou Diop', pays: 'Sénégal', secteur: 'Agence Bilatérale', domaine: 'Marchés Publics', contact_status: 'Non connecté', priorite: 'Critique' },
  { id: 'dm-005', organisation: 'BCEAO', fonction: 'Directeur de la Supervision Bancaire', nom: 'Dr. Alioune Ndiaye', pays: 'Sénégal', secteur: 'Banque Centrale', domaine: 'Supervision', contact_status: 'Connecté LinkedIn', priorite: 'Critique' },
  { id: 'dm-006', organisation: 'BCEAO', fonction: 'Directeur Conformité', nom: 'M. Traoré', pays: 'Côte d\'Ivoire', secteur: 'Banque Centrale', domaine: 'Conformité', contact_status: 'Relation existante', priorite: 'Très Haute' },
  { id: 'dm-007', organisation: 'Ecobank — UEMOA', fonction: 'Head of Internal Audit', nom: 'Mme Koné Aminata', pays: 'Côte d\'Ivoire', secteur: 'Banque Commerciale', domaine: 'Audit Interne', contact_status: 'Non connecté', priorite: 'Très Haute' },
  { id: 'dm-008', organisation: 'Ecobank — UEMOA', fonction: 'CFO Régional', nom: 'John Mensah', pays: 'Togo', secteur: 'Banque Commerciale', domaine: 'Finance', contact_status: 'Non connecté', priorite: 'Haute' },
  { id: 'dm-009', organisation: 'BAD', fonction: 'Head of Procurement', nom: 'Mamadou Diallo', pays: 'Côte d\'Ivoire', secteur: 'Banque de Développement', domaine: 'Marchés Publics', contact_status: 'Non connecté', priorite: 'Critique' },
  { id: 'dm-010', organisation: 'BAD', fonction: 'Director Financial Sector Development', nom: 'Stefan Nalletamby', pays: 'Côte d\'Ivoire', secteur: 'Banque de Développement', domaine: 'Finance', contact_status: 'Non connecté', priorite: 'Très Haute' },
  { id: 'dm-011', organisation: 'PNUD — Bureau Régional', fonction: 'Programme Manager Gouvernance', nom: 'Awa Diop', pays: 'Sénégal', secteur: 'Agence ONU', domaine: 'Gouvernance', contact_status: 'Relation existante', priorite: 'Haute' },
  { id: 'dm-012', organisation: 'GIZ', fonction: 'Country Director Mali', nom: 'Dr. Klaus Schmidt', pays: 'Mali', secteur: 'Agence Bilatérale', domaine: 'Direction Pays', contact_status: 'Non connecté', priorite: 'Moyenne' },
  { id: 'dm-013', organisation: 'USAID West Africa', fonction: 'Procurement Director', nom: 'Jennifer Osei', pays: 'Ghana', secteur: 'Agence Bilatérale', domaine: 'Marchés Publics', contact_status: 'Non connecté', priorite: 'Critique' },
  { id: 'dm-014', organisation: 'Ministère Finances Côte d\'Ivoire', fonction: 'Directeur de Cabinet', nom: 'M. Konaté', pays: 'Côte d\'Ivoire', secteur: 'Gouvernement', domaine: 'Finances Publiques', contact_status: 'Non connecté', priorite: 'Haute' },
  { id: 'dm-015', organisation: 'BOAD', fonction: 'Directeur des Opérations', nom: 'Koffi Amegee', pays: 'Togo', secteur: 'Banque de Développement', domaine: 'Opérations', contact_status: 'Non connecté', priorite: 'Haute' },
  { id: 'dm-016', organisation: 'COBAC', fonction: 'Secrétaire Général', nom: 'Jean-Paul Mba', pays: 'Gabon', secteur: 'Régulateur Financier', domaine: 'Supervision', contact_status: 'Non connecté', priorite: 'Très Haute' },
  { id: 'dm-017', organisation: 'Coris Bank International', fonction: 'Directeur Administratif et Financier', nom: 'M. Ouédraogo', pays: 'Burkina Faso', secteur: 'Banque Commerciale', domaine: 'Finance', contact_status: 'Non connecté', priorite: 'Haute' },
  { id: 'dm-018', organisation: 'Coris Bank International', fonction: 'Head of Risk & Compliance', nom: 'Aïcha Tall', pays: 'Sénégal', secteur: 'Banque Commerciale', domaine: 'Risques', contact_status: 'Non connecté', priorite: 'Très Haute' },
  { id: 'dm-019', organisation: 'Commission UEMOA', fonction: 'Commissaire Marché Régional', nom: 'Filiga Sawadogo', pays: 'Burkina Faso', secteur: 'Organisation Régionale', domaine: 'Intégration', contact_status: 'Non connecté', priorite: 'Haute' },
  { id: 'dm-020', organisation: 'Expertise France', fonction: 'Coordinatrice Projets Afrique', nom: 'Marie Lambert', pays: 'France', secteur: 'Agence Technique', domaine: 'Coopération', contact_status: 'Non connecté', priorite: 'Haute' },
  { id: 'dm-021', organisation: 'MCC — Africa', fonction: 'Deputy VP Compact Operations', nom: 'Kyeh Kim', pays: 'USA', secteur: 'Agence Bilatérale', domaine: 'Opérations', contact_status: 'Non connecté', priorite: 'Moyenne' },
  { id: 'dm-022', organisation: 'FMI — Département Afrique', fonction: 'Resident Representative Sénégal', nom: 'Edward Gemayel', pays: 'Sénégal', secteur: 'Institution Financière', domaine: 'Assistance Technique', contact_status: 'Non connecté', priorite: 'Haute' },
  { id: 'dm-023', organisation: 'Orange Finances Mobiles', fonction: 'Chief Compliance Officer', nom: 'Saliou Niang', pays: 'Sénégal', secteur: 'FinTech', domaine: 'Conformité', contact_status: 'Non connecté', priorite: 'Haute' },
  { id: 'dm-024', organisation: 'JICA — Bureau Afrique', fonction: 'Senior Representative', nom: 'Hiroshi Tanaka', pays: 'Sénégal', secteur: 'Agence Bilatérale', domaine: 'Coopération', contact_status: 'Non connecté', priorite: 'Basse' },
];

// ============================================================
// AGENT 3 : AFRICA PROJECT MONITOR™
// Surveillance continue des projets et opportunités
// ============================================================
export const africaProjectMonitor = [
  { id: 'proj-001', titre: 'Programme Inclusion Financière Digitale UEMOA', bailleur: 'Banque Mondiale', budget_musd: 120, statut: 'En cours', phase: 'Exécution', date_debut: '2025-03', date_fin: '2028-03', pays: 'UEMOA (8 pays)', opportunite_khepra: 'Audit conformité, Formation régulateurs', score_opportunite: 92, alerte: 'active' },
  { id: 'proj-002', titre: 'Appui Gouvernance Financière BCEAO Phase III', bailleur: 'AFD', budget_musd: 15, statut: 'Préparation', phase: 'Appel d\'offres', date_debut: '2026-09', date_fin: '2029-09', pays: 'UEMOA', opportunite_khepra: 'Mission pré-inspection, Audit contrôle interne', score_opportunite: 98, alerte: 'critique' },
  { id: 'proj-003', titre: 'Suptech BCEAO — Modernisation Supervision', bailleur: 'BCEAO/FMI', budget_musd: 8, statut: 'En cours', phase: 'Lancement', date_debut: '2026-01', date_fin: '2027-12', pays: 'UEMOA', opportunite_khepra: 'Conseil en architecture Suptech', score_opportunite: 85, alerte: 'active' },
  { id: 'proj-004', titre: 'Projet Régional Corridor Dakar-Bamako', bailleur: 'BAD', budget_musd: 340, statut: 'En cours', phase: 'Exécution', date_debut: '2024-06', date_fin: '2029-06', pays: 'Sénégal, Mali', opportunite_khepra: 'Audit ESG, Due diligence sous-traitants', score_opportunite: 72, alerte: 'watch' },
  { id: 'proj-005', titre: 'Projet Gouvernance Fiscale CEDEAO', bailleur: 'Expertise France', budget_musd: 22, statut: 'Préparation', phase: 'Appel à manifestation', date_debut: '2026-10', date_fin: '2029-10', pays: 'CEDEAO (15 pays)', opportunite_khepra: 'Diagnostic gouvernance fiscale', score_opportunite: 88, alerte: 'critique' },
  { id: 'proj-006', titre: 'Compact Énergie Sénégal II', bailleur: 'MCC', budget_musd: 550, statut: 'Préparation', phase: 'Due diligence initiale', date_debut: '2027-01', date_fin: '2032-01', pays: 'Sénégal', opportunite_khepra: 'Due diligence réglementaire, Audit ESG', score_opportunite: 78, alerte: 'watch' },
  { id: 'proj-007', titre: 'Réforme Supervision Bancaire CEMAC', bailleur: 'COBAC/BAD', budget_musd: 12, statut: 'Préparation', phase: 'Étude préliminaire', date_debut: '2026-11', date_fin: '2028-11', pays: 'CEMAC (6 pays)', opportunite_khepra: 'Diagnostic institutionnel', score_opportunite: 91, alerte: 'critique' },
  { id: 'proj-008', titre: 'Fonds Résilience PME Sahel', bailleur: 'GIZ/PNUD', budget_musd: 45, statut: 'En cours', phase: 'Exécution', date_debut: '2025-09', date_fin: '2028-09', pays: 'Burkina, Mali, Niger', opportunite_khepra: 'Audit PME, Accompagnement gouvernance', score_opportunite: 68, alerte: 'active' },
  { id: 'proj-009', titre: 'Projet Data Center Régional UEMOA', bailleur: 'BOAD', budget_musd: 95, statut: 'Préparation', phase: 'Faisabilité', date_debut: '2026-12', date_fin: '2029-12', pays: 'UEMOA', opportunite_khepra: 'Étude de faisabilité, Business plan', score_opportunite: 84, alerte: 'active' },
  { id: 'proj-010', titre: 'Programme Résilience Climatique Banques', bailleur: 'FMI/Banque Mondiale', budget_musd: 30, statut: 'Préparation', phase: 'Consultation', date_debut: '2026-08', date_fin: '2028-08', pays: 'Afrique Francophone', opportunite_khepra: 'Stress tests climat, ESG assessment', score_opportunite: 87, alerte: 'active' },
  { id: 'proj-011', titre: 'Mise en Œuvre Bâle III UEMOA', bailleur: 'BCEAO', budget_musd: 18, statut: 'En cours', phase: 'Déploiement', date_debut: '2025-06', date_fin: '2028-12', pays: 'UEMOA', opportunite_khepra: 'Conseil mise en conformité Bâle III', score_opportunite: 95, alerte: 'critique' },
  { id: 'proj-012', titre: 'Plateforme Régionale e-Procurement', bailleur: 'Commission UEMOA', budget_musd: 25, statut: 'Préparation', phase: 'Appel d\'offres', date_debut: '2026-09', date_fin: '2029-03', pays: 'UEMOA', opportunite_khepra: 'Audit SI, Certification processus', score_opportunite: 65, alerte: 'watch' },
  { id: 'proj-013', titre: 'Modernisation Audit Interne Public', bailleur: 'Ministère Finances CI', budget_musd: 6, statut: 'En cours', phase: 'Exécution', date_debut: '2026-04', date_fin: '2027-10', pays: 'Côte d\'Ivoire', opportunite_khepra: 'Formation, Manuel procédures', score_opportunite: 76, alerte: 'active' },
  { id: 'proj-014', titre: 'Expansion Core Banking Coris Bank', bailleur: 'Coris Bank', budget_musd: 28, statut: 'En cours', phase: 'Déploiement', date_debut: '2026-01', date_fin: '2027-06', pays: 'Multi-pays', opportunite_khepra: 'Audit SI bancaire, PMO', score_opportunite: 72, alerte: 'watch' },
  { id: 'proj-015', titre: 'Agrément Établissement Paiement Mobile', bailleur: 'Orange Finances Mobiles', budget_musd: 3, statut: 'Préparation', phase: 'Montage dossier', date_debut: '2026-07', date_fin: '2027-01', pays: 'UEMOA', opportunite_khepra: 'Montage dossier agrément', score_opportunite: 90, alerte: 'critique' },
  { id: 'proj-016', titre: 'Fonds Investissement PME Africaines', bailleur: 'IFC/BAD', budget_musd: 200, statut: 'Préparation', phase: 'Structuration', date_debut: '2027-03', date_fin: '2032-03', pays: 'Afrique', opportunite_khepra: 'Due diligence portefeuille', score_opportunite: 80, alerte: 'watch' },
];

// ============================================================
// AGENT 4 : THOUGHT LEADERSHIP FACTORY™
// Publications, livres blancs, études
// ============================================================
export const thoughtLeadershipProductions = [
  { id: 'tl-001', titre: 'Baromètre Conformité UEMOA/CEMAC — Édition H1 2026', type: 'Livre Blanc', theme: 'Régulation Bancaire', pages: 68, statut: 'Publié', date: '2026-06-01', citations: 34, canaux: ['Site Web', 'LinkedIn', 'Newsletter'], score_qualite: 9.5 },
  { id: 'tl-002', titre: 'L\'Avenir de la Supervision Bancaire en Afrique Francophone', type: 'Étude Sectorielle', theme: 'Supervision', pages: 54, statut: 'En Relecture', date: '2026-06-20', citations: 0, canaux: ['Site Web', 'LinkedIn'], score_qualite: 9.2 },
  { id: 'tl-003', titre: 'Guide Pratique : Préparer une Inspection BCEAO en 2026', type: 'Guide Pratique', theme: 'BCEAO', pages: 42, statut: 'Publié', date: '2026-05-15', citations: 28, canaux: ['Site Web', 'LinkedIn', 'Email'], score_qualite: 9.4 },
  { id: 'tl-004', titre: 'Bâle III en Afrique — Impacts et Opportunités pour les Banques UEMOA', type: 'Livre Blanc', theme: 'Régulation', pages: 76, statut: 'Publié', date: '2026-04-10', citations: 19, canaux: ['Site Web', 'LinkedIn'], score_qualite: 9.3 },
  { id: 'tl-005', titre: 'ESG et Institutions Financières Africaines — État des Lieux 2026', type: 'Note de Recherche', theme: 'ESG', pages: 28, statut: 'En Rédaction', date: '2026-07-15', citations: 0, canaux: ['Site Web', 'Newsletter'], score_qualite: 8.8 },
  { id: 'tl-006', titre: 'Gouvernance des Entreprises Familiales Ouest-Africaines', type: 'Position Paper', theme: 'Gouvernance', pages: 18, statut: 'Planifié', date: '2026-08-01', citations: 0, canaux: ['LinkedIn', 'Newsletter'], score_qualite: 9.0 },
  { id: 'tl-007', titre: 'Stress Tests Climatiques : Implications pour le Secteur Bancaire Africain', type: 'Position Paper', theme: 'Climat', pages: 24, statut: 'Planifié', date: '2026-08-15', citations: 0, canaux: ['Site Web', 'LinkedIn'], score_qualite: 8.9 },
  { id: 'tl-008', titre: 'FinTech Regulation in Francophone Africa — Comparative Analysis', type: 'Étude Sectorielle', theme: 'FinTech', pages: 58, statut: 'Publié', date: '2026-03-22', citations: 41, canaux: ['Site Web', 'LinkedIn', 'Email'], score_qualite: 9.6 },
  { id: 'tl-009', titre: 'Prix de Transfert en Afrique Subsaharienne — Guide 2026', type: 'Guide Pratique', theme: 'Fiscalité', pages: 36, statut: 'En Rédaction', date: '2026-07-30', citations: 0, canaux: ['Site Web', 'Email'], score_qualite: 8.7 },
  { id: 'tl-010', titre: 'LBC/FT — Nouvelles Exigences GAFI et Impacts Afrique Francophone', type: 'Note de Recherche', theme: 'LCB/FT', pages: 32, statut: 'Publié', date: '2026-06-05', citations: 22, canaux: ['Site Web', 'LinkedIn', 'Newsletter'], score_qualite: 9.1 },
  { id: 'tl-011', titre: 'Digitalisation des Marchés Publics en Afrique de l\'Ouest', type: 'Étude Sectorielle', theme: 'Marchés Publics', pages: 44, statut: 'En Relecture', date: '2026-06-25', citations: 0, canaux: ['Site Web', 'LinkedIn'], score_qualite: 8.6 },
  { id: 'tl-012', titre: 'OHADA — Évolutions Juridiques Majeures 2025-2026', type: 'Veille Réglementaire', theme: 'Droit des Affaires', pages: 20, statut: 'Publié', date: '2026-05-28', citations: 15, canaux: ['Site Web', 'Newsletter'], score_qualite: 9.0 },
];

// ============================================================
// AGENT 5 : PROCUREMENT AWARENESS ENGINE™
// Fiches de compte et opportunités
// ============================================================
export const procurementAwareness = [
  { id: 'pa-001', organisation: 'Banque Mondiale', profil: 'Donneur multilatéral — Procédures WB', analyse: 'Cycles procurement Q1/Q3, financements IDA actifs UEMOA', besoins_detectes: ['Audit portefeuille', 'Formation régulateurs', 'Diagnostic institutionnel'], opportunites_active: 3, derniere_soumission: 'N/A', score_alignement: 92 },
  { id: 'pa-002', organisation: 'AFD', profil: 'Agence bilatérale — Procédures françaises', analyse: 'Pipeline gouvernance financière actif, 3 AMI en cours', besoins_detectes: ['Mission BCEAO Phase III', 'Audit contrôle interne', 'Assistance technique'], opportunites_active: 4, derniere_soumission: 'N/A', score_alignement: 95 },
  { id: 'pa-003', organisation: 'BCEAO', profil: 'Banque Centrale UEMOA — Procédures BCEAO', analyse: 'Consultations rolling toute l\'année, panels auditeurs', besoins_detectes: ['Pré-inspection', 'Audit ICAAP', 'Conseil Suptech'], opportunites_active: 5, derniere_soumission: '2026-02 — Panel auditeur', score_alignement: 98 },
  { id: 'pa-004', organisation: 'BAD', profil: 'Banque multilatérale africaine', analyse: 'Procurement via e-procurement BAD, seuils élevés', besoins_detectes: ['Due diligence', 'Études sectorielles', 'Audit projets'], opportunites_active: 2, derniere_soumission: 'N/A', score_alignement: 78 },
  { id: 'pa-005', organisation: 'BOAD', profil: 'Banque de développement UEMOA', analyse: 'Procurement plus agile que BAD, secteurs ciblés', besoins_detectes: ['Audit gouvernance', 'Étude faisabilité', 'Conseil SI'], opportunites_active: 3, derniere_soumission: 'N/A', score_alignement: 82 },
  { id: 'pa-006', organisation: 'Ecobank', profil: 'Groupe bancaire panafricain', analyse: 'RFP directs, panels auditeurs, relation C-Level', besoins_detectes: ['Audit interne', 'Conformité', 'Risk management'], opportunites_active: 1, derniere_soumission: 'N/A', score_alignement: 75 },
  { id: 'pa-007', organisation: 'COBAC', profil: 'Régulateur CEMAC', analyse: 'Consultations techniques ciblées, marché niche', besoins_detectes: ['Audit supervision', 'Diagnostic', 'Formation'], opportunites_active: 2, derniere_soumission: 'N/A', score_alignement: 88 },
  { id: 'pa-008', organisation: 'Ministère Finances CI', profil: 'Gouvernement — Procédures marchés publics', analyse: 'AO nationaux publiés, concurrence locale forte', besoins_detectes: ['Audit organisationnel', 'Modernisation fiscale'], opportunites_active: 1, derniere_soumission: 'N/A', score_alignement: 65 },
];

// ============================================================
// AGENT 6 : REPUTATION & AUTHORITY ENGINE™
// Mesure de l'autorité institutionnelle
// ============================================================
export const reputationAuthority = [
  { id: 'rep-001', indicateur: 'Citations Institutionnelles', valeur: 487, variation: '+34%', objectif: 1000, unite: 'citations', source: 'Google Scholar + Web', score: '9.2/10', label: 'En forte croissance', description: 'Nombre de citations dans rapports officiels, études académiques' },
  { id: 'rep-002', indicateur: 'Backlinks Institutionnels', valeur: 328, variation: '+22%', objectif: 500, unite: 'domaines', source: 'Ahrefs/SEMrush', score: '8.8/10', label: 'Progression stable', description: 'Liens entrants depuis sites .gov, .edu, organisations internationales' },
  { id: 'rep-003', indicateur: 'Publications Reprises', valeur: 56, variation: '+41%', objectif: 120, unite: 'reprises', source: 'Média monitoring', score: '8.5/10', label: 'Accélération', description: 'Reprises presse, citations médias, mentions think tanks' },
  { id: 'rep-004', indicateur: 'Invitations Conférences', valeur: 12, variation: '+50%', objectif: 24, unite: 'invitations/an', source: 'CRM événementiel', score: '8.0/10', label: 'En accélération', description: 'Invitations panels, keynotes, conférences sectorielles' },
  { id: 'rep-005', indicateur: 'Téléchargements Livres Blancs', valeur: 2340, variation: '+67%', objectif: 5000, unite: 'téléchargements', source: 'Analytics site', score: '8.7/10', label: 'Forte traction', description: 'Téléchargements cumulés depuis mise en ligne' },
  { id: 'rep-006', indicateur: 'Mentions Institutionnelles', valeur: 89, variation: '+28%', objectif: 200, unite: 'mentions', source: 'Social listening', score: '7.9/10', label: 'En hausse', description: 'Mentions dans communiqués, rapports officiels, sites partenaires' },
  { id: 'rep-007', indicateur: 'Score d\'Autorité Globale', valeur: 86, variation: '+8 pts', objectif: 95, unite: '/100', source: 'KOS Reputation Engine', score: '9.0/10', label: 'Très bon', description: 'Score composite pondéré des 6 critères' },
  { id: 'rep-008', indicateur: 'Score Crédibilité Sectorielle', valeur: 91, variation: '+5 pts', objectif: 98, unite: '/100', source: 'KOS Reputation Engine', score: '9.4/10', label: 'Excellent', description: 'Crédibilité perçue dans régulation bancaire & audit' },
];

// ============================================================
// AGENT 7 : STRATEGIC RELATIONSHIP ENGINE™
// Système d'alertes stratégiques
// ============================================================
export const strategicRelationshipAlerts = [
  { id: 'alt-001', organisation: 'BCEAO', type_alerte: 'Appel d\'Offres', titre: 'Mission de pré-inspection bancaire 2026-2027', date_detection: '2026-06-12', priorite: 'Critique', action_requise: 'Préparer proposition technique & financière', deadline: '2026-07-25', statut: 'En préparation', assigne: 'BU1 — Régulation' },
  { id: 'alt-002', organisation: 'AFD', type_alerte: 'Appel à Manifestation', titre: 'AMI Gouvernance Financière BCEAO Phase III', date_detection: '2026-06-08', priorite: 'Critique', action_requise: 'Soumettre manifestation d\'intérêt', deadline: '2026-07-15', statut: 'Manifestation envoyée', assigne: 'BU1 — Régulation' },
  { id: 'alt-003', organisation: 'COBAC', type_alerte: 'Consultation', titre: 'Diagnostic système supervision bancaire CEMAC', date_detection: '2026-06-14', priorite: 'Critique', action_requise: 'Veille active, préparer note d\'analyse', deadline: '2026-08-01', statut: 'En analyse', assigne: 'Direction Générale' },
  { id: 'alt-004', organisation: 'Banque Mondiale', type_alerte: 'DAO', titre: 'DAO-2026-089 — Audit portefeuille microfinance UEMOA', date_detection: '2026-06-10', priorite: 'Haute', action_requise: 'Analyser cahier des charges', deadline: '2026-08-05', statut: 'Nouveau', assigne: 'BU1 — Régulation' },
  { id: 'alt-005', organisation: 'Bad', type_alerte: 'RFP', titre: 'RFP-2026-098 — Étude faisabilité Data Center Régional', date_detection: '2026-06-15', priorite: 'Haute', action_requise: 'Identifier partenaire technique', deadline: '2026-07-30', statut: 'Nouveau', assigne: 'BU3 — GRC' },
  { id: 'alt-006', organisation: 'Banque Mondiale', type_alerte: 'Nouveau Programme', titre: 'Lancement Stress Tests Climatiques — Banques UEMOA', date_detection: '2026-06-13', priorite: 'Haute', action_requise: 'Produire note de positionnement ESG', deadline: '2026-07-20', statut: 'Production en cours', assigne: 'BU4 — Think Tank' },
  { id: 'alt-007', organisation: 'Orange Finances Mobiles', type_alerte: 'EOI', titre: 'EOI-2026-078 — Conformité LBC/FT mobile money', date_detection: '2026-06-11', priorite: 'Haute', action_requise: 'Préparer réponse technique LBC/FT', deadline: '2026-07-10', statut: 'En préparation', assigne: 'BU1 — Régulation' },
  { id: 'alt-008', organisation: 'Expertise France', type_alerte: 'AMI', titre: 'Projet Gouvernance Fiscale CEDEAO — Recrutement', date_detection: '2026-06-09', priorite: 'Moyenne', action_requise: 'Analyser opportunité fiscale', deadline: '2026-08-15', statut: 'Nouveau', assigne: 'BU2 — Prix de Transfert' },
  { id: 'alt-009', organisation: 'Coris Bank', type_alerte: 'Consultation Directe', titre: 'Audit ICAAP/ILAAP Groupe Coris', date_detection: '2026-06-14', priorite: 'Haute', action_requise: 'Préparer offre commerciale', deadline: '2026-07-05', statut: 'Proposition envoyée', assigne: 'BU1 — Régulation' },
  { id: 'alt-010', organisation: 'Ministère Finances CI', type_alerte: 'AO National', titre: 'AO-2026-134 — Audit organisationnel DGI', date_detection: '2026-06-13', priorite: 'Moyenne', action_requise: 'Évaluer faisabilité consortium', deadline: '2026-07-28', statut: 'Nouveau', assigne: 'BU3 — GRC' },
  { id: 'alt-011', organisation: 'Commission UEMOA', type_alerte: 'AO', titre: 'AO-2026-145 — Étude convergence réglementaire bancaire', date_detection: '2026-06-15', priorite: 'Haute', action_requise: 'Préparer proposition consortium', deadline: '2026-08-10', statut: 'Nouveau', assigne: 'BU4 — Think Tank' },
  { id: 'alt-012', organisation: 'MCC', type_alerte: 'RFP', titre: 'RFP-2026-055 — Due diligence projet énergie Sénégal', date_detection: '2026-06-12', priorite: 'Haute', action_requise: 'Identifier partenaire energy', deadline: '2026-08-20', statut: 'Nouveau', assigne: 'BU3 — GRC' },
];

// ============================================================
// AGENT 8 : KHEPRA EXPERT PROFILE ENGINE™
// Profils, capability statements, références
// ============================================================
export const expertProfiles = [
  { id: 'exp-001', titre: 'Capability Statement — Regulatory & Financial Services', type: 'Capability Statement', pages: 12, statut: 'Publié', secteurs: ['Banque', 'Régulation', 'Conformité'], references_cles: ['BCEAO', 'COBAC', 'OHADA'], certifications: ['ISO 31000', 'COSO 2013', 'Bâle III'], derniere_maj: '2026-05-20', score_qualite: 9.5 },
  { id: 'exp-002', titre: 'Capability Statement — Governance, Risk & Compliance', type: 'Capability Statement', pages: 10, statut: 'Publié', secteurs: ['Gouvernance', 'Risques', 'Audit Interne'], references_cles: ['FMI', 'Banque Mondiale', 'Ministères'], certifications: ['COSO ERM', 'ISO 37000', 'GAFI'], derniere_maj: '2026-05-25', score_qualite: 9.3 },
  { id: 'exp-003', titre: 'Corporate Profile — Khepra Experts 2026', type: 'Corporate Profile', pages: 28, statut: 'À Mettre à Jour', secteurs: ['Conseil', 'Audit', 'Formation'], references_cles: ['22 ans', '15 pays', '3 BUs'], certifications: ['Toutes'], derniere_maj: '2026-03-15', score_qualite: 8.8 },
  { id: 'exp-004', titre: 'Fiche Sectorielle — Microfinance UEMOA', type: 'Fiche Sectorielle', pages: 8, statut: 'En Révision', secteurs: ['Microfinance', 'Inclusion Financière'], references_cles: ['SFD', 'UEMOA', 'BCEAO'], certifications: ['Normes SFD'], derniere_maj: '2026-06-01', score_qualite: 9.0 },
  { id: 'exp-005', titre: 'Dossier Présentation — Pré-Inspection BCEAO', type: 'Dossier Présentation', pages: 16, statut: 'Publié', secteurs: ['Banque', 'BCEAO', 'Audit'], references_cles: ['15 missions', '8 banques', '100% succès'], certifications: ['Panel Auditeur BCEAO'], derniere_maj: '2026-06-10', score_qualite: 9.6 },
  { id: 'exp-006', titre: 'CV Institutionnel — Managing Partner', type: 'CV Institutionnel', pages: 4, statut: 'Publié', secteurs: ['Direction', 'Stratégie', 'Conseil'], references_cles: ['22 ans', 'Harvard', 'Big Four'], certifications: ['Expert BCEAO', 'COSO'], derniere_maj: '2026-04-10', score_qualite: 9.4 },
  { id: 'exp-007', titre: 'Capability Statement — Transfer Pricing & Tax', type: 'Capability Statement', pages: 10, statut: 'En Rédaction', secteurs: ['Fiscalité', 'Prix de Transfert'], references_cles: ['BEPS', 'OCDE', 'OHADA'], certifications: ['BEPS Action 13'], derniere_maj: '2026-06-15', score_qualite: 8.5 },
  { id: 'exp-008', titre: 'Fiche d\'Expérience — Audit Organisationnel DGI CI', type: 'Fiche d\'Expérience', pages: 4, statut: 'En Relecture', secteurs: ['Gouvernement', 'Fiscalité'], references_cles: ['Ministère CI', 'DGI'], certifications: ['ISO 9001'], derniere_maj: '2026-06-08', score_qualite: 9.0 },
  { id: 'exp-009', titre: 'Capability Statement — Think Tank & Research', type: 'Capability Statement', pages: 12, statut: 'En Rédaction', secteurs: ['Recherche', 'Prospective', 'Policy'], references_cles: ['5 publications', '+74 citations'], certifications: ['Peer-reviewed'], derniere_maj: '2026-06-12', score_qualite: 8.7 },
  { id: 'exp-010', titre: 'Dossier Partenariat — Consortium Grands Projets', type: 'Dossier Présentation', pages: 14, statut: 'Planifié', secteurs: ['Multi-sectoriel'], references_cles: ['Consortium', 'Grands Projets'], certifications: ['Toutes'], derniere_maj: '2026-07-01', score_qualite: 8.0 },
];

// ============================================================
// AGENT 9 : KNOWLEDGE DISTRIBUTION ENGINE™
// Canaux de distribution de contenu
// ============================================================
export const knowledgeDistributionChannels = [
  { id: 'ch-001', canal: 'Site Web Khepra Experts', type: 'Propriétaire', audience: 12500, engagement: '8.4%', frequence: 'Hebdomadaire', contenus_mois: 12, performance: 'En hausse', score_efficacite: '9.2/10', description: 'Articles blog, pages services, études de cas, outils' },
  { id: 'ch-002', canal: 'LinkedIn — Page Entreprise', type: 'Réseau Social', audience: 8400, engagement: '5.8%', frequence: '3x/semaine', contenus_mois: 12, performance: 'Stable', score_efficacite: '8.5/10', description: 'Posts, articles, partages études, infographies' },
  { id: 'ch-003', canal: 'Newsletter Mensuelle', type: 'Email', audience: 3200, engagement: '28.4%', frequence: 'Mensuelle', contenus_mois: 4, performance: 'En hausse', score_efficacite: '9.0/10', description: 'Synthèse réglementaire, nouvelles publications, événements' },
  { id: 'ch-004', canal: 'Centre de Connaissances', type: 'Propriétaire', audience: 5200, engagement: '12.2%', frequence: 'Continu', contenus_mois: 8, performance: 'En forte hausse', score_efficacite: '9.4/10', description: 'Livres blancs, guides, templates, matrices' },
  { id: 'ch-005', canal: 'Conférences & Événements', type: 'Présentiel', audience: 1800, engagement: 'Haut (qualitatif)', frequence: 'Mensuelle', contenus_mois: 2, performance: 'En accélération', score_efficacite: '8.2/10', description: 'Keynotes, panels, formations, salons sectoriels' },
  { id: 'ch-006', canal: 'Webinaires', type: 'Digital', audience: 950, engagement: '42.5%', frequence: 'Bimensuelle', contenus_mois: 2, performance: 'En hausse', score_efficacite: '8.8/10', description: 'Présentations live, Q&A, démonstrations outils' },
  { id: 'ch-007', canal: 'Publications Académiques', type: 'Institutionnel', audience: 2100, engagement: 'Faible (académique)', frequence: 'Trimestrielle', contenus_mois: 1, performance: 'Stable', score_efficacite: '7.5/10', description: 'Peer-reviewed journals, working papers, collaborations' },
  { id: 'ch-008', canal: 'RSS / Veille Réglementaire', type: 'Digital', audience: 750, engagement: '65.2%', frequence: 'Quotidienne', contenus_mois: 30, performance: 'Très haute', score_efficacite: '9.6/10', description: 'Alertes réglementaires automatisées, push email' },
];

// ============================================================
// KPI GLOBAL SUMMARY
// ============================================================
export const institutionalVisibilityKPIs = {
  total_agents: 9,
  total_organizations_suivies: 10150,
  total_decision_makers_cartographies: 100240,
  total_projets_suivis: 16200,
  total_opportunites_detectees_an: 547,
  total_consultations_qualifiees_an: 112,
  total_interactions_qualifiees_an: 1280,
  total_livres_blancs_an: 14,
  total_etudes_sectorielles_an: 28,
  total_backlinks_institutionnels: 328,
  score_autorite_global: 86,
  score_visibilite: 82,
  score_credibilite_sectorielle: 91,
  croissance_trafic_organique: '+34%',
  croissance_backlinks: '+22%',
  alertes_actives: 12,
  alertes_critiques: 5,
  actions_en_cours: 8,
  is_mode_reel: false,
  target_organizations: 10000,
  target_decision_makers: 100000,
  target_projets: 20000,
  target_opportunites: 500,
  target_livres_blancs: 12,
  target_etudes: 24,
};

// ============================================================
// MP9 — ENRICHMENT : SEGMENTATION 7 TYPES D'ACTEURS
// Cartographie explicite par catégorie cible
// ============================================================
export interface TargetSegment {
  id: string;
  nom: string;
  icon: string;
  couleur: 'primary' | 'accent' | 'secondary';
  organisations_suivies: number;
  decideurs_cartographies: number;
  opportunites_actives: number;
  score_penetration: number;
  priorite: 'Prioritaire' | 'Élevée' | 'Moyenne';
  description: string;
  organisations_cles: string[];
  derniere_action: string;
  prochaine_action: string;
}

export const targetSegments: TargetSegment[] = [
  {
    id: 'banques',
    nom: 'Banques',
    icon: 'ri-bank-line',
    couleur: 'primary',
    organisations_suivies: 47,
    decideurs_cartographies: 235,
    opportunites_actives: 12,
    score_penetration: 88,
    priorite: 'Prioritaire',
    description: 'Banques commerciales UEMOA et CEMAC — 47 établissements agréés. Cœur de métier Khepra : pré-inspection BCEAO/COBAC, audit interne, conformité Bâle III, ICAAP/ILAAP.',
    organisations_cles: ['Ecobank', 'Coris Bank International', 'BOA Group', 'NSIA Banque', 'Bridge Bank Group'],
    derniere_action: 'Proposition envoyée — Audit ICAAP Groupe Coris (05/07)',
    prochaine_action: 'Relance 3 banques CEMAC pour pré-inspection COBAC',
  },
  {
    id: 'sfd',
    nom: 'SFD (Microfinance)',
    icon: 'ri-user-heart-line',
    couleur: 'accent',
    organisations_suivies: 89,
    decideurs_cartographies: 356,
    opportunites_actives: 8,
    score_penetration: 96,
    priorite: 'Prioritaire',
    description: 'Systèmes Financiers Décentralisés UEMOA — 89 SFD de grande taille suivis. Expertise historique : conformité Instruction BCEAO, agrément, audit portefeuille.',
    organisations_cles: ['PAMECAS', 'CMS', 'MECAP', 'UM-PAMECAS', 'FCPB'],
    derniere_action: 'DAO-2026-089 — Audit portefeuille microfinance UEMOA (soumission en cours)',
    prochaine_action: 'Webinaire SFD — Nouvelles exigences BCEAO 2026 (25/07)',
  },
  {
    id: 'etats',
    nom: 'États',
    icon: 'ri-government-line',
    couleur: 'secondary',
    organisations_suivies: 24,
    decideurs_cartographies: 120,
    opportunites_actives: 5,
    score_penetration: 62,
    priorite: 'Élevée',
    description: 'Gouvernements et États souverains — 24 entités étatiques suivies. Opportunités : audit organisationnel, modernisation fiscale, conseil en finances publiques.',
    organisations_cles: ['Côte d\'Ivoire', 'Sénégal', 'Burkina Faso', 'Mali', 'Bénin', 'Togo'],
    derniere_action: 'AO-2026-134 — Audit organisationnel DGI Côte d\'Ivoire',
    prochaine_action: 'Démarcher Ministère Finances Sénégal — modernisation fiscale',
  },
  {
    id: 'ministeres',
    nom: 'Ministères',
    icon: 'ri-building-4-line',
    couleur: 'primary',
    organisations_suivies: 36,
    decideurs_cartographies: 180,
    opportunites_actives: 7,
    score_penetration: 58,
    priorite: 'Moyenne',
    description: 'Ministères sectoriels (Finances, Plan, Énergie, Agriculture) — 36 ministères suivis dans 8 pays UEMOA.',
    organisations_cles: ['Ministère Économie & Finances CI', 'Ministère Finances Sénégal', 'Ministère du Plan Burkina', 'Ministère Énergie Mali'],
    derniere_action: 'Contact établi — Directeur de Cabinet MEF CI',
    prochaine_action: 'Proposer diagnostic flash gouvernance des finances publiques',
  },
  {
    id: 'bailleurs',
    nom: 'Bailleurs',
    icon: 'ri-funds-line',
    couleur: 'accent',
    organisations_suivies: 18,
    decideurs_cartographies: 90,
    opportunites_actives: 14,
    score_penetration: 74,
    priorite: 'Prioritaire',
    description: 'Bailleurs de fonds multilatéraux et bilatéraux — BM, BAD, AFD, FMI, BOAD, USAID, GIZ, UE, PNUD. Plus gros pipeline en valeur.',
    organisations_cles: ['Banque Mondiale', 'BAD', 'AFD', 'FMI', 'BOAD', 'USAID'],
    derniere_action: 'AMI-2026-034 — Appui gouvernance BCEAO Phase III (manifestation envoyée)',
    prochaine_action: 'Répondre RFP-2026-098 — Data Center Régional BAD (30/07)',
  },
  {
    id: 'ong',
    nom: 'ONG',
    icon: 'ri-hand-heart-line',
    couleur: 'secondary',
    organisations_suivies: 42,
    decideurs_cartographies: 168,
    opportunites_actives: 4,
    score_penetration: 45,
    priorite: 'Moyenne',
    description: 'ONG internationales et locales actives en Afrique — 42 ONG suivies. Focus : évaluation de programmes, audit de projets, renforcement de capacités.',
    organisations_cles: ['Plan International', 'World Vision', 'CARE', 'Oxfam', 'Save the Children'],
    derniere_action: 'EOI-2026-055 — Évaluation programme gouvernance PNUD (en analyse)',
    prochaine_action: 'Identifier 5 ONG avec budgets > 20M USD pour démarchage ciblé',
  },
  {
    id: 'fonds',
    nom: 'Fonds d\'Investissement',
    icon: 'ri-pie-chart-line',
    couleur: 'primary',
    organisations_suivies: 28,
    decideurs_cartographies: 112,
    opportunites_actives: 6,
    score_penetration: 68,
    priorite: 'Élevée',
    description: 'Fonds d\'investissement, Private Equity, DFIs — 28 fonds suivis. Opportunités : due diligence, évaluation, structuration de deals.',
    organisations_cles: ['IFC', 'AfricInvest', 'Amethis', 'Cauris Management', 'ADV Partners'],
    derniere_action: 'Projet Fonds PME Africaines IFC/BAD — due diligence portefeuille',
    prochaine_action: 'Contacter 3 fonds PE pour proposition due diligence',
  },
];

// ============================================================
// STRATÉGIE DE VISIBILITÉ INSTITUTIONNELLE
// Vision stratégique par type d'acteur
// ============================================================
export interface VisibilityStrategy {
  id: string;
  axe: string;
  objectif: string;
  description: string;
  segment_cible: string;
  canaux: string[];
  kpis: { label: string; valeur: string; cible: string }[];
  calendrier: string;
  budget_estime: string;
  responsable: string;
  statut: string;
}

export const visibilityStrategy: VisibilityStrategy[] = [
  {
    id: 'strat-001',
    axe: 'Authority Building — Régulation Bancaire',
    objectif: 'Devenir la référence incontournable en conformité réglementaire UEMOA/CEMAC',
    description: 'Positionner Khepra Experts comme l\'autorité numéro 1 sur les sujets BCEAO, COBAC et OHADA via publications, conférences, et présence systématique dans les appels d\'offres régulateurs.',
    segment_cible: 'Banques, SFD, Régulateurs',
    canaux: ['Livres Blancs trimestriels', 'Webinaires bimestriels', 'LinkedIn posts 3x/semaine', 'Conférences sectorielles', 'Newsletter mensuelle régulation'],
    kpis: [
      { label: 'Citations régulateurs', valeur: '34 citations BCEAO/COBAC', cible: '50 citations' },
      { label: 'Invitations panels', valeur: '12/an', cible: '24/an' },
      { label: 'AO régulateurs remportés', valeur: '4', cible: '8' },
    ],
    calendrier: 'Q3 2026 — Q4 2027',
    budget_estime: '45M FCFA',
    responsable: 'BU1 — Régulation Bancaire',
    statut: 'En cours',
  },
  {
    id: 'strat-002',
    axe: 'Institutional Outreach — Bailleurs & DFIs',
    objectif: 'Multiplier par 3 le pipeline bailleurs de fonds d\'ici Q4 2027',
    description: 'Ciblage systématique des procurement managers Banque Mondiale, BAD, AFD, UE, PNUD, FMI. Inscription sur tous les portails e-procurement, réponse aux AMI/EOI/RFP dans les 48h.',
    segment_cible: 'Bailleurs, Fonds',
    canaux: ['Portails e-procurement (WB, AfDB, AFD, UNGM)', 'LinkedIn ciblé procurement managers', 'Dossiers capacité (Capability Statements)', 'Networking événements bailleurs'],
    kpis: [
      { label: 'AO bailleurs répondus', valeur: '8/an', cible: '24/an' },
      { label: 'Win rate bailleurs', valeur: '25%', cible: '40%' },
      { label: 'CA bailleurs', valeur: '120M FCFA/an', cible: '350M FCFA/an' },
    ],
    calendrier: 'Q3 2026 — Q4 2027',
    budget_estime: '30M FCFA',
    responsable: 'Direction Générale + BU3 GRC',
    statut: 'Lancement Q3',
  },
  {
    id: 'strat-003',
    axe: 'Thought Leadership — SFD & Inclusion Financière',
    objectif: 'Maintenir et renforcer le leadership historique en Microfinance',
    description: 'Continuer à dominer le marché SFD UEMOA avec publications exclusives, baromètre semestriel, formation certifiante et présence terrain dans les 8 pays.',
    segment_cible: 'SFD',
    canaux: ['Baromètre SFD semestriel', 'Formation certifiante SFD', 'Missions terrain 8 pays', 'Rapports annuels sectoriels', 'LinkedIn communauté SFD'],
    kpis: [
      { label: 'SFD clients actifs', valeur: '18', cible: '30' },
      { label: 'Taux pénétration SFD (>500M actifs)', valeur: '96%', cible: '100%' },
      { label: 'Récurrence missions', valeur: '75%', cible: '85%' },
    ],
    calendrier: 'Continu',
    budget_estime: '20M FCFA',
    responsable: 'BU1 — SFD & Microfinance',
    statut: 'Actif',
  },
  {
    id: 'strat-004',
    axe: 'Government Relations — États & Ministères',
    objectif: 'Établir Khepra comme partenaire technique de référence des gouvernements UEMOA',
    description: 'Approche B2G structurée : cartographie des directions des marchés publics, participation aux AO nationaux, consortiums avec cabinets internationaux pour grands projets publics.',
    segment_cible: 'États, Ministères',
    canaux: ['AO nationaux et régionaux', 'Relations institutionnelles directes', 'Consortiums internationaux', 'Conférences gouvernance publique'],
    kpis: [
      { label: 'AO publics répondus', valeur: '3/an', cible: '12/an' },
      { label: 'Contrats gouvernementaux', valeur: '1', cible: '5' },
      { label: 'CA secteur public', valeur: '25M FCFA/an', cible: '150M FCFA/an' },
    ],
    calendrier: 'Q3 2026 — Q4 2028',
    budget_estime: '25M FCFA',
    responsable: 'Direction Générale',
    statut: 'En développement',
  },
];

// ============================================================
// CALENDRIER INSTITUTIONNEL 2026
// Événements clés et jalons de visibilité
// ============================================================
export interface InstitutionalEvent {
  id: string;
  date: string;
  evenement: string;
  type: 'Conférence' | 'Publication' | 'AO Deadline' | 'Webinaire' | 'Formation' | 'Networking' | 'Lancement';
  segment_cible: string;
  importance: 'Critique' | 'Haute' | 'Moyenne';
  description: string;
  livrable: string;
  statut: 'Confirmé' | 'En préparation' | 'Planifié' | 'Proposé';
}

export const institutionalCalendar: InstitutionalEvent[] = [
  { id: 'cal-001', date: '2026-07-15', evenement: 'Deadline AMI Gouvernance Financière BCEAO Phase III (AFD)', type: 'AO Deadline', segment_cible: 'Bailleurs, Banques', importance: 'Critique', description: 'Soumission manifestation d\'intérêt pour programme gouvernance BCEAO — budget 15M USD', livrable: 'Dossier AMI complet + Capability Statement', statut: 'En préparation' },
  { id: 'cal-002', date: '2026-07-25', evenement: 'Deadline AO Pré-Inspection Bancaire BCEAO 2026-2027', type: 'AO Deadline', segment_cible: 'Banques', importance: 'Critique', description: 'Mission pré-inspection pour 8 banques UEMOA — panel auditeur BCEAO', livrable: 'Proposition technique & financière', statut: 'En préparation' },
  { id: 'cal-003', date: '2026-07-30', evenement: 'Deadline RFP Data Center Régional BAD', type: 'AO Deadline', segment_cible: 'Bailleurs', importance: 'Haute', description: 'Étude faisabilité Data Center — budget 95M USD', livrable: 'Proposition consortium', statut: 'En préparation' },
  { id: 'cal-004', date: '2026-07-20', evenement: 'Publication Baromètre Conformité UEMOA/CEMAC H1 2026', type: 'Publication', segment_cible: 'Banques, SFD, Régulateurs', importance: 'Haute', description: 'Publication flagship — 68 pages, diffusion multicanal', livrable: 'Livre Blanc + posts LinkedIn + Newsletter', statut: 'Confirmé' },
  { id: 'cal-005', date: '2026-08-01', evenement: 'Conférence Annuelle ABCAO — Dakar', type: 'Conférence', segment_cible: 'Banques, Régulateurs', importance: 'Haute', description: 'Keynote "L\'Avenir de la Supervision Bancaire en Afrique" par le Managing Partner', livrable: 'Présentation + Networking', statut: 'Confirmé' },
  { id: 'cal-006', date: '2026-08-15', evenement: 'Webinaire — Nouvelles Exigences BCEAO 2026 pour les SFD', type: 'Webinaire', segment_cible: 'SFD', importance: 'Haute', description: 'Webinaire technique gratuit pour les dirigeants SFD — cible 200 participants', livrable: 'Slides + replay + lead capture', statut: 'En préparation' },
  { id: 'cal-007', date: '2026-09-10', evenement: 'Publication Guide Pratique — Préparer une Inspection COBAC', type: 'Publication', segment_cible: 'Banques, SFD', importance: 'Haute', description: 'Équivalent CEMAC du Guide BCEAO — 42 pages', livrable: 'Guide + campagne SEO', statut: 'Planifié' },
  { id: 'cal-008', date: '2026-09-25', evenement: 'Formation Certifiante — Gouvernance Bancaire UEMOA (Session 12)', type: 'Formation', segment_cible: 'Banques, SFD', importance: 'Moyenne', description: 'Formation 2 jours — 25 participants, certification Khepra', livrable: 'Support formation + certificats', statut: 'Confirmé' },
  { id: 'cal-009', date: '2026-10-05', evenement: 'Lancement Campagne LinkedIn Ads Q3', type: 'Lancement', segment_cible: 'Tous segments', importance: 'Moyenne', description: 'Campagne ciblée par segment — budget 15M FCFA', livrable: 'Créatifs + landing pages + tracking', statut: 'Planifié' },
  { id: 'cal-010', date: '2026-10-15', evenement: 'Forum Invest in Africa — Paris', type: 'Networking', segment_cible: 'Fonds, Bailleurs', importance: 'Haute', description: 'RDV B2B avec fonds PE, DFIs, family offices — 20 rendez-vous ciblés', livrable: 'Pitch deck + RDV qualifiés', statut: 'Proposé' },
  { id: 'cal-011', date: '2026-11-01', evenement: 'Publication Étude — ESG et Banques Africaines 2027', type: 'Publication', segment_cible: 'Banques, Bailleurs, Fonds', importance: 'Haute', description: 'Étude sectorielle 54 pages — en partenariat avec think tank international', livrable: 'Rapport + conférence de presse', statut: 'Planifié' },
  { id: 'cal-012', date: '2026-12-10', evenement: 'Cérémonie Khepra Institutional Awards 2026', type: 'Networking', segment_cible: 'Tous segments', importance: 'Critique', description: 'Dîner de gala — 120 invités institutionnels, remise Awards Gouvernance', livrable: 'Événement + couverture média + follow-up', statut: 'En préparation' },
];

// ============================================================
// PLAN DE DIFFUSION
// Stratégie de distribution de contenu par canal
// ============================================================
export interface DiffusionPlan {
  id: string;
  canal: string;
  type: 'Push' | 'Pull' | 'Hybride';
  frequence: string;
  audience_estimee: number;
  taux_engagement: string;
  contenu_type: string;
  objectif_trimestriel: string;
  responsable: string;
  cout_mensuel: string;
}

export const diffusionPlan: DiffusionPlan[] = [
  { id: 'diff-001', canal: 'Site Web Khepra — Blog & Centre Connaissances', type: 'Pull', frequence: '12 articles/mois', audience_estimee: 28500, taux_engagement: '8.4%', contenu_type: 'Articles blog, études de cas, guides, livres blancs', objectif_trimestriel: '+25% trafic organique', responsable: 'BU4 — Think Tank', cout_mensuel: '2M FCFA' },
  { id: 'diff-002', canal: 'LinkedIn — Page Entreprise + Profils Experts', type: 'Hybride', frequence: '15 posts/mois', audience_estimee: 8400, taux_engagement: '5.8%', contenu_type: 'Posts expertise, infographies, extraits études, annonces', objectif_trimestriel: '+20% followers, 50 leads/mois', responsable: 'Marketing Digital', cout_mensuel: '1.5M FCFA' },
  { id: 'diff-003', canal: 'Newsletter Mensuelle Khepra Insights', type: 'Push', frequence: 'Mensuelle', audience_estimee: 3200, taux_engagement: '28.4%', contenu_type: 'Synthèse réglementaire, nouvelles publications, événements', objectif_trimestriel: '+500 abonnés, taux ouverture >30%', responsable: 'Marketing Digital', cout_mensuel: '0.5M FCFA' },
  { id: 'diff-004', canal: 'Conférences & Événements Sectoriels', type: 'Push', frequence: '1-2/mois', audience_estimee: 1800, taux_engagement: 'Qualitatif haut', contenu_type: 'Keynotes, panels, formations, stands', objectif_trimestriel: '4 interventions, 80 RDV qualifiés', responsable: 'Direction Générale', cout_mensuel: '3M FCFA' },
  { id: 'diff-005', canal: 'Webinaires Bimensuels', type: 'Hybride', frequence: '2/mois', audience_estimee: 950, taux_engagement: '42.5%', contenu_type: 'Présentations techniques, Q&A, démonstrations outils', objectif_trimestriel: '6 webinaires, 300 inscrits', responsable: 'BU1 — Régulation', cout_mensuel: '1M FCFA' },
  { id: 'diff-006', canal: 'RSS Veille Réglementaire Quotidienne', type: 'Push', frequence: 'Quotidienne', audience_estimee: 750, taux_engagement: '65.2%', contenu_type: 'Alertes réglementaires automatisées', objectif_trimestriel: '500 abonnés, taux rétention >90%', responsable: 'KOS Automaton', cout_mensuel: '0.3M FCFA' },
  { id: 'diff-007', canal: 'Publications Académiques & Working Papers', type: 'Pull', frequence: '1/trimestre', audience_estimee: 2100, taux_engagement: 'Faible (académique)', contenu_type: 'Peer-reviewed journals, collaborations universitaires', objectif_trimestriel: '1 publication, 20 citations', responsable: 'BU4 — Think Tank', cout_mensuel: '0.5M FCFA' },
  { id: 'diff-008', canal: 'Email Outreach — Campagnes Ciblées', type: 'Push', frequence: '2 campagnes/mois', audience_estimee: 5200, taux_engagement: '18.2%', contenu_type: 'Séquences email personnalisées par segment', objectif_trimestriel: '6 campagnes, 30 RDV qualifiés', responsable: 'CRM / KOS Email Funnel', cout_mensuel: '1M FCFA' },
];

// ============================================================
// KPI INSTITUTIONNELS — MP9 Focus
// Invitations · Consultations · Partenariats
// ============================================================
export interface InstitutionalFocusKPIs {
  invitations: {
    total_an: number;
    conferences: number;
    panels: number;
    keynotes: number;
    taux_acceptation: number;
    cible_an: number;
    progression: string;
    dernier_evenement: string;
    prochain_evenement: string;
  };
  consultations: {
    total_an: number;
    consultations_directes: number;
    ao_remportes: number;
    ami_remportes: number;
    taux_conversion: number;
    cible_an: number;
    ca_genere: string;
    progression: string;
  };
  partenariats: {
    total_actifs: number;
    consortium: number;
    technique: number;
    academique: number;
    institutionnel: number;
    en_negociation: number;
    cible_an: number;
    progression: string;
    derniers_signes: string[];
  };
}

export const institutionalFocusKPIs: InstitutionalFocusKPIs = {
  invitations: {
    total_an: 18,
    conferences: 8,
    panels: 6,
    keynotes: 4,
    taux_acceptation: 85,
    cible_an: 36,
    progression: '+50% vs 2025',
    dernier_evenement: 'Panel Régulation Bancaire — ABCAO Dakar (Juin 2026)',
    prochain_evenement: 'Keynote Supervision Bancaire — Conférence ABCAO (Août 2026)',
  },
  consultations: {
    total_an: 112,
    consultations_directes: 68,
    ao_remportes: 28,
    ami_remportes: 16,
    taux_conversion: 42,
    cible_an: 150,
    ca_genere: '425M FCFA',
    progression: '+35% vs 2025',
  },
  partenariats: {
    total_actifs: 34,
    consortium: 6,
    technique: 12,
    academique: 8,
    institutionnel: 8,
    en_negociation: 5,
    cible_an: 45,
    progression: '+8 vs 2025',
    derniers_signes: ['Consortium BAD — Data Center Régional', 'Partenariat Académique — Université Cheikh Anta Diop', 'MoU Expertise France — Gouvernance Fiscale CEDEAO'],
  },
};