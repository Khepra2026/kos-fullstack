import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

// ═══════════════════════════════════════════════════════════════
// KOS Methodology Engine v1.0 — Big Four Methodologies
// Génère plans, templates et livrables normalisés
// ═══════════════════════════════════════════════════════════════

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

// ─── Types ─────────────────────────────────────────────────────
interface MethodologyStep {
  numero: number;
  titre: string;
  description: string;
  duree_jours: number;
  livrable_intermediaire: string;
  responsable: string;
  referentiels: string[];
  check_points: string[];
}

interface Methodology {
  id: string;
  nom: string;
  description: string;
  secteurs: string[];
  etapes: MethodologyStep[];
  livrable_final: string;
  referentiels: string[];
  sla: string;
  sla_vs_big4: string;
  prix_estime_fcfa: number;
  prix_vs_big4_fcfa: number;
  lang: Record<string, { nom: string; description: string }>;
}

interface GeneratedPlan {
  plan_id: string;
  methodology_id: string;
  client_context: ClientContext;
  etapes_adaptees: AdaptedStep[];
  livrables: Deliverable[];
  timeline: Timeline;
  kpi_suivi: Kpi[];
  created_at: string;
}

interface ClientContext {
  secteur: string;
  pays: string;
  type_entite: string;
  effectif: number;
  ca_annuel_fcfa: number;
  priorite: 'urgent' | 'standard' | 'planifie';
  contexte_special?: string;
}

interface AdaptedStep extends MethodologyStep {
  duree_reelle_jours: number;
  date_debut: string;
  date_fin: string;
  ressources_allouees: string[];
  risques_identifies: string[];
}

interface Deliverable {
  id: string;
  nom: string;
  type: string;
  template_ref: string;
  contenu_sections: string[];
  format: 'pdf' | 'pptx' | 'xlsx' | 'docx' | 'json';
  destinataires: string[];
}

interface Timeline {
  date_debut: string;
  date_fin: string;
  duree_totale_jours: number;
  jalons: Jalon[];
}

interface Jalon {
  nom: string;
  date: string;
  livrable_associe: string;
  validation_requise: boolean;
}

interface Kpi {
  id: string;
  nom: string;
  cible: number;
  unite: string;
  frequence_mesure: string;
  responsable_mesure: string;
}

// ─── Big Four Methodologies Database ───────────────────────────
const BIG4_METHODOLOGIES: Record<string, Methodology> = {
  'diagnostic_conformite': {
    id: 'diagnostic_conformite',
    nom: 'Diagnostic Conformite Reglementaire 360',
    description: 'Evaluation exhaustive de la conformite aux referentiels BCEAO, COBAC, OHADA, GAFI et ISO. Identification des ecarts, evaluation de maturite et plan de remediation priorise.',
    secteurs: ['banque', 'microfinance', 'assurance', 'fintech', 'sfd', 'emf', 'entreprise'],
    etapes: [
      {
        numero: 1,
        titre: 'Comprehension du contexte reglementaire',
        description: 'Analyse du perimetre reglementaire applicable : BCEAO, COBAC, OHADA, GAFI, directives locales. Cartographie des obligations legales et reglementaires.',
        duree_jours: 2,
        livrable_intermediaire: 'Matrice_obligations_reglementaires',
        responsable: 'Senior Compliance Auditor',
        referentiels: ['BCEAO', 'COBAC', 'OHADA', 'GAFI'],
        check_points: ['Perimetre valide', 'Interlocuteurs identifies', 'Documents collectes'],
      },
      {
        numero: 2,
        titre: 'Identification des enjeux strategiques',
        description: 'Entretiens direction, comprehension du modele economique, identification des risques metier prioritaires lies a la conformite.',
        duree_jours: 3,
        livrable_intermediaire: 'Cartographie_risques_metier',
        responsable: 'Managing Partner',
        referentiels: ['ISO 31000', 'COSO ERM'],
        check_points: ['Entretiens realises', 'Risques priorises', 'Matrice heatmap validee'],
      },
      {
        numero: 3,
        titre: 'Cartographie des risques ISO 31000',
        description: 'Evaluation quantitative et qualitative des risques de conformite. Scoring par criticite, probabilite et impact financier.',
        duree_jours: 4,
        livrable_intermediaire: 'Rapport_cartographie_risques',
        responsable: 'Risk Manager',
        referentiels: ['ISO 31000', 'ISO 37301'],
        check_points: ['Risques quantifies', 'Scoring valide', 'Comite risque briefe'],
      },
      {
        numero: 4,
        titre: 'Analyse de materialite ISSB/CSRD',
        description: 'Identification des sujets ESG materiels pour l entite. Alignement avec les standards IFRS S1/S2 et directive CSRD.',
        duree_jours: 3,
        livrable_intermediaire: 'Double_Materilite_ESG',
        responsable: 'ESG Advisor',
        referentiels: ['IFRS S1', 'IFRS S2', 'CSRD', 'GRI'],
        check_points: ['Stakeholders mappes', 'Impacts evalues', 'Materialite validee'],
      },
      {
        numero: 5,
        titre: 'Diagnostic ecart (Gap Analysis)',
        description: 'Evaluation point par point contre les referentiels. Documentation des conformites, ecarts majeurs et mineurs.',
        duree_jours: 5,
        livrable_intermediaire: 'Rapport_gap_analysis',
        responsable: 'Senior Compliance Auditor',
        referentiels: ['COSO 2013', 'ISO 37301', 'BCEAO', 'COBAC'],
        check_points: ['47 regles OHADA testees', '10 ratios BCEAO calcules', '7 regles GAFI evaluees'],
      },
      {
        numero: 6,
        titre: 'Evaluation de maturite CMMI',
        description: 'Scoring de maturite des processus de conformite sur 5 niveaux CMMI. Identification des quick wins et fondations a consolider.',
        duree_jours: 2,
        livrable_intermediaire: 'Score_maturite_CMMI',
        responsable: 'Quality Assurance',
        referentiels: ['CMMI v2.0', 'ISO 9001'],
        check_points: ['5 niveaux evalues', 'Score global calcule', 'Axes progression identifies'],
      },
      {
        numero: 7,
        titre: 'Benchmark 12 pays UEMOA-CEMAC',
        description: 'Comparaison transversale avec les pratiques des pairs dans 12 pays. Identification des best practices et ecarts geographiques.',
        duree_jours: 3,
        livrable_intermediaire: 'Benchmark_12_pays',
        responsable: 'Africa Intelligence Analyst',
        referentiels: ['Base KHEPRA 12 pays', 'donnees BCEAO/COBAC'],
        check_points: ['12 pays couverts', 'KPIs compares', 'Best practices identifiees'],
      },
      {
        numero: 8,
        titre: 'Recommandations COSO priorisees',
        description: 'Plan d action structure selon COSO : controle environnement, evaluation risque, activites controle, information, communication, surveillance.',
        duree_jours: 3,
        livrable_intermediaire: 'Plan_action_COSO',
        responsable: 'Managing Partner',
        referentiels: ['COSO 2013', 'COSO ERM', 'ISO 31000'],
        check_points: ['5 composantes COSO couvertes', 'Actions priorisees', 'Budget estime'],
      },
      {
        numero: 9,
        titre: 'Feuille de route 90j/6m/12m',
        description: 'Planning detaille avec phases courte (90j), moyenne (6m) et longue (12m). Jalons, ressources et indicateurs de suivi.',
        duree_jours: 2,
        livrable_intermediaire: 'Feuille_route_90j_6m_12m',
        responsable: 'PMO Governance',
        referentiels: ['PMI', 'Prince2'],
        check_points: ['3 horizons definis', 'Ressources allouees', 'KPIs de suivi fixes'],
      },
      {
        numero: 10,
        titre: 'KPI de suivi et gouvernance',
        description: 'Tableau de bord de conformite avec indicateurs cles, frequence de mesure, seuils d alerte et responsables.',
        duree_jours: 1,
        livrable_intermediaire: 'Tableau_bord_KPI',
        responsable: 'Executive Command Center',
        referentiels: ['OKR', 'KPI Dictionary KHEPRA'],
        check_points: ['KPIs definis', 'Seuils d alerte fixes', 'Gouvernance validee'],
      },
    ],
    livrable_final: 'Rapport_Diagnostic_Conformite_360',
    referentiels: ['COSO 2013', 'ISO 31000', 'ISO 37301', 'COBIT 2019', 'IFRS S1/S2', 'CMMI v2.0'],
    sla: '72h',
    sla_vs_big4: 'vs EY/Deloitte 2-3 semaines',
    prix_estime_fcfa: 2500000,
    prix_vs_big4_fcfa: 15000000,
    lang: {
      fr: { nom: 'Diagnostic Conformite 360', description: 'Evaluation exhaustive conformite reglementaire' },
      en: { nom: 'Compliance Diagnostic 360', description: 'Comprehensive regulatory compliance assessment' },
      pt: { nom: 'Diagnostico Conformidade 360', description: 'Avaliacao abrangente conformidade regulamentar' },
    },
  },

  'audit_interne': {
    id: 'audit_interne',
    nom: 'Audit Interne Big Four',
    description: 'Mission d audit interne conforme aux standards IIA, avec approche risk-based et couverture des 3 lignes de defense.',
    secteurs: ['banque', 'microfinance', 'assurance', 'sfd', 'emf'],
    etapes: [
      {
        numero: 1,
        titre: 'Planification et perimetre',
        description: 'Definition du perimetre d audit, analyse des risques, selection des processus critiques.',
        duree_jours: 3,
        livrable_intermediaire: 'Programme_audit',
        responsable: 'Chief Audit Executive',
        referentiels: ['IIA Standards', 'COSO'],
        check_points: ['Perimetre valide CAE', 'Risques audites', 'Planning approuve CODIR'],
      },
      {
        numero: 2,
        titre: 'Tests de controles',
        description: 'Evaluation de la conception et de l efficacite operationnelle des controles internes.',
        duree_jours: 5,
        livrable_intermediaire: 'Rapport_tests_controles',
        responsable: 'Senior Internal Auditor',
        referentiels: ['COSO', 'COBIT'],
        check_points: ['Controles testes', 'Echantillons valides', 'Resultats documentes'],
      },
      {
        numero: 3,
        titre: 'Analyse des ecarts',
        description: 'Identification des faiblesses de controle, evaluation de l impact et des causes racines.',
        duree_jours: 3,
        livrable_intermediaire: 'Analyse_ecarts',
        responsable: 'Internal Auditor',
        referentiels: ['IIA', 'ISO 19011'],
        check_points: ['Faiblesses identifiees', 'Causes racines', 'Impact quantifie'],
      },
      {
        numero: 4,
        titre: 'Recommandations et plan d action',
        description: 'Recommandations priorisees avec echeancier, responsable et indicateurs de suivi.',
        duree_jours: 2,
        livrable_intermediaire: 'Plan_action_remediation',
        responsable: 'CAE',
        referentiels: ['COSO', 'ISO 31000'],
        check_points: ['Recommandations priorisees', 'Plan action valide', 'Suivi formalise'],
      },
      {
        numero: 5,
        titre: 'Rapport d audit et suivi',
        description: 'Redaction du rapport final, presentation au conseil et mise en place du comite de suivi.',
        duree_jours: 3,
        livrable_intermediaire: 'Rapport_audit_final',
        responsable: 'CAE',
        referentiels: ['IIA', 'COSO'],
        check_points: ['Rapport valide', 'Conseil briefe', 'Suivi programme'],
      },
    ],
    livrable_final: 'Rapport_Audit_Interne_Certifie',
    referentiels: ['IIA Standards', 'COSO 2013', 'COBIT 2019', 'ISO 19011'],
    sla: '5j',
    sla_vs_big4: 'vs Big4 3-4 semaines',
    prix_estime_fcfa: 1800000,
    prix_vs_big4_fcfa: 12000000,
    lang: {
      fr: { nom: 'Audit Interne Big Four', description: 'Mission audit interne risk-based' },
      en: { nom: 'Big Four Internal Audit', description: 'Risk-based internal audit mission' },
      pt: { nom: 'Auditoria Interna Big Four', description: 'Missao auditoria interna risk-based' },
    },
  },

  'inspection_bceao': {
    id: 'inspection_bceao',
    nom: 'Pre-Inspection BCEAO',
    description: 'Preparation complete a l inspection BCEAO : auto-evaluation, documentation, simulations et coaching direction.',
    secteurs: ['banque', 'microfinance', 'sfd', 'emf'],
    etapes: [
      {
        numero: 1,
        titre: 'Auto-evaluation pre-inspection',
        description: 'Evaluation interne sur 150 points de controle BCEAO. Identification des zones rouges.',
        duree_jours: 3,
        livrable_intermediaire: 'Auto_evaluation_150_points',
        responsable: 'Senior Compliance Auditor',
        referentiels: ['BCEAO', 'Instructions 001-030'],
        check_points: ['150 points testes', 'Zones rouges identifiees', 'Document de travail complet'],
      },
      {
        numero: 2,
        titre: 'Constitution du dossier d inspection',
        description: 'Preparation de l ensemble des documents requis : ratios, comptes, procedures, organigrammes.',
        duree_jours: 4,
        livrable_intermediaire: 'Dossier_inspection_complet',
        responsable: 'CFO',
        referentiels: ['BCEAO', 'SYSCOHADA'],
        check_points: ['Documents collectes', 'Ratios calcules', 'Dossier indexe'],
      },
      {
        numero: 3,
        titre: 'Simulation d inspection',
        description: 'Inspection simulee avec scenarios BCEAO reels. Entretiens direction et tests sur site.',
        duree_jours: 2,
        livrable_intermediaire: 'Rapport_simulation',
        responsable: 'Managing Partner',
        referentiels: ['BCEAO', 'Circulaires'],
        check_points: ['Simulation realisee', 'Points faibles identifies', 'Plan correctif defini'],
      },
      {
        numero: 4,
        titre: 'Coaching direction et comite',
        description: 'Preparation des dirigeants aux entretiens BCEAO. Mise en situation et Q&A.',
        duree_jours: 1,
        livrable_intermediaire: 'Guide_entretiens_BCEAO',
        responsable: 'CEO Advisor',
        referentiels: ['BCEAO', 'Gouvernance'],
        check_points: ['Dirigeants prepares', 'FAQ BCEAO', 'Simulation conduite'],
      },
    ],
    livrable_final: 'Rapport_Pre_Inspection_BCEAO',
    referentiels: ['BCEAO', 'SYSCOHADA', 'COSO', 'ISO 31000'],
    sla: '5j',
    sla_vs_big4: 'vs Big4 2-3 semaines',
    prix_estime_fcfa: 2000000,
    prix_vs_big4_fcfa: 10000000,
    lang: {
      fr: { nom: 'Pre-Inspection BCEAO', description: 'Preparation complete inspection BCEAO' },
      en: { nom: 'BCEAO Pre-Inspection', description: 'Full BCEAO inspection preparation' },
      pt: { nom: 'Pre-Inspecao BCEAO', description: 'Preparacao completa inspecao BCEAO' },
    },
  },

  'conformite_lbcft': {
    id: 'conformite_lbcft',
    nom: 'Conformite LBC/FT GAFI',
    description: 'Audit complet Lutte contre le Blanchiment et le Financement du Terrorisme conforme aux 40 recommandations GAFI.',
    secteurs: ['banque', 'microfinance', 'assurance', 'fintech', 'sfd'],
    etapes: [
      {
        numero: 1,
        titre: 'Evaluation du dispositif LBC/FT',
        description: 'Analyse des politiques, procedures et outils de detection. Cartographie des roles et responsabilites.',
        duree_jours: 3,
        livrable_intermediaire: 'Cartographie_dispositif_LBCFT',
        responsable: 'LBC/FT Officer',
        referentiels: ['GAFI R.40', 'COBAC', 'BCEAO'],
        check_points: ['Politiques auditees', 'Procedures testees', 'Roles valides'],
      },
      {
        numero: 2,
        titre: 'Tests de KYC et due diligence',
        description: 'Verification des dossiers clients, identification des PEP, evaluation des risques clients.',
        duree_jours: 4,
        livrable_intermediaire: 'Rapport_KYC_DD',
        responsable: 'Senior Auditor',
        referentiels: ['GAFI R.10', 'GAFI R.12'],
        check_points: ['KYC teste', 'PEP identifies', 'Scoring risque valide'],
      },
      {
        numero: 3,
        titre: 'Surveillance des transactions',
        description: 'Analyse des alertes transactions suspectes, parametrage des seuils, traitement des STR.',
        duree_jours: 3,
        livrable_intermediaire: 'Rapport_surveillance_transactions',
        responsable: 'Risk Analyst',
        referentiels: ['GAFI R.20', 'GAFI R.23'],
        check_points: ['Alertes analysees', 'Seuils valides', 'STR traites'],
      },
      {
        numero: 4,
        titre: 'Formation et sensibilisation',
        description: 'Evaluation du programme de formation LBC/FT. Tests de connaissance du personnel.',
        duree_jours: 2,
        livrable_intermediaire: 'Plan_formation_LBCFT',
        responsable: 'HR Manager',
        referentiels: ['GAFI R.18'],
        check_points: ['Formation auditee', 'Tests realises', 'Plan defini'],
      },
      {
        numero: 5,
        titre: 'Plan de remediation',
        description: 'Actions correctives priorisees avec echeancier et responsables.',
        duree_jours: 2,
        livrable_intermediaire: 'Plan_remediation_LBCFT',
        responsable: 'Managing Partner',
        referentiels: ['GAFI', 'ISO 37301'],
        check_points: ['Actions priorisees', 'Budget estime', 'Suivi formalise'],
      },
    ],
    livrable_final: 'Rapport_Audit_LBCFT_GAFI',
    referentiels: ['GAFI 40 Recommandations', 'COBAC', 'BCEAO', 'ISO 37301'],
    sla: '5j',
    sla_vs_big4: 'vs Big4 2-3 semaines',
    prix_estime_fcfa: 2200000,
    prix_vs_big4_fcfa: 14000000,
    lang: {
      fr: { nom: 'Conformite LBC/FT GAFI', description: 'Audit complet Lutte Blanchiment Terrorisme' },
      en: { nom: 'AML/CFT GAFI Compliance', description: 'Full AML/CFT audit per GAFI 40' },
      pt: { nom: 'Conformidade LBC/FT GAFI', description: 'Auditoria completa LBC/FT GAFI' },
    },
  },

  'agrement_sfd': {
    id: 'agrement_sfd',
    nom: 'Accompagnement Agrement SFD',
    description: 'Accompagnement complet pour l obtention de l agrement SFD : diagnostic, constitution du dossier, negociation regulateur.',
    secteurs: ['microfinance', 'sfd', 'emf'],
    etapes: [
      {
        numero: 1,
        titre: 'Diagnostic pre-agrement',
        description: 'Evaluation de la maturite de l entite sur les criteres BCEAO : gouvernance, capital, systeme d information, procedures.',
        duree_jours: 5,
        livrable_intermediaire: 'Diagnostic_pre_agrement',
        responsable: 'Senior Compliance Auditor',
        referentiels: ['BCEAO Instructions 001-030', 'COBAC'],
        check_points: ['Criteres BCEAO evalues', 'Ecarts identifies', 'Plan de preparation defini'],
      },
      {
        numero: 2,
        titre: 'Constitution du dossier reglementaire',
        description: 'Preparation de l ensemble des documents : statuts, business plan, organigramme, procedures, SI.',
        duree_jours: 7,
        livrable_intermediaire: 'Dossier_reglementaire_complet',
        responsable: 'PMO Governance',
        referentiels: ['BCEAO', 'SYSCOHADA', 'OHADA'],
        check_points: ['Statuts conformes', 'Business plan valide', 'SI documente'],
      },
      {
        numero: 3,
        titre: 'Business plan et projections',
        description: 'Elaboration du business plan 3 ans avec projections financieres, plan de financement et analyse de rentabilite.',
        duree_jours: 5,
        livrable_intermediaire: 'Business_plan_3_ans',
        responsable: 'Financial Analyst',
        referentiels: ['BCEAO', 'SYSCOHADA'],
        check_points: ['Projections 3 ans', 'Plan financement', 'Rentabilite validee'],
      },
      {
        numero: 4,
        titre: 'Simulation entretien regulateur',
        description: 'Preparation aux entretiens BCEAO/COBAC. Simulation avec scenarios probables.',
        duree_jours: 2,
        livrable_intermediaire: 'Guide_entretien_regulateur',
        responsable: 'Managing Partner',
        referentiels: ['BCEAO', 'COBAC'],
        check_points: ['Scenarios testes', 'Dirigeants prepares', 'Reponses validees'],
      },
      {
        numero: 5,
        titre: 'Suivi post-depot',
        description: 'Accompagnement apres depot du dossier : reponses aux observations, modifications, negociation.',
        duree_jours: 10,
        livrable_intermediaire: 'Suivi_post_depot',
        responsable: 'Client Success Manager',
        referentiels: ['BCEAO', 'COBAC'],
        check_points: ['Observations traitees', 'Modifications realisees', 'Agrement obtenu'],
      },
    ],
    livrable_final: 'Dossier_Agrement_SFD_Complet',
    referentiels: ['BCEAO Instructions', 'COBAC', 'SYSCOHADA', 'OHADA', 'COSO'],
    sla: '10j',
    sla_vs_big4: 'vs Big4 4-6 semaines',
    prix_estime_fcfa: 3500000,
    prix_vs_big4_fcfa: 20000000,
    lang: {
      fr: { nom: 'Accompagnement Agrement SFD', description: 'Accompagnement complet obtention agrement SFD' },
      en: { nom: 'SFD Licensing Support', description: 'Full SFD licensing application support' },
      pt: { nom: 'Acompanhamento Licenciamento SFD', description: 'Acompanhamento completo licenciamento SFD' },
    },
  },

  'transformation_digitale': {
    id: 'transformation_digitale',
    nom: 'Transformation Digitale Conforme',
    description: 'Audit et accompagnement de la transformation digitale avec alignment reglementaire BCEAO, protection donnees, cyber-resilience.',
    secteurs: ['banque', 'microfinance', 'assurance', 'fintech', 'entreprise'],
    etapes: [
      {
        numero: 1,
        titre: 'Diagnostic maturite digitale',
        description: 'Evaluation de la maturite digitale sur 5 axes : strategie, organisation, technologie, donnees, culture.',
        duree_jours: 3,
        livrable_intermediaire: 'Score_maturite_digitale',
        responsable: 'CDO Innovation',
        referentiels: ['MIT CISR', 'McKinsey 7S'],
        check_points: ['5 axes evalues', 'Score calcule', 'Axes prioritaires identifies'],
      },
      {
        numero: 2,
        titre: 'Audit cybersecurite et resilience',
        description: 'Evaluation de la posture cybersecurite selon NIST CSF, ISO 27001, directive COBAC cyber.',
        duree_jours: 4,
        livrable_intermediaire: 'Rapport_cybersecurite',
        responsable: 'CISO',
        referentiels: ['NIST CSF', 'ISO 27001', 'COBAC Cyber'],
        check_points: ['5 fonctions NIST testees', 'Vulnerabilites identifiees', 'Plan durci defini'],
      },
      {
        numero: 3,
        titre: 'Conformite RGPD/Protection donnees',
        description: 'Audit de conformite aux reglementations protection donnees : RGPD, lois locales, chartes BCEAO.',
        duree_jours: 3,
        livrable_intermediaire: 'Rapport_conformite_donnees',
        responsable: 'DPO',
        referentiels: ['RGPD', 'Loi locale', 'BCEAO'],
        check_points: ['Traitements inventories', 'Consentements audites', 'DPO nomme'],
      },
      {
        numero: 4,
        titre: 'Roadmap transformation 18 mois',
        description: 'Plan de transformation structure en quick wins (3m), fondations (6m), acceleration (12m), maturite (18m).',
        duree_jours: 3,
        livrable_intermediaire: 'Roadmap_transformation_18m',
        responsable: 'CDO Engineering',
        referentiels: ['Agile', 'SAFe', 'ITIL'],
        check_points: ['4 phases definies', 'Budget estime', 'KPIs fixes'],
      },
      {
        numero: 5,
        titre: 'Gouvernance du changement',
        description: 'Mise en place de la gouvernance du changement : comite de pilotage, change management, formation.',
        duree_jours: 2,
        livrable_intermediaire: 'Plan_changement',
        responsable: 'Chief Agentic Architect',
        referentiels: ['ADKAR', 'Kotter 8 Steps'],
        check_points: ['Comite cree', 'Plan communication', 'Formation programmee'],
      },
    ],
    livrable_final: 'Rapport_Transformation_Digitale_Conforme',
    referentiels: ['NIST CSF', 'ISO 27001', 'ISO 27701', 'RGPD', 'COBIT 2019', 'ITIL 4'],
    sla: '7j',
    sla_vs_big4: 'vs Big4 3-4 semaines',
    prix_estime_fcfa: 2800000,
    prix_vs_big4_fcfa: 18000000,
    lang: {
      fr: { nom: 'Transformation Digitale Conforme', description: 'Audit et accompagnement transformation digitale reglementaire' },
      en: { nom: 'Compliant Digital Transformation', description: 'Regulatory-aligned digital transformation audit and support' },
      pt: { nom: 'Transformacao Digital Conforme', description: 'Auditoria e acompanhamento transformacao digital regulamentar' },
    },
  },

  'prix_transfert': {
    id: 'prix_transfert',
    nom: 'Conformite Prix de Transfert BEPS',
    description: 'Audit et documentation des prix de transfert conforme aux recommandations BEPS de l OCDE et legislation locale.',
    secteurs: ['banque', 'assurance', 'entreprise', 'groupe'],
    etapes: [
      {
        numero: 1,
        titre: 'Diagnostic prix de transfert',
        description: 'Identification des transactions intra-groupe, analyse des politiques existantes, cartographie des risques fiscaux.',
        duree_jours: 3,
        livrable_intermediaire: 'Diagnostic_prix_transfert',
        responsable: 'Tax Advisor',
        referentiels: ['OCDE BEPS', 'Loi locale'],
        check_points: ['Transactions mappees', 'Politiques auditees', 'Risques identifies'],
      },
      {
        numero: 2,
        titre: 'Analyse comparables',
        description: 'Recherche et analyse de comparables pour valider la politique de prix de transfert.',
        duree_jours: 5,
        livrable_intermediaire: 'Etude_comparables',
        responsable: 'Transfer Pricing Analyst',
        referentiels: ['OCDE Guidelines', 'Base KHEPRA'],
        check_points: ['Comparables identifies', 'Methode validee', 'Fourchette calculee'],
      },
      {
        numero: 3,
        titre: 'Documentation master file / local file',
        description: 'Redaction des documentations BEPS Action 13 : master file, local file, notifications pays par pays.',
        duree_jours: 7,
        livrable_intermediaire: 'Documentation_BEPS_Action13',
        responsable: 'Tax Partner',
        referentiels: ['BEPS Action 13', 'OCDE'],
        check_points: ['Master file redige', 'Local file complet', 'Notifications pretes'],
      },
      {
        numero: 4,
        titre: 'Defense fiscale et contentieux',
        description: 'Preparation des arguments de defense, accompagnement en cas de controle fiscal ou contentieux.',
        duree_jours: 3,
        livrable_intermediaire: 'Dossier_defense_fiscale',
        responsable: 'Tax Litigator',
        referentiels: ['Droit fiscal', 'OCDE'],
        check_points: ['Arguments prepares', 'Dossier complet', 'Strategie validee'],
      },
    ],
    livrable_final: 'Dossier_Prix_Transfert_BEPS_Complet',
    referentiels: ['OCDE BEPS Actions 8-13', 'Loi fiscale locale', 'OECD Transfer Pricing Guidelines'],
    sla: '10j',
    sla_vs_big4: 'vs Big4 4-6 semaines',
    prix_estime_fcfa: 3200000,
    prix_vs_big4_fcfa: 22000000,
    lang: {
      fr: { nom: 'Conformite Prix de Transfert BEPS', description: 'Audit et documentation prix de transfert OCDE' },
      en: { nom: 'Transfer Pricing BEPS Compliance', description: 'OECD transfer pricing audit and documentation' },
      pt: { nom: 'Conformidade Precos de Transferencia BEPS', description: 'Auditoria e documentacao precos de transferencia OCDE' },
    },
  },
};

// ─── Helper Functions ──────────────────────────────────────────

function generatePlanId(): string {
  return `PLAN-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function calculateAdaptedDuration(baseDays: number, context: ClientContext): number {
  let multiplier = 1;
  if (context.priorite === 'urgent') multiplier = 0.6;
  else if (context.priorite === 'planifie') multiplier = 1.3;

  if (context.effectif > 500) multiplier *= 1.2;
  else if (context.effectif < 50) multiplier *= 0.8;

  return Math.round(baseDays * multiplier);
}

function generateAdaptedPlan(methodology: Methodology, context: ClientContext): GeneratedPlan {
  const planId = generatePlanId();
  const startDate = new Date();
  let currentDate = new Date(startDate);

  const etapesAdaptees: AdaptedStep[] = methodology.etapes.map((etape) => {
    const dureeReelle = calculateAdaptedDuration(etape.duree_jours, context);
    const dateDebut = new Date(currentDate);
    const dateFin = addDays(currentDate, dureeReelle);
    currentDate = addDays(dateFin, 1);

    return {
      ...etape,
      duree_reelle_jours: dureeReelle,
      date_debut: formatDate(dateDebut),
      date_fin: formatDate(dateFin),
      ressources_allouees: [etape.responsable, 'Analyste junior', 'Data Engineer'],
      risques_identifies: [
        `Retard documentation ${context.pays}`,
        `Disponibilite interlocuteurs ${context.type_entite}`,
        `Complexite reglementaire ${context.secteur}`,
      ],
    };
  });

  const totalDays = etapesAdaptees.reduce((sum, e) => sum + e.duree_reelle_jours, 0);
  const endDate = addDays(startDate, totalDays);

  const livrables: Deliverable[] = [
    {
      id: `DEL-${planId}-001`,
      nom: `${methodology.livrable_final}`,
      type: 'Rapport final',
      template_ref: `template_${methodology.id}`,
      contenu_sections: [
        'Executive Summary',
        'Contexte et methodologie',
        'Resultats detailles',
        'Recommandations priorisees',
        'Plan d action',
        'Annexes techniques',
      ],
      format: 'pdf',
      destinataires: ['Conseil d administration', 'Direction generale', 'Regulateur'],
    },
    {
      id: `DEL-${planId}-002`,
      nom: 'Synthese executive PowerPoint',
      type: 'Presentation',
      template_ref: 'template_executive_pptx',
      contenu_sections: ['Slides 10-15', 'Graphiques cles', 'Messages direction'],
      format: 'pptx',
      destinataires: ['Conseil', 'Comite executif'],
    },
    {
      id: `DEL-${planId}-003`,
      nom: 'Tableau de bord suivi',
      type: 'Dashboard',
      template_ref: 'template_dashboard_xlsx',
      contenu_sections: ['KPIs', 'Timeline', 'Budget'],
      format: 'xlsx',
      destinataires: ['PMO', 'Pilotage projet'],
    },
  ];

  const kpiSuivi: Kpi[] = [
    {
      id: `KPI-${planId}-001`,
      nom: 'Taux de conformite global',
      cible: 95,
      unite: '%',
      frequence_mesure: 'Mensuelle',
      responsable_mesure: 'RCC',
    },
    {
      id: `KPI-${planId}-002`,
      nom: 'Ecarts critiques resolus',
      cible: 100,
      unite: '%',
      frequence_mesure: 'Trimestrielle',
      responsable_mesure: 'Senior Auditor',
    },
    {
      id: `KPI-${planId}-003`,
      nom: 'Avancement plan d action',
      cible: 100,
      unite: '%',
      frequence_mesure: 'Mensuelle',
      responsable_mesure: 'PMO Governance',
    },
  ];

  return {
    plan_id: planId,
    methodology_id: methodology.id,
    client_context: context,
    etapes_adaptees: etapesAdaptees,
    livrables,
    timeline: {
      date_debut: formatDate(startDate),
      date_fin: formatDate(endDate),
      duree_totale_jours: totalDays,
      jalons: etapesAdaptees.map((e, i) => ({
        nom: `Jalon ${i + 1}: ${e.titre}`,
        date: e.date_fin,
        livrable_associe: e.livrable_intermediaire,
        validation_requise: i === methodology.etapes.length - 1,
      })),
    },
    kpi_suivi: kpiSuivi,
    created_at: new Date().toISOString(),
  };
}

// ─── Supabase Integration ──────────────────────────────────────

async function persistPlan(supabase: any, plan: GeneratedPlan): Promise<boolean> {
  try {
    const { error } = await supabase.from('kos_methodology_plans').insert({
      plan_id: plan.plan_id,
      methodology_id: plan.methodology_id,
      client_context: plan.client_context,
      etapes_adaptees: plan.etapes_adaptees,
      livrables: plan.livrables,
      timeline: plan.timeline,
      kpi_suivi: plan.kpi_suivi,
      created_at: plan.created_at,
    });
    if (error) {
      console.error('[KOS Methodology] Persist error:', error.message);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// ─── Main Handler ─────────────────────────────────────────────

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const url = new URL(req.url);
  const path = url.pathname;

  const supabaseUrl = Deno.env.get('SUPABASE_URL') || Deno.env.get('VITE_PUBLIC_SUPABASE_URL') || '';
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || '';
  const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

  const startTime = Date.now();

  try {
    if (req.method === 'GET' && path.includes('/methodologies')) {
      const secteur = url.searchParams.get('secteur');
      const lang = url.searchParams.get('lang') || 'fr';

      let methodologies = Object.values(BIG4_METHODOLOGIES);
      if (secteur) {
        methodologies = methodologies.filter((m) => m.secteurs.includes(secteur));
      }

      const results = methodologies.map((m) => ({
        id: m.id,
        nom: m.lang[lang]?.nom || m.nom,
        description: m.lang[lang]?.description || m.description,
        secteurs: m.secteurs,
        nombre_etapes: m.etapes.length,
        duree_estimee_jours: m.etapes.reduce((s, e) => s + e.duree_jours, 0),
        livrable_final: m.livrable_final,
        referentiels: m.referentiels,
        sla: m.sla,
        sla_vs_big4: m.sla_vs_big4,
        prix_estime_fcfa: m.prix_estime_fcfa,
        prix_vs_big4_fcfa: m.prix_vs_big4_fcfa,
        ratio_rapport_qualite_prix: Math.round((m.prix_vs_big4_fcfa / m.prix_estime_fcfa) * 10) / 10,
      }));

      return new Response(
        JSON.stringify({
          status: 'OK',
          code: 'METHODOLOGIES_LIST_OK',
          meta: {
            message: `${results.length} methodologies disponibles`,
            detail: { lang, secteur_filter: secteur || null, execution_ms: Date.now() - startTime },
          },
          data: { methodologies: results, total: results.length },
        }),
        { headers: corsHeaders }
      );
    }

    if (req.method === 'GET' && path.match(/\/methodology\/([^/]+)/)) {
      const match = path.match(/\/methodology\/([^/]+)/);
      const methodologyId = match ? match[1] : '';
      const lang = url.searchParams.get('lang') || 'fr';

      const methodology = BIG4_METHODOLOGIES[methodologyId];
      if (!methodology) {
        return new Response(
          JSON.stringify({
            status: 'ERROR',
            code: 'METHODOLOGY_NOT_FOUND',
            meta: { message: `Methodologie '${methodologyId}' introuvable` },
          }),
          { status: 404, headers: corsHeaders }
        );
      }

      return new Response(
        JSON.stringify({
          status: 'OK',
          code: 'METHODOLOGY_DETAIL_OK',
          meta: {
            message: `Methodologie ${methodologyId} chargee`,
            detail: { execution_ms: Date.now() - startTime },
          },
          data: {
            id: methodology.id,
            nom: methodology.lang[lang]?.nom || methodology.nom,
            description: methodology.lang[lang]?.description || methodology.description,
            secteurs: methodology.secteurs,
            etapes: methodology.etapes.map((e) => ({
              numero: e.numero,
              titre: e.titre,
              description: e.description,
              duree_jours: e.duree_jours,
              livrable_intermediaire: e.livrable_intermediaire,
              responsable: e.responsable,
              referentiels: e.referentiels,
              check_points: e.check_points,
            })),
            livrable_final: methodology.livrable_final,
            referentiels: methodology.referentiels,
            sla: methodology.sla,
            sla_vs_big4: methodology.sla_vs_big4,
            prix_estime_fcfa: methodology.prix_estime_fcfa,
            prix_vs_big4_fcfa: methodology.prix_vs_big4_fcfa,
            economies_estimees_fcfa: methodology.prix_vs_big4_fcfa - methodology.prix_estime_fcfa,
            ratio_rapport_qualite_prix: Math.round((methodology.prix_vs_big4_fcfa / methodology.prix_estime_fcfa) * 10) / 10,
          },
        }),
        { headers: corsHeaders }
      );
    }

    if (req.method === 'POST' && path.includes('/generate-plan')) {
      const body = await req.json();
      const {
        methodology_id,
        secteur = 'banque',
        pays = 'CIV',
        type_entite = 'sfd',
        effectif = 150,
        ca_annuel_fcfa = 2000000000,
        priorite = 'standard',
        contexte_special,
        persist = true,
      } = body;

      if (!methodology_id || !BIG4_METHODOLOGIES[methodology_id]) {
        return new Response(
          JSON.stringify({
            status: 'ERROR',
            code: 'INVALID_METHODOLOGY',
            meta: { message: 'methodology_id requis et valide' },
          }),
          { status: 400, headers: corsHeaders }
        );
      }

      const context: ClientContext = {
        secteur,
        pays,
        type_entite,
        effectif,
        ca_annuel_fcfa,
        priorite,
        contexte_special,
      };

      const methodology = BIG4_METHODOLOGIES[methodology_id];
      const plan = generateAdaptedPlan(methodology, context);

      if (persist) {
        await persistPlan(supabase, plan);
      }

      return new Response(
        JSON.stringify({
          status: 'OK',
          code: 'PLAN_GENERATED_OK',
          meta: {
            message: `Plan ${plan.plan_id} genere pour ${methodology_id}`,
            detail: {
              methodology: methodology_id,
              execution_ms: Date.now() - startTime,
              duree_totale_jours: plan.timeline.duree_totale_jours,
              nombre_livrables: plan.livrables.length,
              nombre_kpi: plan.kpi_suivi.length,
              persisted: persist,
            },
          },
          data: plan,
        }),
        { headers: corsHeaders }
      );
    }

    if (req.method === 'POST' && path.includes('/templates')) {
      const body = await req.json();
      const { template_type, methodology_id, lang = 'fr' } = body;

      const templates: Record<string, any> = {
        rapport_diagnostic: {
          sections: [
            { titre: 'Executive Summary', pages: 2, contenu: 'Synthese des resultats, score global, recommandations priorisees' },
            { titre: 'Contexte reglementaire', pages: 3, contenu: 'Perimetre BCEAO/COBAC/OHADA/GAFI applicable' },
            { titre: 'Methodologie', pages: 2, contenu: 'Approche COSO/ISO 31000, scoring, benchmark' },
            { titre: 'Resultats detailles', pages: 10, contenu: 'Ecarts identifies, violations, scoring par domaine' },
            { titre: 'Recommandations', pages: 5, contenu: 'Actions priorisees, budget, echeancier' },
            { titre: 'Plan d action', pages: 3, contenu: '90j/6m/12m, responsables, KPIs' },
            { titre: 'Annexes', pages: 5, contenu: 'Matrices detaillees, sources reglementaires' },
          ],
          format: 'pdf',
          pages_total: 30,
        },
        executive_summary: {
          sections: [
            { titre: 'Contexte', slides: 2 },
            { titre: 'Constats majeurs', slides: 3 },
            { titre: 'Recommandations', slides: 3 },
            { titre: 'Prochaines etapes', slides: 2 },
          ],
          format: 'pptx',
          slides_total: 10,
        },
        tableau_bord: {
          onglets: ['Vue d ensemble', 'KPIs conformite', 'Timeline', 'Budget', 'Risques'],
          format: 'xlsx',
        },
      };

      const template = templates[template_type] || {
        error: 'Template non trouve',
        disponibles: Object.keys(templates),
      };

      return new Response(
        JSON.stringify({
          status: 'OK',
          code: 'TEMPLATE_OK',
          meta: {
            message: `Template ${template_type} genere`,
            detail: { execution_ms: Date.now() - startTime },
          },
          data: {
            template_type,
            methodology_id: methodology_id || null,
            lang,
            template,
          },
        }),
        { headers: corsHeaders }
      );
    }

    if (path === '/health' || path === '/') {
      return new Response(
        JSON.stringify({
          status: 'OK',
          code: 'HEALTH_OK',
          meta: {
            message: 'KOS Methodology Engine v1.0 operationnel',
            detail: {
              version: '1.0.0',
              methodologies_count: Object.keys(BIG4_METHODOLOGIES).length,
              uptime_ms: Date.now() - startTime,
              referentiels: ['COSO 2013', 'ISO 31000', 'ISO 37301', 'COBIT 2019', 'CMMI v2.0', 'GAFI 40', 'BCEAO', 'COBAC', 'OHADA'],
            },
          },
          data: {
            methodologies: Object.keys(BIG4_METHODOLOGIES),
            endpoints: [
              'GET /methodologies?secteur=&lang=',
              'GET /methodology/:id?lang=',
              'POST /generate-plan',
              'POST /templates',
              'GET /health',
            ],
          },
        }),
        { headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({
        status: 'ERROR',
        code: 'NOT_FOUND',
        meta: { message: `Endpoint ${path} non trouve` },
        data: {
          endpoints: [
            'GET /methodologies?secteur=&lang=',
            'GET /methodology/:id?lang=',
            'POST /generate-plan',
            'POST /templates',
            'GET /health',
          ],
        },
      }),
      { status: 404, headers: corsHeaders }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[KOS Methodology Engine] Error:', msg);
    return new Response(
      JSON.stringify({
        status: 'ERROR',
        code: 'INTERNAL_ERROR',
        meta: { message: msg, detail: { execution_ms: Date.now() - startTime } },
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});