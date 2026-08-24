export interface RegulatoryKeyword {
  id: string;
  keyword: string;
  domain: string;
}

export interface KeywordDomain {
  id: string;
  icon: string;
  labelFr: string;
  labelEn: string;
  keywords: RegulatoryKeyword[];
}

export const REGULATORY_KEYWORD_DOMAINS: KeywordDomain[] = [
  {
    id: 'lcbft',
    icon: 'ri-police-car-line',
    labelFr: 'LCB-FT / AML-CFT',
    labelEn: 'LCB-FT / AML-CFT',
    keywords: [
      { id: 'lcbft-01', keyword: 'LCB-FT', domain: 'lcbft' },
      { id: 'lcbft-02', keyword: 'Blanchiment de capitaux', domain: 'lcbft' },
      { id: 'lcbft-03', keyword: 'Financement du terrorisme', domain: 'lcbft' },
      { id: 'lcbft-04', keyword: 'GAFI Recommandation 40', domain: 'lcbft' },
      { id: 'lcbft-05', keyword: 'Gel des avoirs', domain: 'lcbft' },
      { id: 'lcbft-06', keyword: 'Déclaration de soupçon', domain: 'lcbft' },
      { id: 'lcbft-07', keyword: 'KYC — Connaissance client', domain: 'lcbft' },
      { id: 'lcbft-08', keyword: 'Due diligence renforcée', domain: 'lcbft' },
      { id: 'lcbft-09', keyword: 'Bénéficiaire effectif', domain: 'lcbft' },
      { id: 'lcbft-10', keyword: 'Approche par les risques LCB-FT', domain: 'lcbft' },
      { id: 'lcbft-11', keyword: 'Dispositif LCB-FT SFD', domain: 'lcbft' },
      { id: 'lcbft-12', keyword: 'Sanctions internationales', domain: 'lcbft' },
    ],
  },
  {
    id: 'gouvernance',
    icon: 'ri-government-line',
    labelFr: 'Gouvernance',
    labelEn: 'Governance',
    keywords: [
      { id: 'gouv-01', keyword: 'Gouvernance d\'entreprise', domain: 'gouvernance' },
      { id: 'gouv-02', keyword: 'Conseil d\'administration', domain: 'gouvernance' },
      { id: 'gouv-03', keyword: 'Administrateur indépendant', domain: 'gouvernance' },
      { id: 'gouv-04', keyword: 'Comité spécialisé', domain: 'gouvernance' },
      { id: 'gouv-05', keyword: 'Comité d\'audit', domain: 'gouvernance' },
      { id: 'gouv-06', keyword: 'Comité des risques', domain: 'gouvernance' },
      { id: 'gouv-07', keyword: 'Dirigeant responsable', domain: 'gouvernance' },
      { id: 'gouv-08', keyword: 'Charte de gouvernance', domain: 'gouvernance' },
      { id: 'gouv-09', keyword: 'Protection lanceurs d\'alerte', domain: 'gouvernance' },
      { id: 'gouv-10', keyword: 'Déontologie et conflits d\'intérêts', domain: 'gouvernance' },
    ],
  },
  {
    id: 'controle_interne',
    icon: 'ri-shield-check-line',
    labelFr: 'Contrôle Interne',
    labelEn: 'Internal Control',
    keywords: [
      { id: 'ci-01', keyword: 'Contrôle interne', domain: 'controle_interne' },
      { id: 'ci-02', keyword: '3 Lignes de défense', domain: 'controle_interne' },
      { id: 'ci-03', keyword: 'Circulaire BCEAO 03-2017', domain: 'controle_interne' },
      { id: 'ci-04', keyword: 'Circulaire BCEAO 01-2017', domain: 'controle_interne' },
      { id: 'ci-05', keyword: 'Dispositif de contrôle permanent', domain: 'controle_interne' },
      { id: 'ci-06', keyword: 'Audit interne', domain: 'controle_interne' },
      { id: 'ci-07', keyword: 'Fonction conformité', domain: 'controle_interne' },
      { id: 'ci-08', keyword: 'Gestion des risques', domain: 'controle_interne' },
      { id: 'ci-09', keyword: 'Cartographie des risques', domain: 'controle_interne' },
      { id: 'ci-10', keyword: 'Rapport de contrôle interne', domain: 'controle_interne' },
      { id: 'ci-11', keyword: 'COSO', domain: 'controle_interne' },
    ],
  },
  {
    id: 'bceao',
    icon: 'ri-bank-line',
    labelFr: 'BCEAO / UEMOA',
    labelEn: 'BCEAO / WAEMU',
    keywords: [
      { id: 'bceao-01', keyword: 'BCEAO', domain: 'bceao' },
      { id: 'bceao-02', keyword: 'UEMOA', domain: 'bceao' },
      { id: 'bceao-03', keyword: 'Instruction BCEAO', domain: 'bceao' },
      { id: 'bceao-04', keyword: 'Circulaire BCEAO', domain: 'bceao' },
      { id: 'bceao-05', keyword: 'Agrément SFD BCEAO', domain: 'bceao' },
      { id: 'bceao-06', keyword: 'Ratios prudentiels BCEAO', domain: 'bceao' },
      { id: 'bceao-07', keyword: 'Reporting périodique BCEAO', domain: 'bceao' },
      { id: 'bceao-08', keyword: 'Plan comptable SFD', domain: 'bceao' },
      { id: 'bceao-09', keyword: 'REFI — Référentiel IFRS', domain: 'bceao' },
      { id: 'bceao-10', keyword: 'Ratio de solvabilité UEMOA', domain: 'bceao' },
      { id: 'bceao-11', keyword: 'Inspection BCEAO', domain: 'bceao' },
      { id: 'bceao-12', keyword: 'Dispositif prudentiel BCEAO', domain: 'bceao' },
    ],
  },
  {
    id: 'cobac',
    icon: 'ri-bank-card-line',
    labelFr: 'COBAC / CEMAC',
    labelEn: 'COBAC / CEMAC',
    keywords: [
      { id: 'cobac-01', keyword: 'COBAC', domain: 'cobac' },
      { id: 'cobac-02', keyword: 'CEMAC', domain: 'cobac' },
      { id: 'cobac-03', keyword: 'BEAC', domain: 'cobac' },
      { id: 'cobac-04', keyword: 'COBAC CO-2024-02', domain: 'cobac' },
      { id: 'cobac-05', keyword: 'Réglementation COBAC', domain: 'cobac' },
      { id: 'cobac-06', keyword: 'Agrément CEMAC', domain: 'cobac' },
      { id: 'cobac-07', keyword: 'Établissement de crédit CEMAC', domain: 'cobac' },
      { id: 'cobac-08', keyword: 'Microfinance CEMAC', domain: 'cobac' },
      { id: 'cobac-09', keyword: 'Inspection COBAC', domain: 'cobac' },
      { id: 'cobac-10', keyword: 'Gouvernance SFD CEMAC', domain: 'cobac' },
    ],
  },
  {
    id: 'agrement',
    icon: 'ri-award-line',
    labelFr: 'Agrément & Régulation',
    labelEn: 'Licensing & Regulation',
    keywords: [
      { id: 'agr-01', keyword: 'Agrément', domain: 'agrement' },
      { id: 'agr-02', keyword: 'Retrait d\'agrément', domain: 'agrement' },
      { id: 'agr-03', keyword: 'Conditions d\'agrément SFD', domain: 'agrement' },
      { id: 'agr-04', keyword: 'Dossier d\'agrément', domain: 'agrement' },
      { id: 'agr-05', keyword: 'Établissement de paiement', domain: 'agrement' },
      { id: 'agr-06', keyword: 'Fintech', domain: 'agrement' },
      { id: 'agr-07', keyword: 'Régulation fintech UEMOA', domain: 'agrement' },
      { id: 'agr-08', keyword: 'Instruction 004-2010 BCEAO', domain: 'agrement' },
      { id: 'agr-09', keyword: 'Modification statutaire SFD', domain: 'agrement' },
      { id: 'agr-10', keyword: 'Nationalité dirigeants SFD', domain: 'agrement' },
    ],
  },
  {
    id: 'risque',
    icon: 'ri-alert-line',
    labelFr: 'Risques',
    labelEn: 'Risk',
    keywords: [
      { id: 'risk-01', keyword: 'Risque de crédit', domain: 'risque' },
      { id: 'risk-02', keyword: 'Risque opérationnel', domain: 'risque' },
      { id: 'risk-03', keyword: 'Risque de liquidité', domain: 'risque' },
      { id: 'risk-04', keyword: 'Risque de taux', domain: 'risque' },
      { id: 'risk-05', keyword: 'Stress test', domain: 'risque' },
      { id: 'risk-06', keyword: 'Plan de continuité d\'activité', domain: 'risque' },
      { id: 'risk-07', keyword: 'PCA — Plan de Continuité', domain: 'risque' },
      { id: 'risk-08', keyword: 'PPR — Plan Préventif de Redressement', domain: 'risque' },
      { id: 'risk-09', keyword: 'Circulaire 001-2020 PPR', domain: 'risque' },
      { id: 'risk-10', keyword: 'Provisionnement créances', domain: 'risque' },
      { id: 'risk-11', keyword: 'IFRS 9', domain: 'risque' },
      { id: 'risk-12', keyword: 'Risque climatique', domain: 'risque' },
    ],
  },
  {
    id: 'conformite',
    icon: 'ri-scales-3-line',
    labelFr: 'Conformité & Reporting',
    labelEn: 'Compliance & Reporting',
    keywords: [
      { id: 'conf-01', keyword: 'Conformité réglementaire', domain: 'conformite' },
      { id: 'conf-02', keyword: 'Reporting réglementaire', domain: 'conformite' },
      { id: 'conf-03', keyword: 'Ratio de solvabilité', domain: 'conformite' },
      { id: 'conf-04', keyword: 'Ratio de liquidité', domain: 'conformite' },
      { id: 'conf-05', keyword: 'Fonds propres réglementaires', domain: 'conformite' },
      { id: 'conf-06', keyword: 'Normes prudentielles', domain: 'conformite' },
      { id: 'conf-07', keyword: 'Déclaration réglementaire', domain: 'conformite' },
      { id: 'conf-08', keyword: 'Reporting SFD trimestriel', domain: 'conformite' },
      { id: 'conf-09', keyword: 'Rapport annuel SFD', domain: 'conformite' },
      { id: 'conf-10', keyword: 'Commissariat aux comptes', domain: 'conformite' },
      { id: 'conf-11', keyword: 'OHADA Acte Uniforme', domain: 'conformite' },
    ],
  },
  {
    id: 'microfinance',
    icon: 'ri-hand-coin-line',
    labelFr: 'Microfinance / SFD',
    labelEn: 'Microfinance / SFD',
    keywords: [
      { id: 'mfi-01', keyword: 'SFD — Système Financier Décentralisé', domain: 'microfinance' },
      { id: 'mfi-02', keyword: 'EMF — Établissement de Microfinance', domain: 'microfinance' },
      { id: 'mfi-03', keyword: 'Microfinance UEMOA', domain: 'microfinance' },
      { id: 'mfi-04', keyword: 'Inclusion financière', domain: 'microfinance' },
      { id: 'mfi-05', keyword: 'Finance inclusive', domain: 'microfinance' },
      { id: 'mfi-06', keyword: 'Instruction SFD BCEAO', domain: 'microfinance' },
      { id: 'mfi-07', keyword: 'Finance islamique SFD', domain: 'microfinance' },
      { id: 'mfi-08', keyword: 'Digitalisation SFD', domain: 'microfinance' },
      { id: 'mfi-09', keyword: 'Avoirs dormants SFD', domain: 'microfinance' },
      { id: 'mfi-10', keyword: 'Refinancement BCEAO SFD', domain: 'microfinance' },
    ],
  },
  {
    id: 'cybersecurite',
    icon: 'ri-shield-keyhole-line',
    labelFr: 'Cybersécurité & Données',
    labelEn: 'Cybersecurity & Data',
    keywords: [
      { id: 'cyber-01', keyword: 'Cybersécurité bancaire', domain: 'cybersecurite' },
      { id: 'cyber-02', keyword: 'Protection des données personnelles', domain: 'cybersecurite' },
      { id: 'cyber-03', keyword: 'Résilience opérationnelle', domain: 'cybersecurite' },
      { id: 'cyber-04', keyword: 'DORA — Digital Operational Resilience', domain: 'cybersecurite' },
      { id: 'cyber-05', keyword: 'Directive COBAC cybersécurité', domain: 'cybersecurite' },
      { id: 'cyber-06', keyword: 'RGPD UEMOA', domain: 'cybersecurite' },
      { id: 'cyber-07', keyword: 'Sécurité des systèmes d\'information', domain: 'cybersecurite' },
      { id: 'cyber-08', keyword: 'Externalisation et Cloud', domain: 'cybersecurite' },
    ],
  },
  {
    id: 'esg',
    icon: 'ri-leaf-line',
    labelFr: 'ESG / Durabilité',
    labelEn: 'ESG / Sustainability',
    keywords: [
      { id: 'esg-01', keyword: 'ESG', domain: 'esg' },
      { id: 'esg-02', keyword: 'Durabilité', domain: 'esg' },
      { id: 'esg-03', keyword: 'ISSB', domain: 'esg' },
      { id: 'esg-04', keyword: 'Finance durable', domain: 'esg' },
      { id: 'esg-05', keyword: 'Taxonomie verte', domain: 'esg' },
      { id: 'esg-06', keyword: 'Reporting ESG', domain: 'esg' },
      { id: 'esg-07', keyword: 'Stress test climatique', domain: 'esg' },
      { id: 'esg-08', keyword: 'Risque climatique Pilier 2', domain: 'esg' },
      { id: 'esg-09', keyword: 'Matérialité ESG', domain: 'esg' },
    ],
  },
  {
    id: 'prix_transfert',
    icon: 'ri-exchange-funds-line',
    labelFr: 'Prix de Transfert',
    labelEn: 'Transfer Pricing',
    keywords: [
      { id: 'tp-01', keyword: 'Prix de transfert', domain: 'prix_transfert' },
      { id: 'tp-02', keyword: 'BEPS', domain: 'prix_transfert' },
      { id: 'tp-03', keyword: 'Documentation prix de transfert', domain: 'prix_transfert' },
      { id: 'tp-04', keyword: 'OCDE Principes', domain: 'prix_transfert' },
      { id: 'tp-05', keyword: 'Déclaration pays par pays', domain: 'prix_transfert' },
      { id: 'tp-06', keyword: 'Analyse de comparabilité', domain: 'prix_transfert' },
    ],
  },
];

export const ALL_KEYWORDS: RegulatoryKeyword[] = REGULATORY_KEYWORD_DOMAINS.flatMap((d) =>
  d.keywords.map((k) => ({ ...k, domain: d.id }))
);

export function getDomainById(id: string): KeywordDomain | undefined {
  return REGULATORY_KEYWORD_DOMAINS.find((d) => d.id === id);
}



