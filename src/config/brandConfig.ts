/**
 * KHEPRA EXPERTS — Brand Configuration
 * Configuration centralisée du branding institutionnel
 * Utilisée par les Edge Functions et le frontend pour garantir la cohérence
 */

export interface BrandColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  secondaryDark: string;
  accent: string;
  accentDark: string;
  background: string;
  backgroundAlt: string;
  surface: string;
  surfaceDark: string;
  text: string;
  textMuted: string;
  textLight: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
}

export interface BrandTypography {
  heading: string;
  body: string;
  label: string;
  mono: string;
}

export interface BrandIdentity {
  name: string;
  tagline: string;
  taglineFr: string;
  taglineEn: string;
  logo: string;
  logoAlt: string;
  favicon: string;
  founded: string;
  siren: string;
  siret: string;
  ape: string;
}

export interface BrandContact {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  phoneFormatted: string;
  email: string;
  website: string;
  websiteUrl: string;
  calendlyUrl: string;
  linkedInUrl: string;
  hours: string;
}

export interface BrandSocial {
  linkedIn: string;
  twitter: string;
  youtube: string;
  medium: string;
}

export interface BrandConfig {
  identity: BrandIdentity;
  colors: BrandColors;
  typography: BrandTypography;
  contact: BrandContact;
  social: BrandSocial;
  email: {
    fromName: string;
    fromEmail: string;
    replyTo: string;
    bcc: string;
  };
  legal: {
    confidentialityNotice: string;
    gdprNotice: string;
    unsubscribeText: string;
  };
  proposals: {
    currency: string;
    defaultDuration: number;
    paymentTerms: string;
    validityDays: number;
  };
  pipeline: {
    stages: string[];
  };
  sequences: {
    maxSteps: number;
    followUp48hDelay: number;
    followUp72hDelay: number;
    defaultDelayHours: number;
  };
}

export const brandColors: BrandColors = {
  primary: '#c19a6b',
  primaryDark: '#a47c48',
  primaryLight: '#d4b896',
  secondary: '#1a1a1a',
  secondaryDark: '#0f0f0f',
  accent: '#0d9488',
  accentDark: '#0f766e',
  background: '#faf9f7',
  backgroundAlt: '#f5f3f0',
  surface: '#ffffff',
  surfaceDark: '#f0eee9',
  text: '#1a1a1a',
  textMuted: '#6b6b6b',
  textLight: '#9a9a9a',
  border: '#e5e3df',
  success: '#059669',
  warning: '#d97706',
  danger: '#dc2626',
  info: '#2563eb',
};

export const brandTypography: BrandTypography = {
  heading: "'Space Grotesk', sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
  label: "'Inter', system-ui, -apple-system, sans-serif",
  mono: "'SF Mono', 'Fira Code', monospace",
};

export const brandIdentity: BrandIdentity = {
  name: 'KHEPRA EXPERTS',
  tagline: 'Gouvernance, Conformité & Investment Advisory — Afrique francophone',
  taglineFr: 'Cabinet de conseil en conformité réglementaire, gouvernance et levée de fonds',
  taglineEn: 'Governance, Compliance & Investment Advisory for francophone Africa',
  logo: 'KHEPRA EXPERTS',
  logoAlt: 'KHEPRA EXPERTS — Logo',
  favicon: '/favicon.ico',
  founded: '2002',
  siren: 'TG-LFW-01-2026-B13-01347',
  siret: 'TG-LFW-01-2026-B13-01347',
  ape: 'Conseil stratégique & conformité réglementaire',
};

export const brandContact: BrandContact = {
  address: 'LOGOGOMÈ, Rue CARREFOUR AISED',
  city: 'Lomé',
  postalCode: '',
  country: 'Togo',
  phone: '+22893984909',
  phoneFormatted: '+228 93 98 49 09',
  email: 'contact@khepraexperts.com',
  website: 'khepraexperts.com',
  websiteUrl: 'https://khepraexperts.com',
  calendlyUrl: 'https://calendly.com/essochamanu/consultation-strategique-30min',
  linkedInUrl: 'https://www.linkedin.com/company/khepra-experts',
  hours: 'Lun–Ven 8h00–18h00 WAT',
};

export const brandSocial: BrandSocial = {
  linkedIn: 'https://www.linkedin.com/company/khepra-experts',
  twitter: 'https://x.com/KhepraExperts',
  youtube: 'https://www.youtube.com/@KhepraExperts',
  medium: 'https://medium.com/@KhepraExperts',
};

export const brandEmail = {
  fromName: 'KHEPRA EXPERTS',
  fromEmail: 'contact@khepraexperts.com',
  replyTo: 'contact@khepraexperts.com',
  bcc: 'contact@khepraexperts.com',
};

export const brandLegal = {
  confidentialityNotice:
    'Ce message et toutes les pièces jointes sont confidentiels et établis à l\'intention exclusive de leur destinataire.',
  gdprNotice:
    'Conformément au RGPD, vos données sont traitées avec la plus stricte confidentialité. Pour exercer vos droits, contactez-nous à contact@khepraexperts.com.',
  unsubscribeText:
    'Vous recevez cet email car vous avez téléchargé une ressource ou demandé un contact. Pour vous désinscrire, cliquez ici :',
};

export const brandProposals = {
  currency: 'EUR',
  defaultDuration: 30,
  paymentTerms: '50% à la signature, 50% à la livraison des livrables finaux',
  validityDays: 30,
};

export const brandPipeline = {
  stages: [
    'lead_generated',
    'lead_qualified',
    'contact_engaged',
    'lead_hot',
    'meeting_scheduled',
    'proposal_sent',
    'mission_signed',
    'mission_in_progress',
    'client_active',
    'client_recurring',
  ],
};

export const brandSequences = {
  maxSteps: 7,
  followUp48hDelay: 48,
  followUp72hDelay: 72,
  defaultDelayHours: 24,
};

export const brandConfig: BrandConfig = {
  identity: brandIdentity,
  colors: brandColors,
  typography: brandTypography,
  contact: brandContact,
  social: brandSocial,
  email: brandEmail,
  legal: brandLegal,
  proposals: brandProposals,
  pipeline: brandPipeline,
  sequences: brandSequences,
};

export default brandConfig;