export interface ContentTheme {
  id: number;
  titre: string;
  cluster: string;
  keywords: string;
  cta: string;
  niveau: string;
  slug_wp: string;
  format_type: string;
  active: boolean;
  created_at: string;
}

export const CONTENT_CALENDAR_CLUSTERS = [
  'Finance', 'Conformité', 'Digital', 'Risques', 'Gouvernance',
  'Stratégie', 'ESG', 'RH', 'Juridique', 'Audit',
  'Crédit', 'Pilotage', 'Data', 'Organisation', 'Produit',
  'Impact', 'Client', 'Marketing',
];

export const CONTENT_CALENDAR_LEVELS = ['Débutant', 'Intermédiaire', 'Avancé'];

export const CONTENT_CALENDAR_FORMATS = [
  'blog', 'kbr', 'note_strategique', 'position_paper', 'etude_flash',
  'monographie', 'linkedin',
];

export const NOVEMBER_BATCH_IDS = [1, 3, 8, 9, 14, 21, 22, 31, 36, 41, 43, 55, 61, 62, 76, 79, 88, 91, 95, 100];

export const NOVEMBER_BATCH_FORMATS: Record<number, string> = {
  1: 'Blog 1500 + KBR', 3: 'Note stratégique', 8: 'Position Paper',
  9: 'KBR', 14: 'Étude flash', 21: 'Blog 1500', 22: 'KBR',
  31: 'LinkedIn + Blog', 36: 'Note stratégique', 41: 'Étude flash',
  43: 'Monographie', 55: 'Position Paper', 61: 'KBR',
  62: 'Blog 1500', 76: 'LinkedIn + Blog', 79: 'Note stratégique',
  88: 'KBR', 91: 'Étude flash', 95: 'Blog 1500', 100: 'KBR',
};

export const NOVEMBER_PUBLISH_DATE = '2026-11-08T14:00:00Z';