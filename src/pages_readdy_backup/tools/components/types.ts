import type { ReactNode } from 'react';

export interface DiagnosticOption {
  value: number;
  labelFr: string;
  labelEn: string;
  regulationRef?: string;
}

export interface DiagnosticQuestion {
  id: string;
  questionFr: string;
  questionEn: string;
  options: DiagnosticOption[];
  axisId?: string;
  sectionId?: string;
}

export interface DiagnosticAxisConfig {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  icon: string;
  color: string;
  questions: DiagnosticQuestion[];
  weight?: number;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface LeadFormFields {
  name: string;
  email: string;
  organization: string;
  position: string;
  phone: string;
}

export interface ComparisonConfig {
  storageKey: string;
  getDeltaLabel: (delta: number, lang: string) => string;
  getDeltaColor: (delta: number) => string;
  getDeltaIcon: (delta: number) => string;
}

export interface ExpertCTA {
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  ctaFr: string;
  ctaEn: string;
  ctaLink: string;
}

export interface UltraClosingMessage {
  title: string;
  subtitle: string;
  cta: string;
}

export interface DiagnosticToolConfig {
  // Identity
  toolId: string;
  toolNameFr: string;
  toolNameEn: string;
  toolSubtitleFr?: string;
  toolSubtitleEn?: string;

  // SEO
  seoTitleFr: string;
  seoTitleEn: string;
  seoDescriptionFr: string;
  seoDescriptionEn: string;
  seoKeywordsFr: string;
  seoKeywordsEn: string;
  canonicalPath: string;

  // Axes & Questions
  axes: DiagnosticAxisConfig[];

  // HowTo Schema
  howToNameFr: string;
  howToNameEn: string;
  howToDescriptionFr: string;
  howToDescriptionEn: string;
  howToTotalTime: string;
  howToSteps: HowToStep[];

  // Scoring (called with (score, lang))
  getScoreColor: (score: number) => string;
  getScoreLabel: (score: number, lang: string) => string;
  getMaturityLevel: (score: number, lang: string) => string;
  getReadinessIndicator: (score: number, lang: string) => string;

  // Results rendering (called with (perAxis, globalScore, lang))
  getRisks: (perAxis: Record<string, number>, globalScore: number, lang: string) => (string | { fr: string; en: string })[];
  getRecommendations: (perAxis: Record<string, number>, globalScore: number, lang: string) => { title: string; axis?: string; items: string[] }[];

  // Option styling
  getOptionStyle: (value: number, isSelected: boolean) => string;
  getOptionIcon: (value: number) => string;
  getOptionColor: (value: number) => string;

  // Lead form
  showLeadForm: boolean;
  formUrl?: string;

  // Social share
  hashtags?: string[];

  // Custom rendering slots
  renderRadarChart?: (size: number, perAxis: Record<string, number>, axes: DiagnosticAxisConfig[], isFr: boolean) => ReactNode;
  renderAboveResults?: (globalScore: number, perAxis: Record<string, number>, isFr: boolean) => ReactNode;
  renderBelowResults?: (globalScore: number, perAxis: Record<string, number>, isFr: boolean) => ReactNode;

  // Comparison (baseline tracking)
  comparison?: ComparisonConfig;

  // Expert CTA section (shown below recommendations)
  expertCTA?: ExpertCTA;

  // Ultra Closing CTA (big emotional callout above expert CTA)
  ultraClosing?: {
    getMessage: (score: number, lang: string) => UltraClosingMessage;
  };

  // Optional customization
  showRadarChart?: boolean;
  badgeIcon?: string;
  badgeTextFr?: string;
  badgeTextEn?: string;
  userInfoPreQuestionnaire?: boolean;
}



