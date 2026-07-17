/**
 * Statistiques officielles unifiées de KHEPRA EXPERTS
 * Source unique de vérité pour tous les chiffres clés du cabinet
 */

export interface Stat {
  value: number;
  suffix: string;
  labelFr: string;
  labelEn: string;
  subLabelFr?: string;
  subLabelEn?: string;
}

/**
 * Chiffres clés officiels du cabinet
 */
export const officialStats: Stat[] = [
  {
    value: 22,
    suffix: '+',
    labelFr: "Années d'expérience",
    labelEn: 'Years of Experience',
    subLabelFr: 'Depuis 2003',
    subLabelEn: 'Since 2003'
  },
  {
    value: 50,
    suffix: '+',
    labelFr: 'Missions stratégiques',
    labelEn: 'Strategic Missions',
    subLabelFr: 'Réalisées',
    subLabelEn: 'Completed'
  },
  {
    value: 20,
    suffix: '+',
    labelFr: 'Pays couverts',
    labelEn: 'Countries Covered',
    subLabelFr: "Afrique de l'Ouest & Centrale",
    subLabelEn: 'West & Central Africa'
  },
  {
    value: 3,
    suffix: '',
    labelFr: "Pays d'exercice",
    labelEn: 'Countries of Practice',
    subLabelFr: 'Togo · Gabon · Intl',
    subLabelEn: 'Togo · Gabon · Intl'
  }
];

/**
 * Indicateurs de confiance pour le hero
 */
export const trustIndicators = [
  {
    icon: 'ri-shield-check-line',
    labelFr: 'Certifié & Agréé',
    labelEn: 'Certified & Approved'
  },
  {
    icon: 'ri-global-line',
    labelFr: '20+ pays en Afrique',
    labelEn: '20+ countries in Africa'
  },
  {
    icon: 'ri-award-line',
    labelFr: "22 ans d'expérience",
    labelEn: '22 years of experience'
  }
];