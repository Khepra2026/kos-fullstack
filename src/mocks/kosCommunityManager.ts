export interface SocialPost {
  id: string;
  platform: 'youtube' | 'linkedin' | 'x' | 'instagram';
  content: string;
  publishedAt: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    impressions: number;
  };
  comments: CommunityComment[];
  status: 'published' | 'scheduled' | 'draft';
  leadDetected?: boolean;
}

export interface CommunityComment {
  id: string;
  author: string;
  content: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'negative' | 'question';
  leadPotential: 'high' | 'medium' | 'low' | 'none';
  replied: boolean;
  replyContent?: string;
}

export interface CalendarEntry {
  day: number;
  platform: string;
  postType: string;
  content: string;
  bestTime: string;
  hashtags: string[];
}

export interface LeadOpportunity {
  id: string;
  source: string;
  author: string;
  company?: string;
  position?: string;
  comment: string;
  detectedAt: string;
  potential: 'high' | 'medium' | 'low';
  sector: string;
  serviceRecommended: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
}

export const ACTIVE_CAMPAIGNS = [
  {
    id: 'camp-001',
    name: 'Lancement Chaîne YouTube @KHEPRAEXPERTS',
    platforms: ['youtube', 'linkedin', 'x'],
    startDate: '2026-06-01',
    endDate: '2026-07-31',
    totalPosts: 48,
    publishedPosts: 22,
    totalEngagement: 12580,
  },
  {
    id: 'camp-002',
    name: 'Série Gouvernance Bancaire UEMOA',
    platforms: ['linkedin', 'x', 'instagram'],
    startDate: '2026-06-10',
    endDate: '2026-08-15',
    totalPosts: 36,
    publishedPosts: 14,
    totalEngagement: 8940,
  },
  {
    id: 'camp-003',
    name: 'Club Experts — Interviews Décideurs',
    platforms: ['youtube', 'linkedin'],
    startDate: '2026-06-15',
    endDate: '2026-09-30',
    totalPosts: 24,
    publishedPosts: 6,
    totalEngagement: 4320,
  },
];

export const ENGAGEMENT_KPIS = {
  totalComments: 347,
  avgResponseTime: '2h 14min',
  responseRate: 94,
  positiveSentiment: 72,
  neutralSentiment: 20,
  negativeSentiment: 8,
  leadsDetected: 28,
  leadsQualified: 12,
  leadsConverted: 4,
};

export const RECENT_COMMENTS: CommunityComment[] = [
  {
    id: 'cmt-001',
    author: 'Amadou Konaté',
    content: 'Analyse très pertinente sur la circulaire BCEAO. Nous sommes en pleine mise en conformité, ce contenu tombe à point nommé.',
    date: '2026-06-19T08:45:00Z',
    sentiment: 'positive',
    leadPotential: 'high',
    replied: true,
    replyContent: 'Merci pour votre retour Amadou. Nous proposons un accompagnement complet pour la mise en conformité BCEAO — n\'hésitez pas à nous contacter pour en discuter.',
  },
  {
    id: 'cmt-002',
    author: 'Fatou Diop',
    content: 'Quelle est la date d\'entrée en vigueur exacte de cette nouvelle exigence de fonds propres ?',
    date: '2026-06-19T07:30:00Z',
    sentiment: 'question',
    leadPotential: 'medium',
    replied: true,
    replyContent: 'Bonjour Fatou, l\'entrée en vigueur est prévue pour le 1er janvier 2027 avec une période transitoire de 18 mois. Nous publierons un guide détaillé prochainement.',
  },
  {
    id: 'cmt-003',
    author: 'Jean-Marc Bemba',
    content: 'Enfin un contenu qui parle concrètement aux réalités des SFD en zone UEMOA. Bravo.',
    date: '2026-06-18T15:20:00Z',
    sentiment: 'positive',
    leadPotential: 'medium',
    replied: false,
  },
  {
    id: 'cmt-004',
    author: 'Directeur Conformité — Banque Atlantique',
    content: 'Nous recherchons un cabinet pour un audit pré-inspection BCEAO. Votre contenu démontre une réelle expertise. Pouvons-nous échanger ?',
    date: '2026-06-18T11:10:00Z',
    sentiment: 'positive',
    leadPotential: 'high',
    replied: true,
    replyContent: 'Bonjour, merci pour votre confiance. Notre équipe vous contactera dans les plus brefs délais pour organiser un échange. Vous pouvez également nous écrire à contact@khepraexperts.com.',
  },
  {
    id: 'cmt-005',
    author: 'Pierre T.',
    content: 'Le ton est trop institutionnel, ça manque de concret. Donnez des exemples chiffrés.',
    date: '2026-06-17T19:45:00Z',
    sentiment: 'negative',
    leadPotential: 'none',
    replied: true,
    replyContent: 'Merci pour votre retour constructif Pierre. Nous prenons note et intégrerons davantage d\'exemples chiffrés dans nos prochains contenus.',
  },
  {
    id: 'cmt-006',
    author: 'Marie Kouassi — DG Microfinance',
    content: 'Superbe initiative ! Nous suivons votre chaîne depuis le début. Est-ce que vous proposez des formations en ligne ?',
    date: '2026-06-17T14:00:00Z',
    sentiment: 'positive',
    leadPotential: 'high',
    replied: false,
  },
];

export const LEAD_OPPORTUNITIES: LeadOpportunity[] = [
  {
    id: 'lead-001',
    source: 'YouTube Commentaire',
    author: 'Directeur Conformité — Banque Atlantique',
    comment: 'Nous recherchons un cabinet pour un audit pré-inspection BCEAO.',
    detectedAt: '2026-06-18T11:10:00Z',
    potential: 'high',
    sector: 'Banque',
    serviceRecommended: 'Audit Pré-Inspection BCEAO',
    status: 'new',
  },
  {
    id: 'lead-002',
    source: 'YouTube Commentaire',
    author: 'Marie Kouassi — DG Microfinance',
    comment: 'Est-ce que vous proposez des formations en ligne ?',
    detectedAt: '2026-06-17T14:00:00Z',
    potential: 'high',
    sector: 'Microfinance',
    serviceRecommended: 'Formation Conformité',
    status: 'new',
  },
  {
    id: 'lead-003',
    source: 'LinkedIn Commentaire',
    author: 'Amadou Konaté',
    company: 'Groupe Bancaire Ouest-Africain',
    position: 'Responsable Conformité',
    comment: 'Nous sommes en pleine mise en conformité, ce contenu tombe à point nommé.',
    detectedAt: '2026-06-19T08:45:00Z',
    potential: 'high',
    sector: 'Banque',
    serviceRecommended: 'Diagnostic Conformité',
    status: 'contacted',
  },
  {
    id: 'lead-004',
    source: 'LinkedIn Message',
    author: 'CFO — Fintech CEMAC',
    comment: 'Votre analyse sur les stress tests climatiques est excellente. Nous avons besoin d\'un accompagnement.',
    detectedAt: '2026-06-16T09:30:00Z',
    potential: 'high',
    sector: 'Fintech',
    serviceRecommended: 'ESG & Stress Tests',
    status: 'qualified',
  },
  {
    id: 'lead-005',
    source: 'X (Twitter)',
    author: 'Consultant Indépendant',
    comment: 'Intéressant. Connaissez-vous des SFD qui ont déjà implémenté ces recommandations ?',
    detectedAt: '2026-06-15T16:20:00Z',
    potential: 'low',
    sector: 'Microfinance',
    serviceRecommended: 'Conseil Stratégique SFD',
    status: 'closed',
  },
];

export const RESPONSE_TEMPLATES = [
  {
    id: 'tmpl-001',
    name: 'Accusé réception + redirection',
    trigger: 'commentaire_positif',
    content: 'Merci pour votre retour ! Pour approfondir ce sujet, nous vous invitons à consulter notre [ressource] ou à prendre rendez-vous pour un diagnostic personnalisé.',
  },
  {
    id: 'tmpl-002',
    name: 'Question technique — réponse experte',
    trigger: 'question_technique',
    content: 'Excellente question. Voici notre analyse détaillée sur ce point précis : [lien article]. N\'hésitez pas si vous avez d\'autres questions.',
  },
  {
    id: 'tmpl-003',
    name: 'Détection lead — engagement commercial',
    trigger: 'lead_potentiel',
    content: 'Merci pour votre intérêt. Notre équipe serait ravie d\'échanger avec vous sur vos besoins spécifiques. Écrivez-nous à contact@khepraexperts.com ou réservez un appel directement.',
  },
  {
    id: 'tmpl-004',
    name: 'Objection — réponse constructive',
    trigger: 'objection',
    content: 'Vous soulevez un point pertinent. Notre perspective s\'appuie sur [source/référence réglementaire]. Nous serions heureux d\'en discuter plus en détail avec vous.',
  },
  {
    id: 'tmpl-005',
    name: 'Commentaire négatif — désescalade',
    trigger: 'commentaire_negatif',
    content: 'Merci pour votre retour. Nous prenons vos remarques en considération pour améliorer nos contenus. N\'hésitez pas à nous partager vos attentes spécifiques.',
  },
];

export const DAILY_ACTIONS = [
  '09:00 — Répondre aux commentaires YouTube de la veille (max 2h après publication)',
  '10:00 — Interagir avec 5 posts LinkedIn de leaders d\'opinion (BCEAO, COBAC, GAFI)',
  '12:00 — Partager un article externe pertinent + commentaire expert sur LinkedIn',
  '14:00 — Vérifier les mentions X (Twitter) et répondre aux questions',
  '16:00 — Analyser les tendances d\'engagement de la journée',
  '17:00 — Qualifier les nouveaux leads détectés et transmettre à l\'équipe commerciale',
  '18:00 — Préparer le planning du lendemain',
];

export const PLATFORM_HEALTH = {
  youtube: { followers: 1240, growth: '+18%', engagement: '4.2%', postsThisMonth: 8, status: 'growing' },
  linkedin: { followers: 3840, growth: '+12%', engagement: '5.7%', postsThisMonth: 22, status: 'strong' },
  x: { followers: 890, growth: '+24%', engagement: '3.1%', postsThisMonth: 16, status: 'growing' },
  instagram: { followers: 560, growth: '+31%', engagement: '6.8%', postsThisMonth: 10, status: 'emerging' },
};