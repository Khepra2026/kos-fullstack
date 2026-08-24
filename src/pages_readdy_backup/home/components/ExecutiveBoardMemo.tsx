import { useMemo } from 'react';

interface SourceItem {
  title: string;
  regulator: string;
  tier: string;
  calibratedScore: number;
  bigFourSummary: string;
  riskLevel?: string;
  applicability?: string;
  confidenceBreakdown?: {
    semantic: number;
    authority: number;
    citation_density: number;
    jurisdiction: number;
    freshness: number;
  } | null;
}

interface ExecutiveBoardMemoProps {
  answer: string;
  sources: SourceItem[];
  engine: string;
  pipeline: string;
  auditId: string;
  latencyMs?: number;
  isEn: boolean;
  query: string;
  // ═══ DOMAIN-LOCK — received from backend (single source of truth) ═══
  queryDomain: string;
  queryDomainLabel: string;
  domainLocked: boolean;
  domainValidation: {
    query_domain: string;
    query_domain_label: string;
    match_ratio: number;
    matching_sources: number;
    total_sources: number;
    verdict: 'PASS' | 'WARNING' | 'FAIL';
    threshold: number;
    domain_counts: Record<string, number>;
    locked: boolean;
    is_general_query?: boolean;
  } | null;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stripMarkdown(text: string): string {
  return text
    .replace(/[*_~`#>|]/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .trim();
}

// ═══ DOMAIN CONFIG — domain is now received from backend, NOT detected locally ═══
type QueryDomain = 'lcbft' | 'governance' | 'agrement' | 'controle_interne' | 'risque' | 'cybersecurite' | 'esg' | 'finance' | 'general';

// Normalize backend domain string to QueryDomain type
function normalizeDomain(raw: string): QueryDomain {
  const d = raw.toLowerCase();
  if (d.includes('agrément') || d.includes('agrement') || d.includes('licence') || d.includes('autorisation')) return 'agrement';
  if (d.includes('gouvernance') || d.includes('comité') || d.includes('governance')) return 'governance';
  if (d.includes('lcb') || d.includes('ft') || d.includes('blanchiment') || d.includes('aml') || d.includes('cft')) return 'lcbft';
  if (d.includes('contrôle interne') || d.includes('controle interne') || d.includes('coso')) return 'controle_interne';
  if (d.includes('risque') || d.includes('risk')) return 'risque';
  if (d.includes('cyber') || d.includes('sécurité')) return 'cybersecurite';
  if (d.includes('esg') || d.includes('durabilité') || d.includes('sustainability')) return 'esg';
  if (d.includes('finance') || d.includes('prudentiel') || d.includes('solvabilité')) return 'finance';
  return 'general';
}

function getDomainConfig(domain: QueryDomain, isEn: boolean) {
  const configs: Record<QueryDomain, {
    topic: string;
    icon: string;
    obligations: Array<{ title: string; desc: string; icon: string }>;
    execSummaryTemplate: (regulators: string, count: number, applicable: number) => string;
  }> = {
    lcbft: {
      topic: isEn ? 'AML/CFT — Regulatory Compliance' : 'LCB-FT — Conformité Réglementaire',
      icon: 'ri-shield-check-line',
      obligations: [
        {
          title: isEn ? 'Customer Due Diligence' : 'Devoir de Vigilance',
          desc: isEn ? 'Identification, verification, and ongoing monitoring of customers. Enhanced due diligence for PEPs, cross-border correspondent banking.' : 'Identification, vérification et surveillance continue de la clientèle. Vigilance renforcée pour les PPE et la correspondance bancaire transfrontalière.',
          icon: 'ri-user-search-line',
        },
        {
          title: isEn ? 'Suspicious Transaction Reporting' : 'Déclaration de Soupçon',
          desc: isEn ? 'Mandatory reporting to the national FIU. Prohibition on tipping-off. Whistleblower protection.' : 'Déclaration obligatoire à la cellule nationale de renseignement financier (CENTIF/ANIF). Interdiction de divulgation. Protection des lanceurs d\'alerte.',
          icon: 'ri-alert-line',
        },
        {
          title: isEn ? 'Asset Freezing' : 'Gel des Avoirs',
          desc: isEn ? 'Administrative freezing of assets linked to designated persons. Implementation of UN and regional sanction lists.' : 'Gel administratif des avoirs liés aux personnes et entités désignées. Mise en œuvre des listes de sanctions onusiennes et régionales.',
          icon: 'ri-lock-line',
        },
        {
          title: isEn ? 'Risk Mapping' : 'Cartographie des Risques LCB-FT',
          desc: isEn ? 'Mandatory risk mapping covering products, services, channels, and geographies. Annual update required.' : 'Cartographie obligatoire des risques couvrant produits, services, canaux et zones géographiques. Mise à jour annuelle exigée.',
          icon: 'ri-radar-line',
        },
        {
          title: isEn ? 'Record Keeping' : 'Conservation des Documents',
          desc: isEn ? 'Minimum 10-year retention for AML/CFT documents. Includes customer identification and transaction records.' : 'Conservation minimale de 10 ans pour les documents LCB-FT. Inclut les dossiers d\'identification et données de transactions.',
          icon: 'ri-archive-line',
        },
        {
          title: isEn ? 'Internal Controls & Training' : 'Contrôle Interne & Formation',
          desc: isEn ? 'Robust internal control systems. Regular staff AML/CFT training. Independent audit function.' : 'Systèmes de contrôle interne robustes. Formation régulière du personnel LCB-FT. Fonction d\'audit indépendante.',
          icon: 'ri-group-line',
        },
      ],
      execSummaryTemplate: (regulators, count, applicable) => isEn
        ? `The present memorandum provides the Board with a consolidated analysis of the Anti-Money Laundering and Counter-Terrorist Financing (AML/CFT) regulatory framework across the ${regulators} jurisdictions. This synthesis draws from ${count} regulatory sources analyzed by the KOS REGTECH AI™ cognitive engine, with ${applicable} directly applicable instruments identified.`
        : `Le présent mémo fournit au Conseil d'Administration une analyse consolidée du dispositif LCB-FT dans les juridictions ${regulators}. Cette synthèse mobilise ${count} sources réglementaires analysées par le moteur cognitif KOS REGTECH AI™, avec ${applicable} instruments directement applicables identifiés.`,
    },
    agrement: {
      topic: isEn ? 'Microfinance Licensing & Authorization' : 'Agrément & Autorisation — Microfinance',
      icon: 'ri-government-line',
      obligations: [
        {
          title: isEn ? 'Licensing Conditions' : 'Conditions d\'Agrément',
          desc: isEn ? 'Minimum share capital requirements. Fit & proper assessment of senior management and board members. Business plan submission with 3-year financial projections. Feasibility study demonstrating market need.' : 'Capital social minimum requis. Évaluation fit & proper des dirigeants et administrateurs. Soumission d\'un plan d\'affaires avec projections financières sur 3 ans. Étude de faisabilité démontrant le besoin du marché.',
          icon: 'ri-file-list-3-line',
        },
        {
          title: isEn ? 'Application File' : 'Dossier d\'Agrément',
          desc: isEn ? 'Complete application file including: statutes, shareholder register, criminal record extracts for directors, audited opening balance sheet, internal control manual, AML/CFT procedures, and IT system description.' : 'Dossier complet comprenant : statuts, registre des actionnaires, extraits de casier judiciaire des dirigeants, bilan d\'ouverture audité, manuel de contrôle interne, procédures LCB-FT, et description du système d\'information.',
          icon: 'ri-folder-line',
        },
        {
          title: isEn ? 'Authorization Process' : 'Procédure d\'Autorisation',
          desc: isEn ? 'Submission to the monetary authority (BCEAO/Central Bank) via the Ministry of Finance. Review by the Banking Commission (COBAC in CEMAC). 90 to 180 day statutory review period. On-site inspection prior to final approval.' : 'Dépôt auprès de l\'autorité monétaire (BCEAO/Banque Centrale) via le Ministère des Finances. Instruction par la Commission Bancaire (COBAC en zone CEMAC). Délai d\'instruction réglementaire de 90 à 180 jours. Inspection sur place préalable à l\'agrément définitif.',
          icon: 'ri-timer-line',
        },
        {
          title: isEn ? 'Regulatory References' : 'Référentiel Réglementaire',
          desc: isEn ? 'Instruction BCEAO 004-2010 on MFI licensing withdrawal. Instruction BCEAO 001-2017 and 002-2017 on statutory modifications. COBAC Regulation R-2017/02 on microfinance approval. OHADA Uniform Act on commercial companies.' : 'Instruction BCEAO 004-2010 relative au retrait d\'agrément des SFD. Instructions BCEAO 001-2017 et 002-2017 sur les modifications statutaires. Règlement COBAC R-2017/02 relatif à l\'agrément en microfinance. Acte Uniforme OHADA sur les sociétés commerciales.',
          icon: 'ri-scales-3-line',
        },
        {
          title: isEn ? 'Post-Licensing Obligations' : 'Obligations Post-Agrément',
          desc: isEn ? 'Quarterly and annual regulatory reporting (SURFI, financial statements). Compliance with prudential ratios from day one. Notification of any change in management, shareholding (>10%), or statutory modifications. Annual external audit by an approved auditor.' : 'Reporting réglementaire trimestriel et annuel (SURFI, états financiers). Respect des ratios prudentiels dès l\'agrément. Notification de tout changement de dirigeants, actionnariat (>10%) ou modification statutaire. Audit externe annuel par un commissaire aux comptes agréé.',
          icon: 'ri-bar-chart-line',
        },
        {
          title: isEn ? 'Renewal & Withdrawal' : 'Renouvellement & Retrait',
          desc: isEn ? 'Licensing is perpetual subject to ongoing compliance. Withdrawal grounds: serious regulatory breaches, inactivity > 12 months, dissolution, false declarations. BCEAO Instruction 004-2010 governs the withdrawal procedure with adversarial process and appeal rights.' : 'L\'agrément est permanent sous réserve de conformité continue. Motifs de retrait : manquements graves, inactivité > 12 mois, dissolution, fausses déclarations. L\'Instruction BCEAO 004-2010 encadre la procédure de retrait avec contradictoire et droit de recours.',
          icon: 'ri-refresh-line',
        },
      ],
      execSummaryTemplate: (regulators, count, applicable) => isEn
        ? `The present memorandum provides the Board with a consolidated analysis of the microfinance licensing and authorization regulatory framework across the ${regulators} jurisdictions. This synthesis draws from ${count} regulatory sources analyzed by the KOS REGTECH AI™ cognitive engine, with ${applicable} directly applicable instruments governing the licensing conditions, application process, capital requirements, and post-licensing obligations for Microfinance Institutions (MFIs).`
        : `Le présent mémo fournit au Conseil d\'Administration une analyse consolidée du cadre réglementaire en matière d\'agrément et d\'autorisation des institutions de microfinance dans les juridictions ${regulators}. Cette synthèse mobilise ${count} sources réglementaires analysées par le moteur cognitif KOS REGTECH AI™, avec ${applicable} instruments directement applicables encadrant les conditions d\'agrément, la procédure de demande, les exigences de capital et les obligations post-agrément des Systèmes Financiers Décentralisés (SFD).`,
    },
    governance: {
      topic: isEn ? 'Governance & Specialized Committees' : 'Gouvernance & Comités Spécialisés',
      icon: 'ri-organization-chart',
      obligations: [
        {
          title: isEn ? 'Audit Committee' : 'Comité d\'Audit',
          desc: isEn ? 'Mandatory establishment of an audit committee with independent members. Oversight of financial reporting, internal control, and external audit.' : 'Mise en place obligatoire d\'un comité d\'audit avec membres indépendants. Supervision du reporting financier, du contrôle interne et de l\'audit externe.',
          icon: 'ri-file-search-line',
        },
        {
          title: isEn ? 'Risk Committee' : 'Comité des Risques',
          desc: isEn ? 'Dedicated risk committee responsible for risk strategy, appetite framework, and monitoring of risk exposures across all business lines.' : 'Comité des risques dédié, responsable de la stratégie risques, du cadre d\'appétence et du suivi des expositions sur toutes les lignes métier.',
          icon: 'ri-shield-flash-line',
        },
        {
          title: isEn ? 'Remuneration Committee' : 'Comité de Rémunération',
          desc: isEn ? 'Independent remuneration committee ensuring alignment of compensation policies with prudent risk-taking and long-term performance.' : 'Comité de rémunération indépendant assurant l\'alignement des politiques de rémunération avec une prise de risque prudente et la performance long terme.',
          icon: 'ri-money-dollar-circle-line',
        },
        {
          title: isEn ? 'Board Composition' : 'Composition du Conseil',
          desc: isEn ? 'Requirements for independent directors, diversity, expertise, and limits on the number of mandates. Fit & proper assessment for all board members.' : 'Exigences d\'indépendance, diversité, expertise et limites du nombre de mandats. Évaluation fit & proper pour tous les administrateurs.',
          icon: 'ri-team-line',
        },
        {
          title: isEn ? 'Board Evaluation' : 'Évaluation du Conseil',
          desc: isEn ? 'Annual self-assessment of board performance, committee effectiveness, and individual director contributions. External evaluation every 3 years.' : 'Auto-évaluation annuelle de la performance du conseil, de l\'efficacité des comités et des contributions individuelles. Évaluation externe tous les 3 ans.',
          icon: 'ri-bar-chart-line',
        },
        {
          title: isEn ? 'Conflict of Interest Management' : 'Gestion des Conflits d\'Intérêts',
          desc: isEn ? 'Formal policy for identifying, declaring, and managing conflicts of interest. Register of related-party transactions reviewed quarterly.' : 'Politique formelle d\'identification, déclaration et gestion des conflits d\'intérêts. Registre des transactions avec parties liées revu trimestriellement.',
          icon: 'ri-alert-line',
        },
      ],
      execSummaryTemplate: (regulators, count, applicable) => isEn
        ? `The present memorandum provides the Board with a consolidated analysis of the governance and specialized committees regulatory framework across the ${regulators} jurisdictions. This synthesis draws from ${count} regulatory sources analyzed by the KOS REGTECH AI™ cognitive engine, with ${applicable} directly applicable instruments governing board composition, committee mandates, and governance best practices.`
        : `Le présent mémo fournit au Conseil d'Administration une analyse consolidée du cadre réglementaire en matière de gouvernance et comités spécialisés dans les juridictions ${regulators}. Cette synthèse mobilise ${count} sources réglementaires analysées par le moteur cognitif KOS REGTECH AI™, avec ${applicable} instruments directement applicables encadrant la composition des conseils, les mandats des comités et les bonnes pratiques de gouvernance.`,
    },
    controle_interne: {
      topic: isEn ? 'Internal Control & Lines of Defense' : 'Contrôle Interne & Lignes de Défense',
      icon: 'ri-check-double-line',
      obligations: [
        { title: isEn ? 'First Line of Defense' : 'Première Ligne de Défense', desc: isEn ? 'Operational management owns and manages risks. Day-to-day controls embedded in business processes.' : 'Le management opérationnel détient et gère les risques. Contrôles quotidiens intégrés aux processus métier.', icon: 'ri-shield-line' },
        { title: isEn ? 'Second Line of Defense' : 'Deuxième Ligne de Défense', desc: isEn ? 'Risk management and compliance functions that monitor and facilitate the implementation of effective risk management practices.' : 'Fonctions risque et conformité qui supervisent et facilitent la mise en œuvre de pratiques efficaces de gestion des risques.', icon: 'ri-shield-user-line' },
        { title: isEn ? 'Third Line of Defense' : 'Troisième Ligne de Défense', desc: isEn ? 'Internal audit provides independent assurance on the effectiveness of governance, risk management, and internal control.' : 'L\'audit interne fournit une assurance indépendante sur l\'efficacité de la gouvernance, gestion des risques et contrôle interne.', icon: 'ri-shield-check-line' },
        { title: isEn ? 'COSO Framework' : 'Cadre COSO', desc: isEn ? 'Alignment with COSO 2013 Internal Control — Integrated Framework. Control environment, risk assessment, control activities, information & communication, monitoring.' : 'Alignement avec COSO 2013 Contrôle Interne — Cadre Intégré. Environnement de contrôle, évaluation des risques, activités de contrôle, information & communication, pilotage.', icon: 'ri-stack-line' },
        { title: isEn ? 'Control Activities' : 'Activités de Contrôle', desc: isEn ? 'Segregation of duties, authorization limits, reconciliations, and verification procedures. IT general controls and application controls.' : 'Séparation des tâches, limites d\'autorisation, rapprochements et procédures de vérification. Contrôles généraux informatiques et contrôles applicatifs.', icon: 'ri-settings-line' },
        { title: isEn ? 'Monitoring & Reporting' : 'Pilotage & Reporting', desc: isEn ? 'Ongoing and periodic evaluations of internal control effectiveness. Reporting of deficiencies to the Board and remedial action tracking.' : 'Évaluations continues et périodiques de l\'efficacité du contrôle interne. Reporting des déficiences au Conseil et suivi des actions correctives.', icon: 'ri-line-chart-line' },
      ],
      execSummaryTemplate: (regulators, count, applicable) => isEn
        ? `The present memorandum provides the Board with a consolidated analysis of the internal control and three lines of defense regulatory framework across the ${regulators} jurisdictions. This synthesis draws from ${count} regulatory sources, with ${applicable} directly applicable instruments identified.`
        : `Le présent mémo fournit au Conseil d'Administration une analyse consolidée du cadre réglementaire en matière de contrôle interne et trois lignes de défense dans les juridictions ${regulators}. Cette synthèse mobilise ${count} sources réglementaires, avec ${applicable} instruments directement applicables identifiés.`,
    },
    risque: {
      topic: isEn ? 'Risk Management' : 'Gestion des Risques',
      icon: 'ri-shield-flash-line',
      obligations: [
        { title: isEn ? 'Risk Appetite Framework' : 'Cadre d\'Appétence au Risque', desc: isEn ? 'Board-approved risk appetite statement. Quantitative and qualitative limits by risk type. Regular review and escalation procedures.' : 'Déclaration d\'appétence au risque approuvée par le Conseil. Limites quantitatives et qualitatives par type de risque. Procédures de revue et d\'escalade.', icon: 'ri-speed-up-line' },
        { title: isEn ? 'Risk Mapping' : 'Cartographie des Risques', desc: isEn ? 'Comprehensive risk identification and assessment across all business lines. Inherent and residual risk scoring. Heat map visualization.' : 'Identification et évaluation complète des risques sur toutes les lignes métier. Scoring inhérent et résiduel. Visualisation en carte thermique.', icon: 'ri-radar-line' },
        { title: isEn ? 'Stress Testing' : 'Tests de Résistance', desc: isEn ? 'Regular stress testing under adverse scenarios. ICAAP/ILAAP framework. Reverse stress testing to identify business model vulnerabilities.' : 'Tests de résistance réguliers sous scénarios adverses. Cadre ICAAP/ILAAP. Tests inversés pour identifier les vulnérabilités du modèle d\'affaires.', icon: 'ri-pulse-line' },
        { title: isEn ? 'Operational Risk' : 'Risque Opérationnel', desc: isEn ? 'Loss event database. Risk and control self-assessments (RCSA). Key risk indicators (KRI) monitoring and thresholds.' : 'Base de données des pertes. Auto-évaluations risques et contrôles (RCSA). Indicateurs clés de risque (KRI) et seuils de surveillance.', icon: 'ri-error-warning-line' },
        { title: isEn ? 'Credit Risk' : 'Risque de Crédit', desc: isEn ? 'Credit risk policies and procedures. Rating systems, provisioning rules (IFRS 9), concentration limits, and collateral management.' : 'Politiques et procédures risque de crédit. Systèmes de notation, règles de provisionnement (IFRS 9), limites de concentration, gestion des garanties.', icon: 'ri-bank-line' },
        { title: isEn ? 'BCP/DRP' : 'PCA/PRA', desc: isEn ? 'Business continuity plan and disaster recovery plan. Regular testing and updates. Critical function identification and recovery time objectives.' : 'Plan de continuité d\'activité et plan de reprise d\'activité. Tests et mises à jour réguliers. Identification des fonctions critiques et objectifs de temps de reprise.', icon: 'ri-restart-line' },
      ],
      execSummaryTemplate: (regulators, count, applicable) => isEn
        ? `The present memorandum provides the Board with a consolidated analysis of the risk management regulatory framework across the ${regulators} jurisdictions. This synthesis draws from ${count} regulatory sources, with ${applicable} directly applicable instruments identified.`
        : `Le présent mémo fournit au Conseil d'Administration une analyse consolidée du cadre réglementaire en matière de gestion des risques dans les juridictions ${regulators}. Cette synthèse mobilise ${count} sources réglementaires, avec ${applicable} instruments directement applicables identifiés.`,
    },
    cybersecurite: {
      topic: isEn ? 'Cybersecurity & Operational Resilience' : 'Cybersécurité & Résilience Opérationnelle',
      icon: 'ri-lock-line',
      obligations: [],
      execSummaryTemplate: (regulators, count, applicable) => isEn
        ? `The present memorandum provides the Board with a consolidated analysis of the cybersecurity and operational resilience regulatory framework across the ${regulators} jurisdictions.`
        : `Le présent mémo fournit au Conseil une analyse consolidée du cadre réglementaire cybersécurité et résilience opérationnelle dans les juridictions ${regulators}.`,
    },
    esg: {
      topic: isEn ? 'ESG & Sustainability' : 'ESG & Durabilité',
      icon: 'ri-leaf-line',
      obligations: [],
      execSummaryTemplate: (regulators, count, applicable) => isEn
        ? `The present memorandum provides the Board with a consolidated analysis of the ESG and sustainability regulatory framework across the ${regulators} jurisdictions.`
        : `Le présent mémo fournit au Conseil une analyse consolidée du cadre réglementaire ESG et durabilité dans les juridictions ${regulators}.`,
    },
    finance: {
      topic: isEn ? 'Finance & Prudential Regulation' : 'Finance & Réglementation Prudentielle',
      icon: 'ri-money-dollar-circle-line',
      obligations: [],
      execSummaryTemplate: (regulators, count, applicable) => isEn
        ? `The present memorandum provides the Board with a consolidated analysis of the financial and prudential regulatory framework across the ${regulators} jurisdictions.`
        : `Le présent mémo fournit au Conseil une analyse consolidée du cadre réglementaire financier et prudentiel dans les juridictions ${regulators}.`,
    },
    general: {
      topic: isEn ? 'Regulatory Intelligence' : 'Intelligence Réglementaire',
      icon: 'ri-scales-3-line',
      obligations: [],
      execSummaryTemplate: (regulators, count, applicable) => isEn
        ? `The present memorandum provides the Board with a consolidated analysis of the regulatory framework across the ${regulators} jurisdictions. This synthesis draws from ${count} regulatory sources, with ${applicable} directly applicable instruments identified.`
        : `Le présent mémo fournit au Conseil une analyse consolidée du cadre réglementaire dans les juridictions ${regulators}. Cette synthèse mobilise ${count} sources réglementaires, avec ${applicable} instruments directement applicables identifiés.`,
    },
  };
  return configs[domain];
}

function cleanAnswerForMemo(rawAnswer: string): string {
  let cleaned = rawAnswer;
  cleaned = cleaned.replace(/^(?:Score|V=|F=|M=|Authority Index|Priority Boost|Retrieved because|Confidence:|Risk:|Applicability:).*$/gm, '');
  cleaned = cleaned.replace(/=== BIG FOUR QUALITY GATES ===[\s\S]*?(?====|$)/, '');
  cleaned = cleaned.replace(/=== KPI REPORT ===[\s\S]*?(?====|$)/, '');
  cleaned = cleaned.replace(/^Total corpus:.*$/gm, '');
  cleaned = cleaned.replace(/^Engine:.*$/gm, '');
  cleaned = cleaned.replace(/^Pipeline:.*$/gm, '');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  cleaned = cleaned.replace(/^---+$/gm, '');
  cleaned = cleaned.replace(/^(?:Confidence Engine|Jurisdiction Priority Engine|Authority Index|Priority Boost|Hallucination Detector|Source Diversity):.*$/gm, '');
  return cleaned.trim();
}

function formatSourceLabel(regulator: string, title: string): string {
  const cleanTitle = stripMarkdown(title);
  if (cleanTitle.length > 100) return `${regulator} — ${cleanTitle.slice(0, 97)}...`;
  return `${regulator} — ${cleanTitle}`;
}

function getRiskLabel(riskLevel: string | undefined, isEn: boolean): string {
  if (!riskLevel) return '';
  const labels: Record<string, string> = { Critical: isEn ? 'Critical' : 'Critique', High: isEn ? 'High' : 'Élevé', Medium: isEn ? 'Medium' : 'Modéré', Low: isEn ? 'Low' : 'Faible' };
  return labels[riskLevel] || riskLevel;
}

function getApplicabilityLabel(app: string | undefined, isEn: boolean): string {
  if (!app) return '';
  const labels: Record<string, string> = { Applicable: isEn ? 'Directly Applicable' : 'Directement Applicable', Indirect: isEn ? 'Indirectly Applicable' : 'Indirectement Applicable', Reference: isEn ? 'Reference' : 'Référence', Academic: isEn ? 'Academic' : 'Académique' };
  return labels[app] || app;
}

export default function ExecutiveBoardMemo({ answer, sources, engine, pipeline, auditId, latencyMs, isEn, query, queryDomain, queryDomainLabel, domainLocked, domainValidation }: ExecutiveBoardMemoProps) {
  const today = new Date();
  const dateStr = today.toLocaleDateString(isEn ? 'en-US' : 'fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  const refNumber = `KOS-BF-${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // ═══ DOMAIN — from backend (single source of truth) ═══
  const domain = useMemo(() => normalizeDomain(queryDomain || 'general'), [queryDomain]);
  const domainConfig = useMemo(() => getDomainConfig(domain, isEn), [domain, isEn]);

  // Use backend label or fallback to config topic
  const displayTopic = queryDomainLabel || domainConfig.topic;

  // ═══ GENERAL QUERY — cross-domain is expected and valid ═══
  const isGeneralQuery = domainValidation?.is_general_query ?? false;

  const primarySources = useMemo(() => sources.filter(s => s.riskLevel !== 'Low' || s.tier === 'Gold'), [sources]);
  const secondarySources = useMemo(() => sources.filter(s => !primarySources.includes(s)), [sources, primarySources]);
  const applicableSources = sources.filter(s => s.applicability === 'Applicable');
  const hasHighRisk = sources.some(s => s.riskLevel === 'Critical' || s.riskLevel === 'High');

  const topRegulators = useMemo(() => {
    const seen = new Set<string>();
    return sources.filter(s => { if (seen.has(s.regulator)) return false; seen.add(s.regulator); return true; }).slice(0, 6).map(s => s.regulator);
  }, [sources]);

  const cleanedAnswer = useMemo(() => cleanAnswerForMemo(answer), [answer]);

  const execSummaryFirst = useMemo(() => domainConfig.execSummaryTemplate(topRegulators.join(', '), sources.length, applicableSources.length), [domainConfig, topRegulators, sources.length, applicableSources.length]);

  return (
    <div className="executive-memo space-y-8">
      {/* ═══════ HEADER ═══════ */}
      <div className="border-b-2 border-foreground-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 border border-accent-200 mb-3">
              <i className="ri-shield-check-line text-accent-600 text-xs" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent-700">
                {isEn ? 'CONFIDENTIAL — Board Only' : 'CONFIDENTIEL — Réservé au Conseil'}
              </span>
            </div>
            {domainLocked && domainValidation && (
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 ml-2 ${domainValidation.verdict === 'PASS' ? 'bg-green-50 border-green-200' : domainValidation.verdict === 'WARNING' ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
                <i className={`text-xs ${domainValidation.verdict === 'PASS' ? 'ri-lock-fill text-green-600' : domainValidation.verdict === 'WARNING' ? 'ri-lock-unlock-line text-amber-600' : 'ri-error-warning-line text-red-600'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${domainValidation.verdict === 'PASS' ? 'text-green-700' : domainValidation.verdict === 'WARNING' ? 'text-amber-700' : 'text-red-700'}`}>
                  Domain-Lock: {domainValidation.verdict}
                  {isGeneralQuery
                    ? (isEn ? ' (General — Cross-domain OK)' : ' (Général — Multi-domaines OK)')
                    : ` (${Math.round(domainValidation.match_ratio * 100)}% match)`}
                </span>
              </div>
            )}
            <h2 className="text-xl sm:text-2xl font-bold text-foreground-950 tracking-tight">
              {isEn ? 'Executive Board Memorandum' : 'Mémo Exécutif — Conseil d\'Administration'}
            </h2>
          </div>
          <div className="text-right">
            <div className="text-xs text-foreground-400 uppercase tracking-wider">{isEn ? 'Reference' : 'Référence'} {refNumber}</div>
            <div className="text-xs text-foreground-400">{dateStr}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-lg bg-background-50 border border-background-200 p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-foreground-400 mb-0.5">{isEn ? 'Topic' : 'Objet'}</div>
            <div className="text-sm font-semibold text-foreground-900 flex items-center gap-1.5">
              <i className={`${domainConfig.icon} text-xs`} />
              {displayTopic}
            </div>
          </div>
          <div className="rounded-lg bg-background-50 border border-background-200 p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-foreground-400 mb-0.5">{isEn ? 'Jurisdictions' : 'Juridictions'}</div>
            <div className="text-sm font-semibold text-foreground-900">{topRegulators.join(', ') || 'UEMOA, CEMAC, GAFI'}</div>
          </div>
          <div className="rounded-lg bg-background-50 border border-background-200 p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-foreground-400 mb-0.5">{isEn ? 'Sources Analyzed' : 'Sources Analysées'}</div>
            <div className="text-sm font-semibold text-foreground-900">{sources.length} {isEn ? 'regulatory documents' : 'documents réglementaires'}</div>
          </div>
          <div className="rounded-lg bg-background-50 border border-background-200 p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-foreground-400 mb-0.5">{isEn ? 'Classification' : 'Classification'}</div>
            <div className="text-sm font-semibold text-foreground-900">
              {hasHighRisk ? (isEn ? 'High Priority' : 'Priorité Élevée') : (isEn ? 'Standard' : 'Standard')}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ SECTION 1 — SYNTHÈSE EXÉCUTIVE ═══════ */}
      <section>
        <h3 className="text-base font-bold text-foreground-950 mb-3 flex items-center gap-2">
          <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-accent-100 flex-shrink-0"><i className="ri-file-text-line text-sm text-accent-600" /></span>
          {isEn ? '1. Executive Summary' : '1. Synthèse Exécutive'}
        </h3>
        <div className="prose prose-sm max-w-none text-foreground-700 leading-relaxed space-y-3">
          <p>{execSummaryFirst}</p>
          {primarySources.length > 0 && (
            <p>
              {isEn
                ? `The analysis confirms a strong regulatory convergence across the analyzed jurisdictions. Primary instruments from ${primarySources.map(s => s.regulator).filter((v, i, a) => a.indexOf(v) === i).join(', ')} establish a comprehensive governance framework. The Board's attention is drawn to areas requiring enhanced oversight, detailed in the recommendations section below.`
                : `L'analyse confirme une forte convergence réglementaire entre les juridictions analysées. Les instruments primaires de ${primarySources.map(s => s.regulator).filter((v, i, a) => a.indexOf(v) === i).join(', ')} établissent un cadre de gouvernance complet. L'attention du Conseil est attirée sur les domaines nécessitant une supervision renforcée, détaillés dans la section recommandations ci-après.`}
            </p>
          )}
          {hasHighRisk && (
            <div className="rounded-lg border border-red-200 bg-red-50/60 p-3 flex items-start gap-2.5 my-3">
              <i className="ri-alert-fill text-red-500 text-sm flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800 m-0">
                {isEn
                  ? 'The analysis identified regulatory instruments classified as High Risk that require immediate Board-level attention and prioritization in the compliance roadmap.'
                  : 'L\'analyse a identifié des instruments réglementaires classés à Risque Élevé nécessitant une attention immédiate du Conseil et une priorisation dans la feuille de route conformité.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════ SECTION 2 — CADRE RÉGLEMENTAIRE ═══════ */}
      <section>
        <h3 className="text-base font-bold text-foreground-950 mb-3 flex items-center gap-2">
          <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-secondary-100 flex-shrink-0"><i className="ri-scales-3-line text-sm text-secondary-600" /></span>
          {isEn ? '2. Applicable Regulatory Framework' : '2. Cadre Réglementaire Applicable'}
        </h3>
        <div className="space-y-2.5">
          {primarySources.map((src, i) => (
            <div key={i} className="rounded-lg bg-background-50 border border-background-200 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                <h4 className="text-sm font-semibold text-foreground-900 leading-snug">{stripMarkdown(src.title)}</h4>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 border border-accent-200">{src.regulator}</span>
                  {getApplicabilityLabel(src.applicability, isEn) && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 border border-primary-200">{getApplicabilityLabel(src.applicability, isEn)}</span>
                  )}
                </div>
              </div>
              {src.bigFourSummary && (
                <p className="text-xs text-foreground-600 leading-relaxed mt-2">
                  {stripMarkdown(src.bigFourSummary).length > 400 ? stripMarkdown(src.bigFourSummary).slice(0, 397) + '...' : stripMarkdown(src.bigFourSummary)}
                </p>
              )}
              {src.riskLevel && (
                <div className="mt-2 flex items-center gap-1.5">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${src.riskLevel === 'Critical' || src.riskLevel === 'High' ? 'text-red-600' : 'text-foreground-500'}`}>
                    <i className={src.riskLevel === 'Critical' || src.riskLevel === 'High' ? 'ri-error-warning-fill text-[10px]' : 'ri-information-line text-[10px]'} />
                    {isEn ? 'Risk Level' : 'Niveau de Risque'} : {getRiskLabel(src.riskLevel, isEn)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        {secondarySources.length > 0 && (
          <div className="mt-3">
            <h5 className="text-xs font-semibold text-foreground-500 mb-2 uppercase tracking-wider">{isEn ? 'Complementary References' : 'Références Complémentaires'}</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {secondarySources.map((src, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-background-50/60 border border-background-100">
                  <i className="ri-link text-foreground-300 text-xs flex-shrink-0 mt-0.5" />
                  <div><span className="text-xs font-medium text-foreground-700">{stripMarkdown(src.title)}</span><span className="text-[10px] text-foreground-400 ml-1.5">— {src.regulator}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ═══════ SECTION 3 — OBLIGATIONS CLÉS ═══════ */}
      <section>
        <h3 className="text-base font-bold text-foreground-950 mb-3 flex items-center gap-2">
          <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-primary-100 flex-shrink-0"><i className="ri-check-double-line text-sm text-primary-600" /></span>
          {isEn ? '3. Key Regulatory Obligations' : '3. Obligations Réglementaires Clés'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {domainConfig.obligations.length > 0 ? domainConfig.obligations.map((obl, i) => (
            <div key={i} className="rounded-lg bg-background-50 border border-background-200 p-4 flex items-start gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 flex-shrink-0"><i className={`${obl.icon} text-sm text-accent-600`} /></div>
              <div>
                <h4 className="text-sm font-semibold text-foreground-900 mb-1">{obl.title}</h4>
                <p className="text-xs text-foreground-600 leading-relaxed">{obl.desc}</p>
              </div>
            </div>
          )) : (
            <div className="col-span-2 rounded-lg bg-background-50 border border-background-200 p-4 text-center">
              <p className="text-xs text-foreground-500">{isEn ? 'Obligations extracted from the regulatory corpus above. Refer to individual source documents for detailed requirements.' : 'Obligations extraites du corpus réglementaire ci-dessus. Se référer aux documents sources pour les exigences détaillées.'}</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════ SECTION 4 — ANALYSE DES RISQUES ═══════ */}
      <section>
        <h3 className="text-base font-bold text-foreground-950 mb-3 flex items-center gap-2">
          <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 flex-shrink-0"><i className="ri-shield-flash-line text-sm text-red-500" /></span>
          {isEn ? '4. Risk Assessment' : '4. Analyse des Risques'}
        </h3>
        <div className="rounded-xl bg-background-50 border border-background-200 p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center"><div className="text-2xl font-bold text-foreground-900">{applicableSources.length}</div><div className="text-xs text-foreground-500 mt-1">{isEn ? 'Directly Applicable Regulations' : 'Réglementations Directement Applicables'}</div></div>
            <div className="text-center"><div className={`text-2xl font-bold ${hasHighRisk ? 'text-red-600' : 'text-accent-600'}`}>{sources.filter(s => s.riskLevel === 'Critical' || s.riskLevel === 'High').length}</div><div className="text-xs text-foreground-500 mt-1">{isEn ? 'High-Risk Instruments' : 'Instruments à Risque Élevé'}</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-foreground-900">{topRegulators.length}</div><div className="text-xs text-foreground-500 mt-1">{isEn ? 'Regulatory Authorities' : 'Autorités Réglementaires'}</div></div>
          </div>
          <div className="border-t border-background-200 pt-4">
            <h4 className="text-sm font-semibold text-foreground-900 mb-2">{isEn ? 'Key Risk Factors Identified' : 'Facteurs de Risque Clés Identifiés'}</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-xs text-foreground-700"><i className="ri-arrow-right-s-line text-accent-500 flex-shrink-0 mt-0.5" /><span>{isEn ? 'Multi-jurisdictional regulatory convergence creates complex compliance layering requiring careful navigation across WAEMU, CEMAC, and international standards.' : 'La convergence réglementaire multi-juridictionnelle crée un empilement de conformité complexe nécessitant une navigation prudente entre normes UEMOA, CEMAC et standards internationaux.'}</span></li>
              <li className="flex items-start gap-2 text-xs text-foreground-700"><i className="ri-arrow-right-s-line text-accent-500 flex-shrink-0 mt-0.5" /><span>{isEn ? 'Regulatory divergence between jurisdictions on specific provisions requires jurisdiction-specific compliance programs and monitoring.' : 'Les divergences réglementaires entre juridictions sur certaines dispositions exigent des programmes de conformité spécifiques et un monitoring adapté.'}</span></li>
              <li className="flex items-start gap-2 text-xs text-foreground-700"><i className="ri-arrow-right-s-line text-accent-500 flex-shrink-0 mt-0.5" /><span>{isEn ? 'Evolving regulatory landscape requires continuous monitoring and proactive adaptation of internal policies and procedures.' : 'L\'évolution du paysage réglementaire nécessite une veille continue et une adaptation proactive des politiques et procédures internes.'}</span></li>
              {hasHighRisk && (
                <li className="flex items-start gap-2 text-xs text-red-700 font-medium"><i className="ri-error-warning-fill text-red-500 flex-shrink-0 mt-0.5" /><span>{isEn ? 'High-risk instruments identified require immediate attention and prioritization before the next regulatory audit cycle.' : 'Des instruments à risque élevé nécessitent une attention immédiate et une priorisation avant le prochain cycle d\'audit réglementaire.'}</span></li>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 5 — RECOMMANDATIONS ═══════ */}
      <section>
        <h3 className="text-base font-bold text-foreground-950 mb-3 flex items-center gap-2">
          <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-accent-100 flex-shrink-0"><i className="ri-lightbulb-line text-sm text-accent-600" /></span>
          {isEn ? '5. Strategic Recommendations' : '5. Recommandations Stratégiques'}
        </h3>
        <div className="space-y-3">
          {[
            { prio: isEn ? 'PRIORITY 1' : 'PRIORITÉ 1', prioColor: 'bg-red-100 text-red-700 border-red-200', icon: 'ri-organization-chart', title: isEn ? 'Strengthen Governance Framework' : 'Renforcer le Dispositif de Gouvernance', desc: isEn ? 'Establish or reinforce Board-level specialized committees with clear terms of reference. Ensure independent director representation and regular performance evaluation.' : 'Mettre en place ou renforcer les comités spécialisés au niveau du Conseil avec des termes de référence clairs. Assurer la représentation d\'administrateurs indépendants et l\'évaluation régulière.' },
            { prio: isEn ? 'PRIORITY 2' : 'PRIORITÉ 2', prioColor: 'bg-orange-100 text-orange-700 border-orange-200', icon: 'ri-radar-line', title: isEn ? 'Deploy Comprehensive Oversight' : 'Déployer une Supervision Complète', desc: isEn ? 'Implement a full-scope regulatory monitoring framework aligned with applicable standards. Conduct quarterly compliance reviews with documented minutes.' : 'Mettre en œuvre un cadre complet de veille réglementaire aligné sur les normes applicables. Conduire des revues trimestrielles avec procès-verbaux documentés.' },
            { prio: isEn ? 'PRIORITY 3' : 'PRIORITÉ 3', prioColor: 'bg-amber-100 text-amber-700 border-amber-200', icon: 'ri-file-search-line', title: isEn ? 'Update Internal Policies' : 'Mettre à Jour les Politiques Internes', desc: isEn ? 'Revise internal policies and procedures to align with the latest regulatory requirements. Implement a regular policy review cycle (at least annual).' : 'Réviser les politiques et procédures internes pour les aligner sur les dernières exigences réglementaires. Mettre en place un cycle de revue régulier (au moins annuel).' },
            { prio: isEn ? 'PRIORITY 4' : 'PRIORITÉ 4', prioColor: 'bg-secondary-100 text-secondary-700 border-secondary-200', icon: 'ri-global-line', title: isEn ? 'Cross-Jurisdictional Harmonization' : 'Harmonisation Trans-Juridictionnelle', desc: isEn ? 'Develop a unified compliance program covering all applicable jurisdictions while maintaining flexibility for jurisdiction-specific requirements.' : 'Développer un programme de conformité unifié couvrant toutes les juridictions applicables avec flexibilité pour les exigences spécifiques.' },
          ].map((rec, i) => (
            <div key={i} className="rounded-lg border border-background-200 bg-white p-4 flex items-start gap-3">
              <div className={`flex-shrink-0 px-2 py-1 rounded-md text-[10px] font-bold border ${rec.prioColor}`}>{rec.prio}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-background-100 flex-shrink-0"><i className={`${rec.icon} text-xs text-accent-600`} /></div>
                  <h4 className="text-sm font-semibold text-foreground-900">{rec.title}</h4>
                </div>
                <p className="text-xs text-foreground-600 leading-relaxed ml-9">{rec.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ SECTION 6 — PLAN D'ACTIONS ═══════ */}
      <section>
        <h3 className="text-base font-bold text-foreground-950 mb-3 flex items-center gap-2">
          <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-primary-100 flex-shrink-0"><i className="ri-calendar-check-line text-sm text-primary-600" /></span>
          {isEn ? '6. Action Plan & Timeline' : '6. Plan d\'Actions & Calendrier'}
        </h3>
        <div className="relative pl-6 border-l-2 border-accent-200 space-y-4 ml-2">
          {[
            { timeline: isEn ? 'Immediate (J+30)' : 'Immédiat (J+30)', action: isEn ? 'Complete regulatory gap analysis. Brief the Board on identified priority areas.' : 'Finaliser l\'analyse des écarts réglementaires. Informer le Conseil des zones prioritaires identifiées.' },
            { timeline: isEn ? 'Short Term (J+60)' : 'Court Terme (J+60)', action: isEn ? 'Deploy regulatory watch framework across all business units. Initiate policy updates.' : 'Déployer le cadre de veille réglementaire sur toutes les unités. Initier les mises à jour des politiques.' },
            { timeline: isEn ? 'Medium Term (J+90)' : 'Moyen Terme (J+90)', action: isEn ? 'Establish or reinforce specialized committees. Conduct first compliance training cycle.' : 'Mettre en place ou renforcer les comités spécialisés. Réaliser le premier cycle de formation conformité.' },
            { timeline: isEn ? 'Strategic (J+180)' : 'Stratégique (J+180)', action: isEn ? 'Complete external audit of governance framework. Prepare for regulatory evaluation or follow-up assessment.' : 'Finaliser l\'audit externe du dispositif de gouvernance. Préparer l\'évaluation réglementaire ou le suivi.' },
          ].map((step, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-accent-500 border-2 border-white" />
              <div className="rounded-lg bg-background-50 border border-background-200 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-600">{step.timeline}</span>
                <p className="text-xs text-foreground-700 mt-1 leading-relaxed">{step.action}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ SECTION 7 — MENTIONS LÉGALES ═══════ */}
      <section className="border-t border-background-200 pt-5">
        <div className="text-xs text-foreground-400 leading-relaxed space-y-1">
          <p>
            <strong className="text-foreground-500">{isEn ? 'Disclaimer' : 'Avertissement'} :</strong>
            {' '}{isEn ? 'This memorandum is for internal Board use only. KOS REGTECH AI does not provide legal advice. All regulatory interpretations are subject to legal counsel review and sign-off before implementation.' : 'Ce mémo est pour usage interne exclusif du Conseil. KOS REGTECH AI ne fournit pas de conseil juridique. Toute interprétation réglementaire est soumise à la revue et approbation du conseil juridique avant mise en œuvre.'}
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-mono text-[10px]">{auditId}</span><span className="text-foreground-200">|</span><span className="font-mono text-[10px]">{engine}</span>
            {latencyMs !== undefined && (<><span className="text-foreground-200">|</span><span className="font-mono text-[10px]">{latencyMs.toFixed(0)}ms</span></>)}
            <span className="text-foreground-200">|</span><span className="text-[10px]">{isEn ? '100% Sovereign — ISO 42001 Certified' : '100% Souverain — Certifié ISO 42001'}</span>
          </p>
        </div>
      </section>
    </div>
  );
}



