// =============================================================================
// KHEPRA EXPERTS — SYSTÈME DE SCORING AUTOMATIQUE DES LEADS
// Phase: Croissance Autonome B2B — Phase 1
// Objectif: Attribuer un score 0-100 et une catégorie A/B/C à chaque lead
// basé sur le profil et le comportement
// =============================================================================

export interface ScoringInput {
  fullName: string;
  email: string;
  organization?: string;
  position?: string;
  country?: string;
  sector?: string;
  formType?: string;
  leadMagnetCategory?: string;
  activities?: {
    type: string;
    count: number;
  }[];
}

export interface ScoringResult {
  score: number;
  category: 'A' | 'B' | 'C';
  breakdown: {
    profileScore: number;
    engagementScore: number;
    firmographicScore: number;
    intentScore: number;
  };
  recommendations: string[];
  priority: 'high' | 'medium' | 'low';
  estimatedValue: 'premium' | 'standard' | 'basic';
}

// =============================================================================
// PONDÉRATION
// =============================================================================

const WEIGHTS = {
  profile: 0.25,      // 25% — Qualité du profil (poste, institution)
  engagement: 0.30,     // 30% — Comportement (téléchargements, diagnostics)
  firmographic: 0.25, // 25% — Caractéristiques de l'entreprise (pays, secteur, taille)
  intent: 0.20,       // 20% — Intention (type de formulaire, urgence)
};

// =============================================================================
// SCORING PROFIL (0-25 points)
// =============================================================================

const HIGH_VALUE_POSITIONS = [
  'dg', 'directeur général', 'ceo', 'pca', 'président du conseil',
  'dga', 'directeur général adjoint', 'cfo', 'directeur financier',
  'drc', 'directeur des risques', 'investor', 'investisseur',
];

const MEDIUM_VALUE_POSITIONS = [
  'rci', 'responsable contrôle interne', 'rlbc', 'responsable lbc/ft',
  'ditc', 'directeur it', 'rh', 'drh', 'esg', 'responsable esg',
  'founder', 'fondateur', 'co-fondateur', 'admin', 'administrateur',
  'legal', 'directeur juridique', 'consultant',
];

const HIGH_VALUE_SECTORS = [
  'banque', 'sfd', 'emf', 'fintech', 'insurance', 'finance',
  'agro', 'energie', 'btp', 'sante',
];

const HIGH_VALUE_COUNTRIES = [
  'CI', 'SN', 'CM', 'BJ', 'TG', 'BF', 'ML', 'GA', 'CG',
];

function scoreProfile(input: ScoringInput): number {
  let score = 0;

  // Poste (0-10)
  const position = (input.position || '').toLowerCase();
  if (HIGH_VALUE_POSITIONS.some((p) => position.includes(p))) {
    score += 10;
  } else if (MEDIUM_VALUE_POSITIONS.some((p) => position.includes(p))) {
    score += 6;
  } else if (position) {
    score += 3;
  }

  // Organisation (0-5)
  const org = (input.organization || '').toLowerCase();
  if (org.includes('banque') || org.includes('sfd') || org.includes('emf')) {
    score += 5;
  } else if (org.length > 3) {
    score += 3;
  }

  // Email professionnel (0-5)
  const email = input.email.toLowerCase();
  const freeDomains = ['gmail', 'yahoo', 'hotmail', 'outlook', 'aol', 'icloud'];
  const isPro = !freeDomains.some((d) => email.includes(d));
  if (isPro) {
    score += 5;
  } else {
    score += 2;
  }

  // Nom complet (0-5)
  if (input.fullName && input.fullName.trim().split(' ').length >= 2) {
    score += 5;
  } else if (input.fullName) {
    score += 2;
  }

  return Math.min(score, 25);
}

// =============================================================================
// SCORING ENGAGEMENT (0-30 points)
// =============================================================================

function scoreEngagement(input: ScoringInput): number {
  let score = 0;
  const activities = input.activities || [];

  // Nombre total d'activités (0-10)
  const totalActivities = activities.reduce((sum, a) => sum + a.count, 0);
  if (totalActivities >= 5) {
    score += 10;
  } else if (totalActivities >= 3) {
    score += 7;
  } else if (totalActivities >= 1) {
    score += 4;
  }

  // Types d'activités (0-10)
  const hasDownload = activities.some((a) => a.type === 'download');
  const hasDiagnostic = activities.some((a) => a.type === 'diagnostic_complete');
  const hasEmailClick = activities.some((a) => a.type === 'email_click');
  const hasPageView = activities.some((a) => a.type === 'page_view');

  if (hasDiagnostic) {
    score += 5;
  }
  if (hasDownload) {
    score += 3;
  }
  if (hasEmailClick) {
    score += 2;
  }

  // Fréquence (0-10)
  const uniqueTypes = activities.length;
  if (uniqueTypes >= 4) {
    score += 10;
  } else if (uniqueTypes >= 3) {
    score += 7;
  } else if (uniqueTypes >= 2) {
    score += 4;
  } else if (uniqueTypes >= 1) {
    score += 2;
  }

  return Math.min(score, 30);
}

// =============================================================================
// SCORING FIRMOGRAPHIC (0-25 points)
// =============================================================================

function scoreFirmographic(input: ScoringInput): number {
  let score = 0;

  // Pays (0-8)
  const country = (input.country || '').toUpperCase();
  if (HIGH_VALUE_COUNTRIES.includes(country)) {
    score += 8;
  } else if (country) {
    score += 4;
  }

  // Secteur (0-8)
  const sector = (input.sector || '').toLowerCase();
  if (HIGH_VALUE_SECTORS.some((s) => sector.includes(s))) {
    score += 8;
  } else if (sector) {
    score += 4;
  }

  // Type de formulaire (0-9)
  const formType = (input.formType || '').toLowerCase();
  const leadMagnetCategory = (input.leadMagnetCategory || '').toLowerCase();

  if (formType.includes('diagnostic') || leadMagnetCategory.includes('diagnostic')) {
    score += 9;
  } else if (formType.includes('dd') || leadMagnetCategory.includes('due')) {
    score += 8;
  } else if (formType.includes('guide') || leadMagnetCategory.includes('finance')) {
    score += 7;
  } else if (formType.includes('checklist') || leadMagnetCategory.includes('conformite')) {
    score += 6;
  } else if (formType) {
    score += 3;
  }

  return Math.min(score, 25);
}

// =============================================================================
// SCORING INTENTION (0-20 points)
// =============================================================================

function scoreIntent(input: ScoringInput): number {
  let score = 0;
  const formType = (input.formType || '').toLowerCase();
  const leadMagnetCategory = (input.leadMagnetCategory || '').toLowerCase();

  // Urgence perçue (0-10)
  const urgentIndicators = [
    'dd', 'due-diligence', 'audit', 'diagnostic', 'risque',
    'conformite', 'inspection', 'sanction',
  ];
  if (urgentIndicators.some((i) => formType.includes(i) || leadMagnetCategory.includes(i))) {
    score += 10;
  } else if (formType.includes('guide') || formType.includes('template')) {
    score += 5;
  }

  // Préparation investisseur (0-5)
  const investorIndicators = [
    'fonds', 'investissement', 'investor', 'levée', 'readiness',
    'valuation', 'pitch',
  ];
  if (investorIndicators.some((i) => formType.includes(i) || leadMagnetCategory.includes(i))) {
    score += 5;
  }

  // ESG / DFI (0-5)
  const esgIndicators = ['esg', 'rse', 'durable', 'impact', 'ifc', 'gri'];
  if (esgIndicators.some((i) => formType.includes(i) || leadMagnetCategory.includes(i))) {
    score += 5;
  }

  return Math.min(score, 20);
}

// =============================================================================
// FONCTION PRINCIPALE
// =============================================================================

export function calculateLeadScore(input: ScoringInput): ScoringResult {
  const profileScore = scoreProfile(input);
  const engagementScore = scoreEngagement(input);
  const firmographicScore = scoreFirmographic(input);
  const intentScore = scoreIntent(input);

  // Score pondéré (0-100)
  const score = Math.round(
    profileScore * WEIGHTS.profile +
    engagementScore * WEIGHTS.engagement +
    firmographicScore * WEIGHTS.firmographic +
    intentScore * WEIGHTS.intent
  );

  // Catégorie
  let category: 'A' | 'B' | 'C';
  if (score >= 70) {
    category = 'A';
  } else if (score >= 45) {
    category = 'B';
  } else {
    category = 'C';
  }

  // Priorité
  let priority: 'high' | 'medium' | 'low';
  if (score >= 75 && engagementScore >= 15) {
    priority = 'high';
  } else if (score >= 50 || engagementScore >= 10) {
    priority = 'medium';
  } else {
    priority = 'low';
  }

  // Valeur estimée
  let estimatedValue: 'premium' | 'standard' | 'basic';
  if (score >= 70 && profileScore >= 20) {
    estimatedValue = 'premium';
  } else if (score >= 50) {
    estimatedValue = 'standard';
  } else {
    estimatedValue = 'basic';
  }

  // Recommandations
  const recommendations: string[] = [];
  if (profileScore < 15) {
    recommendations.push('Demander plus d\'informations sur le poste et l\'institution');
  }
  if (engagementScore < 10) {
    recommendations.push('Relancer avec contenu de valeur pour stimuler l\'engagement');
  }
  if (firmographicScore < 15) {
    recommendations.push('Qualifier le pays et le secteur pour affiner le scoring');
  }
  if (intentScore < 10) {
    recommendations.push('Nurturer avec séquence éducative sur les problématiques métier');
  }
  if (score >= 70) {
    recommendations.push('LEAD CHAUD — Contacter sous 24h avec proposition personnalisée');
  } else if (score >= 50) {
    recommendations.push('Lead qualifié — Proposer un diagnostic ou un appel de 15 min');
  }

  return {
    score,
    category,
    breakdown: {
      profileScore,
      engagementScore,
      firmographicScore,
      intentScore,
    },
    recommendations,
    priority,
    estimatedValue,
  };
}

// =============================================================================
// UTILITAIRES
// =============================================================================

export function getCategoryLabel(category: 'A' | 'B' | 'C'): string {
  switch (category) {
    case 'A':
      return 'Lead Chaud';
    case 'B':
      return 'Lead Qualifié';
    case 'C':
      return 'Lead à Nurturer';
  }
}

export function getCategoryColor(category: 'A' | 'B' | 'C'): string {
  switch (category) {
    case 'A':
      return '#ef4444'; // Rouge
    case 'B':
      return '#f59e0b'; // Ambre
    case 'C':
      return '#6b7280'; // Gris
  }
}

export function getPriorityLabel(priority: 'high' | 'medium' | 'low'): string {
  switch (priority) {
    case 'high':
      return 'Priorité Haute — Contacter sous 24h';
    case 'medium':
      return 'Priorité Moyenne — Relancer sous 48h';
    case 'low':
      return 'Priorité Basse — Nurturer';
  }
}

export function getEstimatedValueLabel(value: 'premium' | 'standard' | 'basic'): string {
  switch (value) {
    case 'premium':
      return 'Valeur Premium — Mission > 50M FCFA';
    case 'standard':
      return 'Valeur Standard — Mission 15-50M FCFA';
    case 'basic':
      return 'Valeur Basique — Mission < 15M FCFA';
  }
}

// =============================================================================
// HOOK REACT
// =============================================================================

import { useState, useCallback } from 'react';

export function useLeadScoring() {
  const [result, setResult] = useState<ScoringResult | null>(null);
  const [loading, setLoading] = useState(false);

  const score = useCallback((input: ScoringInput) => {
    setLoading(true);
    // Simulation async pour la UX
    setTimeout(() => {
      const scoringResult = calculateLeadScore(input);
      setResult(scoringResult);
      setLoading(false);
    }, 500);
  }, []);

  return { score, result, loading };
}