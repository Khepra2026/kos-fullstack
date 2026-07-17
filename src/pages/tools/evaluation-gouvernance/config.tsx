import type { DiagnosticToolConfig } from '../components/types';

const FORM_URL = 'https://readdy.ai/api/form/d7b9jge8177dosp0iv80';

function getScoreColor(score: number): string {
  if (score >= 80) return '#059669';
  if (score >= 50) return '#d97706';
  return '#dc2626';
}

function getMaturityLevel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 90) return isFr ? 'Pleinement conforme' : 'Fully compliant';
  if (score >= 70) return isFr ? 'Conforme' : 'Compliant';
  if (score >= 40) return isFr ? 'Partiellement conforme' : 'Partially compliant';
  return isFr ? 'Non conforme' : 'Non-compliant';
}

function getScoreLabel(score: number, lang: string): string {
  return getMaturityLevel(score, lang);
}

function getReadinessIndicator(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 70) return isFr ? 'Gouvernance satisfaisante selon les standards BCEAO/OHADA' : 'Satisfactory governance according to BCEAO/OHADA standards';
  if (score >= 40) return isFr ? 'Gouvernance partiellement conforme, des améliorations sont nécessaires' : 'Partially compliant governance, improvements needed';
  return isFr ? 'Gouvernance non conforme, mise à niveau urgente requise' : 'Non-compliant governance, urgent upgrade required';
}

function getRisks(perAxis: Record<string, number>, globalScore: number, lang: string): (string | { fr: string; en: string })[] {
  const isFr = !lang.startsWith('en');
  const risks: (string | { fr: string; en: string })[] = [];

  if (perAxis['gouvernance-strategique'] !== undefined && perAxis['gouvernance-strategique'] < 50) {
    risks.push(isFr ? 'Absence de Conseil d\'Administration fonctionnel — risque de non-conformité OHADA' : 'No functional Board of Directors — risk of OHADA non-compliance');
  }
  if (perAxis['conformite-reglementaire'] !== undefined && perAxis['conformite-reglementaire'] < 50) {
    risks.push(isFr ? 'Non-conformité aux normes BCEAO/OHADA — risque de sanctions' : 'Non-compliance with BCEAO/OHADA standards — risk of sanctions');
  }
  if (perAxis['gestion-risques'] !== undefined && perAxis['gestion-risques'] < 50) {
    risks.push(isFr ? 'Absence de cartographie des risques et de contrôle interne — fragilité opérationnelle' : 'No risk mapping and internal control — operational fragility');
  }
  if (perAxis['transparence-reporting'] !== undefined && perAxis['transparence-reporting'] < 50) {
    risks.push(isFr ? 'États financiers non audités — risque de perte de confiance des partenaires' : 'Unaudited financial statements — risk of loss of partner trust');
  }
  if (perAxis['ethique-conformite'] !== undefined && perAxis['ethique-conformite'] < 50) {
    risks.push(isFr ? 'Absence de code de déontologie — risque réputationnel et juridique' : 'No code of ethics — reputational and legal risk');
  }

  if (risks.length === 0) {
    risks.push(isFr ? 'Risques de gouvernance maîtrisés' : 'Governance risks under control');
  }
  return risks;
}

function getRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; items: string[] }[] = [];

  if (globalScore < 40) {
    recs.push({
      title: isFr ? 'Mettre en place les fondations de la gouvernance' : 'Establish governance foundations',
      items: isFr
        ? ['Mettre en place un Conseil d\'Administration fonctionnel', 'Formaliser les procédures de contrôle interne', 'Engager un audit externe pour identifier les écarts', 'Former les dirigeants aux exigences BCEAO/OHADA']
        : ['Establish a functional Board of Directors', 'Formalize internal control procedures', 'Engage external audit to identify gaps', 'Train executives on BCEAO/OHADA requirements'],
    });
  } else if (globalScore < 70) {
    recs.push({
      title: isFr ? 'Renforcer le dispositif de gouvernance' : 'Strengthen governance system',
      items: isFr
        ? ['Renforcer le dispositif de gestion des risques', 'Améliorer la documentation des réunions du CA', 'Mettre à jour le manuel de procédures', 'Formaliser le code de déontologie']
        : ['Strengthen risk management system', 'Improve Board meeting documentation', 'Update procedures manual', 'Formalize code of ethics'],
    });
  } else if (globalScore < 90) {
    recs.push({
      title: isFr ? 'Optimiser la gouvernance' : 'Optimize governance',
      items: isFr
        ? ['Optimiser le reporting réglementaire', 'Renforcer la formation continue des administrateurs', 'Améliorer la traçabilité des décisions', 'Mettre en place un comité d\'audit']
        : ['Optimize regulatory reporting', 'Strengthen continuous training for directors', 'Improve decision traceability', 'Establish an audit committee'],
    });
  } else {
    recs.push({
      title: isFr ? 'Maintenir l\'excellence' : 'Maintain excellence',
      items: isFr
        ? ['Maintenir le niveau d\'excellence atteint', 'Anticiper les évolutions réglementaires', 'Partager les bonnes pratiques en interne', 'Envisager une certification de gouvernance']
        : ['Maintain the level of excellence achieved', 'Anticipate regulatory changes', 'Share best practices internally', 'Consider governance certification'],
    });
  }
  return recs;
}

export const evaluationGouvernanceConfig: DiagnosticToolConfig = {
  toolId: 'evaluation-gouvernance',
  toolNameFr: 'Évaluation de Gouvernance',
  toolNameEn: 'Governance Assessment',
  toolSubtitleFr: 'Vérifiez votre conformité aux normes BCEAO et OHADA avec une checklist de 10 critères essentiels.',
  toolSubtitleEn: 'Check your compliance with BCEAO and OHADA standards using a 10-criteria checklist.',

  seoTitleFr: 'Évaluation de Gouvernance BCEAO/OHADA | KHEPRA EXPERTS',
  seoTitleEn: 'BCEAO/OHADA Governance Assessment | KHEPRA EXPERTS',
  seoDescriptionFr: 'Vérifiez votre conformité aux normes BCEAO/OHADA avec une checklist de 10 critères essentiels. Téléchargez votre rapport PDF.',
  seoDescriptionEn: 'Check your compliance with BCEAO/OHADA standards using a 10-criteria checklist. Download your PDF report.',
  seoKeywordsFr: 'gouvernance, BCEAO, OHADA, conformité, audit gouvernance, SFD, institutions financières',
  seoKeywordsEn: 'governance, BCEAO, OHADA, compliance, governance audit, MFI, financial institutions',
  canonicalPath: '/tools/evaluation-gouvernance',

  axes: [
    {
      id: 'gouvernance-strategique',
      titleFr: 'Gouvernance Stratégique',
      titleEn: 'Strategic Governance',
      descriptionFr: 'Conseil d\'Administration et séparation des pouvoirs',
      descriptionEn: 'Board of Directors and separation of powers',
      icon: 'ri-building-line',
      color: '#0f766e',
      questions: [
        {
          id: 'c1',
          axisId: 'gouvernance-strategique',
          questionFr: 'Conseil d\'Administration fonctionnel — Disposez-vous d\'un CA avec réunions régulières (minimum 4/an) et procès-verbaux documentés ?',
          questionEn: 'Functional Board of Directors — Do you have a Board with regular meetings (minimum 4/year) and documented minutes?',
          options: [
            { value: 100, labelFr: 'Conforme — CA actif, PV réguliers, quorum respecté', labelEn: 'Compliant — Active board, regular minutes, quorum respected' },
            { value: 50, labelFr: 'Partiellement conforme — CA existant mais réunions irrégulières', labelEn: 'Partially compliant — Board exists but meetings irregular' },
            { value: 0, labelFr: 'Non conforme — Aucun CA ou organe de gouvernance', labelEn: 'Non-compliant — No board or governance body' },
          ],
        },
        {
          id: 'c2',
          axisId: 'gouvernance-strategique',
          questionFr: 'Séparation des pouvoirs — Existe-t-il une distinction claire entre organes de gouvernance (CA) et direction exécutive ?',
          questionEn: 'Separation of powers — Is there a clear distinction between governance bodies (Board) and executive management?',
          options: [
            { value: 100, labelFr: 'Conforme — Séparation claire avec fiches de poste distinctes', labelEn: 'Compliant — Clear separation with distinct job descriptions' },
            { value: 50, labelFr: 'Partiellement conforme — Séparation formelle mais chevauchement opérationnel', labelEn: 'Partially compliant — Formal separation but operational overlap' },
            { value: 0, labelFr: 'Non conforme — Cumul des fonctions DG/Président', labelEn: 'Non-compliant — Combined CEO/Chairman roles' },
          ],
        },
      ],
    },
    {
      id: 'conformite-reglementaire',
      titleFr: 'Conformité Réglementaire',
      titleEn: 'Regulatory Compliance',
      descriptionFr: 'Respect des normes BCEAO et droit des sociétés OHADA',
      descriptionEn: 'BCEAO standards and OHADA corporate law compliance',
      icon: 'ri-shield-check-line',
      color: '#0e7490',
      questions: [
        {
          id: 'c3',
          axisId: 'conformite-reglementaire',
          questionFr: 'Respect des normes BCEAO — Appliquez-vous les instructions BCEAO sur la gouvernance des SFD et institutions financières ?',
          questionEn: 'BCEAO standards compliance — Do you apply BCEAO instructions on governance of MFIs and financial institutions?',
          options: [
            { value: 100, labelFr: 'Conforme — Instructions appliquées et documentation à jour', labelEn: 'Compliant — Instructions applied and documentation up to date' },
            { value: 50, labelFr: 'Partiellement conforme — Application partielle ou documentation incomplète', labelEn: 'Partially compliant — Partial application or incomplete documentation' },
            { value: 0, labelFr: 'Non conforme — Instructions non appliquées', labelEn: 'Non-compliant — Instructions not applied' },
          ],
        },
        {
          id: 'c4',
          axisId: 'conformite-reglementaire',
          questionFr: 'Conformité OHADA — Respectez-vous le droit des sociétés OHADA et tenez-vous régulièrement des Assemblées Générales ?',
          questionEn: 'OHADA compliance — Do you comply with OHADA corporate law and regularly hold General Assemblies?',
          options: [
            { value: 100, labelFr: 'Conforme — Droit OHADA respecté, AG régulières documentées', labelEn: 'Compliant — OHADA law respected, documented regular GAs' },
            { value: 50, labelFr: 'Partiellement conforme — AG tenues mais documentation incomplète', labelEn: 'Partially compliant — GAs held but incomplete documentation' },
            { value: 0, labelFr: 'Non conforme — AG non tenues ou irrégulières', labelEn: 'Non-compliant — GAs not held or irregular' },
          ],
        },
      ],
    },
    {
      id: 'gestion-risques',
      titleFr: 'Gestion des Risques',
      titleEn: 'Risk Management',
      descriptionFr: 'Cartographie des risques, contrôle interne et conformité',
      descriptionEn: 'Risk mapping, internal control and compliance',
      icon: 'ri-shield-flash-line',
      color: '#d97706',
      questions: [
        {
          id: 'c5',
          axisId: 'gestion-risques',
          questionFr: 'Dispositif de gestion des risques — Disposez-vous d\'une cartographie des risques et d\'un comité de gestion des risques ?',
          questionEn: 'Risk management system — Do you have risk mapping and a risk management committee?',
          options: [
            { value: 100, labelFr: 'Conforme — Cartographie complète, comité actif, révision annuelle', labelEn: 'Compliant — Complete mapping, active committee, annual review' },
            { value: 50, labelFr: 'Partiellement conforme — Cartographie existante mais partielle ou comité informel', labelEn: 'Partially compliant — Mapping exists but partial or informal committee' },
            { value: 0, labelFr: 'Non conforme — Aucune cartographie ni comité', labelEn: 'Non-compliant — No mapping or committee' },
          ],
        },
        {
          id: 'c6',
          axisId: 'gestion-risques',
          questionFr: 'Contrôle interne — Disposez-vous d\'un système de contrôle interne formalisé avec manuel de procédures à jour ?',
          questionEn: 'Internal control — Do you have a formalized internal control system with up-to-date procedures manual?',
          options: [
            { value: 100, labelFr: 'Conforme — Contrôle interne structuré, manuel à jour, audits réguliers', labelEn: 'Compliant — Structured internal control, updated manual, regular audits' },
            { value: 50, labelFr: 'Partiellement conforme — Contrôle informel ou manuel obsolète', labelEn: 'Partially compliant — Informal control or outdated manual' },
            { value: 0, labelFr: 'Non conforme — Aucun contrôle interne formalisé', labelEn: 'Non-compliant — No formalized internal control' },
          ],
        },
      ],
    },
    {
      id: 'transparence-reporting',
      titleFr: 'Transparence & Reporting',
      titleEn: 'Transparency & Reporting',
      descriptionFr: 'Audit externe, états financiers et reporting réglementaire',
      descriptionEn: 'External audit, financial statements and regulatory reporting',
      icon: 'ri-file-chart-line',
      color: '#7c3aed',
      questions: [
        {
          id: 'c7',
          axisId: 'transparence-reporting',
          questionFr: 'États financiers certifiés — Faites-vous l\'objet d\'un audit externe annuel par un commissaire aux comptes agréé ?',
          questionEn: 'Certified financial statements — Do you undergo an annual external audit by an approved statutory auditor?',
          options: [
            { value: 100, labelFr: 'Conforme — Audit externe annuel, rapport certifié', labelEn: 'Compliant — Annual external audit, certified report' },
            { value: 50, labelFr: 'Partiellement conforme — Audit ponctuel ou révision contractuelle', labelEn: 'Partially compliant — Occasional audit or contractual review' },
            { value: 0, labelFr: 'Non conforme — Aucun audit externe', labelEn: 'Non-compliant — No external audit' },
          ],
        },
        {
          id: 'c8',
          axisId: 'transparence-reporting',
          questionFr: 'Reporting réglementaire — Transmettez-vous régulièrement les états réglementaires aux autorités de supervision ?',
          questionEn: 'Regulatory reporting — Do you regularly transmit regulatory statements to supervisory authorities?',
          options: [
            { value: 100, labelFr: 'Conforme — États transmis dans les délais, contrôle qualité', labelEn: 'Compliant — Statements transmitted on time, quality control' },
            { value: 50, labelFr: 'Partiellement conforme — Transmission irrégulière ou retards fréquents', labelEn: 'Partially compliant — Irregular transmission or frequent delays' },
            { value: 0, labelFr: 'Non conforme — Reporting non effectué', labelEn: 'Non-compliant — Reporting not done' },
          ],
        },
      ],
    },
    {
      id: 'ethique-conformite',
      titleFr: 'Éthique & Conformité',
      titleEn: 'Ethics & Compliance',
      descriptionFr: 'Code de déontologie et lutte contre la corruption',
      descriptionEn: 'Code of ethics and anti-corruption',
      icon: 'ri-scales-3-line',
      color: '#be123c',
      questions: [
        {
          id: 'c9',
          axisId: 'ethique-conformite',
          questionFr: 'Code de déontologie — Disposez-vous d\'un code de déontologie appliqué pour les dirigeants et administrateurs ?',
          questionEn: 'Code of ethics — Do you have and apply a code of ethics for executives and directors?',
          options: [
            { value: 100, labelFr: 'Conforme — Code adopté, signé par tous, révisé périodiquement', labelEn: 'Compliant — Code adopted, signed by all, periodically reviewed' },
            { value: 50, labelFr: 'Partiellement conforme — Code existant mais non signé ou appliqué', labelEn: 'Partially compliant — Code exists but not signed or applied' },
            { value: 0, labelFr: 'Non conforme — Aucun code de déontologie', labelEn: 'Non-compliant — No code of ethics' },
          ],
        },
        {
          id: 'c10',
          axisId: 'ethique-conformite',
          questionFr: 'Lutte contre la corruption — Disposez-vous d\'un dispositif de prévention de la corruption et de gestion des conflits d\'intérêts ?',
          questionEn: 'Anti-corruption — Do you have a corruption prevention system and conflict of interest management?',
          options: [
            { value: 100, labelFr: 'Conforme — Dispositif complet, déclarations annuelles, canal éthique', labelEn: 'Compliant — Complete system, annual declarations, ethics channel' },
            { value: 50, labelFr: 'Partiellement conforme — Mesures ponctuelles sans dispositif formalisé', labelEn: 'Partially compliant — Occasional measures without formalized system' },
            { value: 0, labelFr: 'Non conforme — Aucune mesure anti-corruption', labelEn: 'Non-compliant — No anti-corruption measures' },
          ],
        },
      ],
    },
  ],

  howToNameFr: 'Évaluation de Gouvernance BCEAO/OHADA KHEPRA™',
  howToNameEn: 'BCEAO/OHADA Governance Assessment KHEPRA™',
  howToDescriptionFr: 'Vérifiez votre conformité aux normes BCEAO/OHADA avec une checklist de 10 critères essentiels répartis en 5 catégories : gouvernance stratégique, conformité réglementaire, gestion des risques, transparence et éthique.',
  howToDescriptionEn: 'Check your BCEAO/OHADA compliance with a 10-criteria checklist across 5 categories: strategic governance, regulatory compliance, risk management, transparency and ethics.',
  howToTotalTime: '5M',
  howToSteps: [
    { name: 'Gouvernance Stratégique', text: 'Vérifiez l\'existence d\'un Conseil d\'Administration fonctionnel et la séparation des pouvoirs entre gouvernance et direction exécutive.' },
    { name: 'Conformité Réglementaire', text: 'Évaluez le respect des normes BCEAO sur la gouvernance des SFD et la conformité au droit des sociétés OHADA.' },
    { name: 'Gestion des Risques', text: 'Examinez le dispositif de gestion des risques et le système de contrôle interne.' },
    { name: 'Transparence & Reporting', text: 'Vérifiez l\'audit externe des états financiers et le reporting réglementaire aux autorités de supervision.' },
    { name: 'Éthique & Conformité', text: 'Contrôlez l\'existence du code de déontologie et du dispositif de prévention de la corruption.' },
  ],

  getScoreColor,
  getScoreLabel,
  getMaturityLevel,
  getReadinessIndicator,

  getRisks: (perAxis, globalScore, lang) => getRisks(perAxis, globalScore, lang),
  getRecommendations: (perAxis, globalScore, lang) => getRecommendations(perAxis, globalScore, lang),

  getOptionStyle: (value, isSelected) => {
    if (value === 100) return isSelected ? 'border-primary-500 bg-primary-50' : 'border-secondary-200 hover:border-primary-300';
    if (value === 50) return isSelected ? 'border-accent-500 bg-accent-50' : 'border-secondary-200 hover:border-accent-300';
    if (value === 0) return isSelected ? 'border-red-500 bg-red-50' : 'border-secondary-200 hover:border-red-300';
    return isSelected ? 'border-gray-500 bg-gray-50' : 'border-secondary-200 hover:border-secondary-300';
  },
  getOptionIcon: (value) => {
    if (value === 100) return 'ri-check-double-line';
    if (value === 50) return 'ri-check-line';
    return 'ri-close-line';
  },
  getOptionColor: (value) => {
    if (value === 100) return 'text-primary-600';
    if (value === 50) return 'text-accent-600';
    return 'text-red-600';
  },

  showLeadForm: true,
  formUrl: FORM_URL,

  hashtags: ['Gouvernance', 'ConformiteBCEAO', 'ConformiteOHADA', 'GoodGovernance'],

  showRadarChart: false,

  badgeIcon: 'ri-shield-check-line',
  badgeTextFr: '5 catégories · 10 critères · 5 min',
  badgeTextEn: '5 categories · 10 criteria · 5 min',

  expertCTA: {
    titleFr: 'Besoin d\'un audit complet ?',
    titleEn: 'Need a complete audit?',
    descriptionFr: 'Nos experts peuvent réaliser un audit approfondi de votre gouvernance et vous accompagner vers la conformité.',
    descriptionEn: 'Our experts can conduct an in-depth audit of your governance and support you towards compliance.',
    ctaFr: 'Planifier un rendez-vous',
    ctaEn: 'Schedule a meeting',
    ctaLink: '/contact',
  },
};