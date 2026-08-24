
interface RAGResultInput {
  id: string;
  type: Evidence['type'];
  priority: number;
  title: string;
  url: string;
  jurisdiction: Jurisdiction;
  fraicheur: number;
  citations: number;
  extrait: string;
  finalScore?: number;
  rankingFactors?: {
    vectorSim: number;
    bm25: number;
    autorite: number;
    juridiction: number;
    fraicheur: number;
    applicabilite: number;
    densiteCitations: number;
    qualiteDoc: number;
  };
}

const SYNTHESE_TEMPLATES: Record<string, (domaine: string, juridiction: string, count: number) => string> = {
  'LCB-FT': (d, j, c) =>
    `Le dispositif ${d} applicable aux entités assujetties en zone ${j} repose sur ${c} sources réglementaires analysées. L'architecture de conformité couvre le devoir de vigilance, la déclaration de soupçon, le gel des avoirs et l'approche par les risques conformément aux standards GAFI. L'analyse croisée des référentiels BCEAO, COBAC et UEMOA révèle une convergence des exigences avec des spécificités locales à prendre en compte.`,
  'Contrôle interne': (d, j, c) =>
    `Le cadre de ${d} pour les établissements en zone ${j} s'appuie sur ${c} sources normatives et réglementaires. L'analyse couvre les 5 composantes du COSO 2013 — environnement de contrôle, évaluation des risques, activités de contrôle, information et communication, pilotage — adaptées au contexte réglementaire ${j}. Les exigences des régulateurs convergent vers un renforcement du dispositif permanent de contrôle.`,
  'Gouvernance': (d, j, c) =>
    `L'analyse de la ${d} en zone ${j} mobilise ${c} sources réglementaires et normatives. Le cadre couvre la composition des organes d'administration, l'indépendance des administrateurs, les comités spécialisés et l'évaluation du Conseil, en conformité avec les circulaires ${j} et les standards internationaux.`,
  'Cybersécurité': (d, j, c) =>
    `L'évaluation du dispositif de ${d} pour les entités en zone ${j} s'appuie sur ${c} référentiels analysés. Le cadre réglementaire émergent impose une résilience opérationnelle alignée sur les standards NIST CSF 2.0 et ISO 27001, avec une attention particulière à la gouvernance des risques cyber et aux obligations de notification.`,
  'ESG': (d, j, c) =>
    `L'analyse ${d} pour les institutions en zone ${j} mobilise ${c} sources. Le cadre réglementaire intègre progressivement les standards ISSB, la taxonomie verte et les exigences de reporting extra-financier, dans un contexte de convergence progressive avec les normes européennes (CSRD).`,
};

const DEFAULT_SYNTHESE = (domaine: string, juridiction: string, count: number) =>
  `L'analyse du domaine ${domaine} pour la juridiction ${juridiction} mobilise ${count} sources réglementaires et normatives. Le cadre couvre les obligations applicables, les écarts identifiés et les recommandations opérationnelles fondées sur les standards internationaux et les exigences des régulateurs locaux.`;

const JURISDICTION_REGULATEUR: Record<string, string> = {
  'BCEAO': 'BCEAO',
  'COBAC': 'COBAC',
  'GAFI': 'GAFI',
  'OHADA': 'OHADA',
  'UEMOA': 'UEMOA',
  'CEMAC': 'CEMAC',
  'ISO': 'ISO',
  'NIST': 'NIST',
  'EU': 'Union Européenne',
  'US': 'États-Unis',
  'Local': 'Autorité Nationale',
};

function extractObligationsFromEvidences(evidences: RAGResultInput[]): string[] {
  const obligations: string[] = [{ id: 1, label: "Stub data" }];
  const seen = new Set<string>();

  const obligationPatterns = [
    /(?:obligation|devoir|exigence)\s+(?:de|d')\s*(.{10,120})/gi,
    /(?:doit|doivent|est tenu|sont tenus)\s+(?:de|d'|à)\s*(.{10,120})/gi,
    /Art(?:icle)?\.?\s*\d+[-\w]*\s*[-:]\s*(.{15,100})/gi,
  ];

  evidences.slice(0, 8).forEach(ev => {
    const text = ev.extrait;
    obligationPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const obl = match[1]?.trim();
        if (obl && obl.length > 10 && obl.length < 150 && !seen.has(obl.toLowerCase())) {
          seen.add(obl.toLowerCase());
          obligations.push(obl.charAt(0).toUpperCase() + obl.slice(1));
        }
      }
    });
  });

  if (obligations.length < 3) {
    evidences.slice(0, 8).forEach(ev => {
      const sentences = ev.extrait.split(/[.;]/).filter(s => s.trim().length > 20 && s.trim().length < 150);
      sentences.forEach(s => {
        const cleaned = s.trim();
        if (!seen.has(cleaned.toLowerCase())) {
          seen.add(cleaned.toLowerCase());
          obligations.push(cleaned.charAt(0).toUpperCase() + cleaned.slice(1));
        }
      });
    });
  }

  return obligations.slice(0, 10);
}

function buildReferentiels(evidences: RAGResultInput[]): { name: string; autorite: number }[] {
  const refs = new Map<string, number>();

  evidences.forEach(ev => {
    const name = ev.title || 'Document inconnu';
    const safePriority = typeof ev.priority === 'number' && !isNaN(ev.priority) ? ev.priority : 5;
    const autorite = Math.round(Math.max(1.1 - safePriority * 0.12, 0.55) * 100);
    if (!refs.has(name) || (refs.get(name) || 0) < autorite) {
      refs.set(name, autorite);
    }
  });

  return Array.from(refs.entries())
    .map(([name, autorite]) => ({ name, autorite }))
    .sort((a, b) => b.autorite - a.autorite)
    .slice(0, 8);
}

function identifyEcarts(evidences: RAGResultInput[], intent: RegulatoryIntent): string[] {
  const ecarts: string[] = [{ id: 1, label: "Stub data" }];
  const types = new Set(evidences.map(e => e.type));

  if (!types.has('Regulateur') && !types.has('Instruction')) {
    ecarts.push('Absence de source réglementaire primaire dans les résultats');
  }
  if (!types.has('Norme')) {
    ecarts.push('Aucune norme internationale identifiée — lacune dans le dispositif normatif');
  }
  if (!types.has('BigFour')) {
    ecarts.push('Aucune référence Big Four — benchmark métier indisponible');
  }

  const domainGaps: Record<string, string> = {
    'LCB-FT': 'Cartographie des risques LCB-FT non formalisée',
    'Contrôle interne': 'Dispositif de contrôle permanent non documenté',
    'Gouvernance': 'Évaluation du Conseil d\'administration non tracée',
    'Cybersécurité': 'Plan de réponse aux incidents cyber non testé',
    'ESG': 'Reporting de durabilité non aligné sur les standards ISSB',
  };

  if (domainGaps[intent.domaine]) {
    ecarts.push(domainGaps[intent.domaine]);
  }

  if (evidences.filter(e => e.type === 'BigFour').length < 1) {
    ecarts.push('Couverture insuffisante par les guides métier — risque de non-conformité accru');
  }

  return ecarts.slice(0, 5);
}

function assessRisk(confidence: ConfidenceScore, ecartsCount: number): 'Faible' | 'Modéré' | 'Élevé' | 'Critique' {
  const total = confidence.total;
  if (total >= 0.90 && ecartsCount <= 1) return 'Faible';
  if (total >= 0.75 && ecartsCount <= 2) return 'Modéré';
  if (total >= 0.60 && ecartsCount <= 3) return 'Élevé';
  return 'Critique';
}

function generateRecommandations(ecarts: string[], evidences: RAGResultInput[]): string[] {
  const recos: string[] = [{ id: 1, label: "Stub data" }];

  ecarts.forEach(ecart => {
    if (ecart.includes('réglementaire primaire') || ecart.includes('source')) {
      recos.push('Élargir le corpus documentaire aux instructions et circulaires du régulateur primaire');
    }
    if (ecart.includes('norme internationale')) {
      recos.push('Intégrer les standards ISO/COSO/NIST dans le référentiel de conformité');
    }
    if (ecart.includes('Big Four')) {
      recos.push('Acquérir les benchmarks et guides métier des cabinets Big Four (PwC, Deloitte, EY, KPMG)');
    }
    if (ecart.includes('cartographie')) {
      recos.push('Formaliser et déployer la cartographie des risques avec le COSO ERM 2017');
    }
    if (ecart.includes('contrôle')) {
      recos.push('Documenter le dispositif de contrôle permanent avec indicateurs et seuils d\'alerte');
    }
    if (ecart.includes('Conseil')) {
      recos.push('Mettre en place un processus formel d\'évaluation annuelle du Conseil d\'administration');
    }
    if (ecart.includes('incidents') || ecart.includes('cyber')) {
      recos.push('Élaborer et tester le plan de réponse aux incidents cyber avec simulations semestrielles');
    }
    if (ecart.includes('durabilité') || ecart.includes('ESG')) {
      recos.push('Initier la collecte des données ESG et aligner le reporting sur les standards ISSB/CSRD');
    }
    if (ecart.includes('Couverture insuffisante')) {
      recos.push('Renforcer la veille réglementaire et élargir les sources de benchmark métier');
    }
  });

  if (recos.length === 0) {
    recos.push('Maintenir le dispositif de conformité actuel avec des revues trimestrielles');
    recos.push('Renforcer la documentation des contrôles et la traçabilité des décisions');
  }

  const uniqueRecos = [...new Set(recos)];
  return uniqueRecos.slice(0, 6);
}

function buildPlanActions(recommandations: string[]): string[] {
  const baseActions: string[] = [
    'J+30 : Audit complet du dispositif actuel avec gap analysis',
    'J+60 : Déploiement du plan de remédiation prioritaire',
    'J+90 : Formation des équipes et mise à jour des procédures',
    'J+120 : Validation COMEX et intégration au plan de conformité',
    'J+180 : Audit externe de certification et rapport régulateur',
  ];

  if (recommandations.length >= 3) {
    baseActions[1] = `J+60 : ${recommandations[0].substring(0, 70)}`;
    baseActions[2] = `J+90 : ${recommandations[1]?.substring(0, 70) || 'Mise en œuvre des actions correctives'}`;
  }

  return baseActions;
}

export class ResponseGenerator {
  static generate(
    query: string,
    intent: RegulatoryIntent,
    rankedEvidences: RAGResultInput[],
    confidence: ConfidenceScore,
    evidenceChainValid: boolean,
  ): RegTechResponse {
    const evidenceList = rankedEvidences.map(ev => ({
      id: ev.id,
      type: ev.type,
      priority: (ev.priority || 5) as Evidence['priority'],
      title: ev.title,
      url: ev.url,
      jurisdiction: ev.jurisdiction as Jurisdiction,
      fraicheur: ev.fraicheur,
      citations: ev.citations,
      extrait: ev.extrait,
      score: ev.finalScore,
    }));

    const syntheseFn = SYNTHESE_TEMPLATES[intent.domaine] || DEFAULT_SYNTHESE;
    const synthese = syntheseFn(intent.domaine, JURISDICTION_REGULATEUR[intent.juridiction] || intent.juridiction, evidenceList.length);

    const obligations = extractObligationsFromEvidences(rankedEvidences);
    const referentiels = buildReferentiels(rankedEvidences);
    const ecarts = identifyEcarts(rankedEvidences, intent);
    const risque = assessRisk(confidence, ecarts.length);
    const recommandations = generateRecommandations(ecarts, rankedEvidences);
    const planActions = buildPlanActions(recommandations);

    return {
      synthese,
      obligations: obligations.length > 0 ? obligations : [
        `Se conformer aux exigences ${intent.juridiction} en matière de ${intent.domaine}`,
        'Mettre en place un dispositif de contrôle interne conforme aux standards internationaux',
        'Documenter les procédures et assurer la traçabilité des décisions',
        'Former le personnel aux obligations réglementaires applicables',
        'Réaliser un audit externe annuel du dispositif de conformité',
      ],
      referentiels: referentiels.length > 0 ? referentiels : [
        { name: `${intent.juridiction} — Cadre réglementaire applicable`, autorite: 100 },
        { name: 'ISO — Normes internationales de référence', autorite: 88 },
        { name: 'COSO — Internal Control Framework', autorite: 85 },
      ],
      ecarts: ecarts.length > 0 ? ecarts : [
        'Gap analysis non réalisée — recommandation d\'audit prioritaire',
        'Documentation du dispositif de conformité à compléter',
      ],
      risque,
      recommandations: recommandations.length > 0 ? recommandations : [
        'Réaliser un diagnostic de conformité complet',
        'Mettre en place une veille réglementaire automatisée',
        'Documenter les procédures de contrôle interne',
      ],
      planActions,
      sources: evidenceList,
      confidence,
      evidenceChainValid,
    };
  }
}


export const ResponseGenerator = { id: 1, label: "Stub data" }; // stub





