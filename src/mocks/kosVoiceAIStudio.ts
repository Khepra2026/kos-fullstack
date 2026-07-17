export interface VoiceProfile {
  id: string;
  name: string;
  description: string;
  gender: 'masculin' | 'feminin';
  tone: 'expert' | 'analyste' | 'institutionnel' | 'interview' | 'pédagogique';
  accent: string;
  languages: string[];
  sampleText: string;
  icon: string;
  color: string;
}

export interface GeneratedVoice {
  id: string;
  title: string;
  profileId: string;
  profileName: string;
  scriptPreview: string;
  duration: string;
  fileSize: string;
  format: string;
  status: 'completed' | 'generating' | 'failed';
  generatedAt: string;
  youtubeVideoRef?: string;
}

export const VOICE_PROFILES: VoiceProfile[] = [
  // ─── PROFILS OFFICIELS KHEPRA EXPERTS ───
  {
    id: 'vp-celestin-koffi',
    name: 'Dr. Célestin Koffi — Expert Institutionnel',
    description: 'Voix signature KHEPRA EXPERTS. Autorité naturelle, timbre profond et posé. Idéal pour les analyses réglementaires majeures, rapports de gouvernance, discours institutionnels. Le standard Big Four KHEPRA.',
    gender: 'masculin',
    tone: 'expert',
    accent: 'Français Afrique francophone — UEMOA',
    languages: ['Français', 'Anglais'],
    sampleText: 'La réforme du ratio de solvabilité UEMOA 2026 constitue l\'évolution réglementaire la plus significative pour le secteur bancaire ouest-africain depuis deux décennies.',
    icon: 'ri-mic-fill',
    color: '#86BC25',
  },
  {
    id: 'vp-fatoumata-diallo',
    name: 'Fatoumata Diallo — Analyste Conformité',
    description: 'Voix signature KHEPRA EXPERTS. Diction précise, rythme contrôlé, crédibilité immédiate. Parfaite pour les décryptages LBC/FT, compliance, audit interne et études de cas.',
    gender: 'feminin',
    tone: 'analyste',
    accent: 'Français international — CEMAC',
    languages: ['Français', 'Anglais'],
    sampleText: 'L\'analyse des 40 recommandations GAFI 2026 révèle trois facteurs critiques de non-conformité qui impactent directement la notation prudentielle des établissements financiers.',
    icon: 'ri-mic-fill',
    color: '#C2410C',
  },
  {
    id: 'vp-aminata-sow',
    name: 'Aminata Sow — Experte ESG & Finance Durable',
    description: 'Voix signature KHEPRA EXPERTS. Ton engagé et inspirant, idéal pour les thématiques ESG, transformation institutionnelle, inclusion financière et leadership en Afrique francophone.',
    gender: 'feminin',
    tone: 'institutionnel',
    accent: 'Français Afrique francophone — CEMAC',
    languages: ['Français'],
    sampleText: 'Les stress tests climatiques imposés par la BCEAO et la COBAC redéfinissent les critères de solidité financière et ouvrent une nouvelle ère pour la finance durable en Afrique.',
    icon: 'ri-mic-fill',
    color: '#D97757',
  },
  // ─── PROFILS COMPLÉMENTAIRES ───
  {
    id: 'vp-expert-fr',
    name: 'Expert Big Four — Masculin',
    description: 'Ton grave, posé, autorité naturelle. Idéal pour les analyses réglementaires et les rapports institutionnels.',
    gender: 'masculin',
    tone: 'expert',
    accent: 'Français international (accent neutre)',
    languages: ['Français', 'Anglais'],
    sampleText: 'Dans ce rapport, nous analysons les implications de la nouvelle circulaire BCEAO sur la gouvernance des établissements financiers.',
    icon: 'ri-mic-line',
    color: '#059669',
  },
  {
    id: 'vp-interview-fr',
    name: 'Interview Dialogué — Féminin',
    description: 'Ton conversationnel, accessible sans perdre en crédibilité. Pour les formats Club Experts et interviews.',
    gender: 'feminin',
    tone: 'interview',
    accent: 'Français international',
    languages: ['Français', 'Anglais'],
    sampleText: 'Aujourd\'hui nous recevons un expert en conformité bancaire pour décrypter les dernières exigences du GAFI.',
    icon: 'ri-mic-line',
    color: '#0A66C2',
  },
  {
    id: 'vp-pedago-fr',
    name: 'Pédagogique — Masculin',
    description: 'Voix calme, débit mesuré, excellent pour les tutoriels et les guides pratiques.',
    gender: 'masculin',
    tone: 'pédagogique',
    accent: 'Français Afrique francophone',
    languages: ['Français'],
    sampleText: 'Aujourd\'hui, nous allons voir étape par étape comment préparer votre établissement à une inspection COBAC.',
    icon: 'ri-mic-line',
    color: '#7C3AED',
  },
  {
    id: 'vp-expert-en',
    name: 'Big Four Expert — English (Male)',
    description: 'Deep, authoritative voice for international regulatory analysis and English-language content.',
    gender: 'masculin',
    tone: 'expert',
    accent: 'British English',
    languages: ['Anglais', 'Français'],
    sampleText: 'The new FATF recommendations represent a paradigm shift in how financial institutions must approach AML compliance.',
    icon: 'ri-mic-line',
    color: '#4285F4',
  },
];

// ─── PROFILS VOIX OFFICIELS KHEPRA (subset pour le pipeline Big Four) ─────────
export const KHEPRA_VOICE_PROFILES = VOICE_PROFILES.filter((v) =>
  ['vp-celestin-koffi', 'vp-fatoumata-diallo', 'vp-aminata-sow'].includes(v.id),
);

// ─── Mappage audience → voix KHEPRA recommandée ──────────────────────────────
export const AUDIENCE_TO_VOICE: Record<string, string> = {
  DG_BANQUE: 'vp-celestin-koffi',
  PCA: 'vp-celestin-koffi',
  ADMINISTRATEUR: 'vp-celestin-koffi',
  COMPLIANCE_OFFICER: 'vp-fatoumata-diallo',
  RISK_MANAGER: 'vp-fatoumata-diallo',
  AUDITEUR_INTERNE: 'vp-fatoumata-diallo',
  DG_MICROFINANCE: 'vp-celestin-koffi',
  DIR_CONFORMITE: 'vp-fatoumata-diallo',
  CA_SFD: 'vp-aminata-sow',
  MINISTERE: 'vp-celestin-koffi',
  AGENCE_PUBLIQUE: 'vp-aminata-sow',
  AUTORITE_REGULATION: 'vp-celestin-koffi',
  PME: 'vp-aminata-sow',
  ETI: 'vp-celestin-koffi',
  GROUPE: 'vp-celestin-koffi',
  INVESTISSEUR: 'vp-fatoumata-diallo',
};

export const GENERATED_VOICES: GeneratedVoice[] = [
  {
    id: 'gv-001',
    title: 'Analyse : Circulaire BCEAO — Gouvernance',
    profileId: 'vp-expert-fr',
    profileName: 'Expert Big Four — Masculin',
    scriptPreview: 'Dans ce rapport, nous analysons les implications de la nouvelle circulaire BCEAO sur la gouvernance...',
    duration: '12:34',
    fileSize: '18.2 MB',
    format: 'MP3 320kbps',
    status: 'completed',
    generatedAt: '2026-06-18T14:30:00Z',
  },
  {
    id: 'gv-002',
    title: 'Décryptage : Stress Tests Climatiques',
    profileId: 'vp-analyste-fr',
    profileName: 'Analyste Senior — Féminin',
    scriptPreview: 'Les stress tests climatiques imposés par la BCEAO et la COBAC introduisent une nouvelle dimension...',
    duration: '8:17',
    fileSize: '12.4 MB',
    format: 'MP3 320kbps',
    status: 'completed',
    generatedAt: '2026-06-17T09:15:00Z',
  },
  {
    id: 'gv-003',
    title: 'KHEPRA EXPERTS — Présentation Institutionnelle',
    profileId: 'vp-instit-fr',
    profileName: 'Institutionnel KHEPRA — Masculin',
    scriptPreview: 'KHEPRA EXPERTS accompagne les institutions financières en Afrique francophone depuis plus de 22 ans...',
    duration: '6:42',
    fileSize: '10.1 MB',
    format: 'MP3 320kbps',
    status: 'completed',
    generatedAt: '2026-06-15T11:00:00Z',
  },
  {
    id: 'gv-004',
    title: 'Club Experts : LCB/FT — Nouvelles Exigences GAFI',
    profileId: 'vp-interview-fr',
    profileName: 'Interview Dialogué — Féminin',
    scriptPreview: 'Aujourd\'hui nous recevons un expert pour décrypter les dernières exigences du GAFI...',
    duration: '18:05',
    fileSize: '27.1 MB',
    format: 'MP3 320kbps',
    status: 'completed',
    generatedAt: '2026-06-14T16:45:00Z',
  },
  {
    id: 'gv-005',
    title: 'Guide Pratique : Préparer une Inspection COBAC',
    profileId: 'vp-pedago-fr',
    profileName: 'Pédagogique — Masculin',
    scriptPreview: 'Étape par étape, nous allons voir comment préparer votre établissement à une inspection COBAC...',
    duration: '15:20',
    fileSize: '23.0 MB',
    format: 'MP3 320kbps',
    status: 'generating',
    generatedAt: '2026-06-19T08:00:00Z',
  },
  {
    id: 'gv-006',
    title: 'ESG Compliance in African Banking — ISSB Standards',
    profileId: 'vp-expert-en',
    profileName: 'Big Four Expert — English (Male)',
    scriptPreview: 'The convergence of ISSB standards with BCEAO and COBAC requirements creates a unique regulatory landscape...',
    duration: '14:10',
    fileSize: '21.3 MB',
    format: 'MP3 320kbps',
    status: 'completed',
    generatedAt: '2026-06-13T10:20:00Z',
  },
];

export const STUDIO_STATS = {
  totalVoicesGenerated: 47,
  totalMinutes: 892,
  activeProfiles: VOICE_PROFILES.length,
  avgGenerationTime: '2m 34s',
  qualityScore: 94,
  languagesCovered: ['Français', 'Anglais'],
  topProfile: 'Expert Big Four — Masculin',
  lastGenerated: '2026-06-18T14:30:00Z',
};

export const PENDING_SCRIPTS = [
  {
    id: 'ps-001',
    title: 'Réforme Ratio Solvabilité UEMOA 2026',
    duration: 10,
    sections: 5,
    priority: 'high' as const,
  },
  {
    id: 'ps-002',
    title: 'Cybersécurité Bancaire — Directive COBAC 2027',
    duration: 15,
    sections: 6,
    priority: 'high' as const,
  },
  {
    id: 'ps-003',
    title: 'Finance Islamique SFD — Dispositions Générales',
    duration: 12,
    sections: 4,
    priority: 'medium' as const,
  },
];