// ============================================================================
// KOS PROPRIETARY VOICE FACTORY™ — Hub 90
// KHEPRA Voice™ — Identité Vocale Institutionnelle
// Big Four Self-Evolution Program — Voice Autonomy
// ============================================================================

// ─── VOICE IDENTITY PROFILES ────────────────────────────────────────────────

export interface ProprietaryVoiceProfile {
  id: string;
  name: string;
  description: string;
  gender: 'masculin' | 'feminin';
  tone: 'expert' | 'analyste' | 'institutionnel' | 'pédagogique';
  accent: string;
  languages: string[];
  bestFor: string[];
  clarityScore: number;
  authorityScore: number;
  warmthScore: number;
  source: 'open_source' | 'elevenlabs' | 'hybrid';
  engineModel: string;
  icon: string;
  color: string;
  sampleText: string;
  status: 'production' | 'beta' | 'development';
  dictionaries: string[];
}

export const PROPRIETARY_VOICE_PROFILES: ProprietaryVoiceProfile[] = [
  {
    id: 'khepra-celestin-koffi',
    name: 'Dr. Célestin Koffi — Voix Institutionnelle KHEPRA',
    description: 'Voix signature KHEPRA EXPERTS. Autorité naturelle, timbre profond et posé. Optimisé pour les analyses réglementaires majeures, discours institutionnels, rapports de gouvernance. Étalon de référence pour toute la production vocale KHEPRA.',
    gender: 'masculin',
    tone: 'expert',
    accent: 'Français Afrique francophone — UEMOA',
    languages: ['Français', 'Anglais'],
    bestFor: ['Analyses réglementaires', 'Discours institutionnels', 'Rapports de gouvernance', 'Keynotes', 'Vidéos YouTube — format long'],
    clarityScore: 96,
    authorityScore: 98,
    warmthScore: 72,
    source: 'hybrid',
    engineModel: 'ElevenLabs Adam (pNInz6obpgDQGcFmaJgB) + Open-source finetuning',
    icon: 'ri-mic-fill',
    color: '#86BC25',
    sampleText: 'La réforme du ratio de solvabilité UEMOA 2026 constitue l\'évolution réglementaire la plus significative pour le secteur bancaire ouest-africain depuis deux décennies. Les implications pour votre institution sont profondes et exigent une action immédiate.',
    status: 'production',
    dictionaries: ['BCEAO', 'UEMOA', 'Gouvernance', 'Finance'],
  },
  {
    id: 'khepra-fatoumata-diallo',
    name: 'Fatoumata Diallo — Analyste Conformité KHEPRA',
    description: 'Voix signature KHEPRA EXPERTS — spécialisation compliance. Diction précise, rythme contrôlé, crédibilité immédiate. Parfaite pour les décryptages LBC/FT, conformité réglementaire, audit interne, études de cas.',
    gender: 'feminin',
    tone: 'analyste',
    accent: 'Français international — CEMAC',
    languages: ['Français', 'Anglais'],
    bestFor: ['Décryptages LBC/FT', 'Conformité réglementaire', 'Audit interne', 'Études de cas', 'Formations techniques'],
    clarityScore: 98,
    authorityScore: 89,
    warmthScore: 65,
    source: 'hybrid',
    engineModel: 'ElevenLabs Nicole (jsCqWAovK2LkecY7zXl4) + Open-source finetuning',
    icon: 'ri-mic-fill',
    color: '#C2410C',
    sampleText: 'L\'analyse des 40 recommandations GAFI 2026 révèle trois facteurs critiques de non-conformité qui impactent directement la notation prudentielle des établissements financiers. Décryptage complet dans cette analyse.',
    status: 'production',
    dictionaries: ['COBAC', 'Compliance', 'Audit', 'Finance'],
  },
  {
    id: 'khepra-aminata-sow',
    name: 'Aminata Sow — Experte ESG & Finance Durable KHEPRA',
    description: 'Voix signature KHEPRA EXPERTS — spécialisation ESG. Ton engagé et inspirant, idéal pour les thématiques ESG, transformation institutionnelle, inclusion financière, leadership en Afrique francophone.',
    gender: 'feminin',
    tone: 'institutionnel',
    accent: 'Français Afrique francophone — CEMAC',
    languages: ['Français'],
    bestFor: ['ESG & Finance durable', 'Inclusion financière', 'Transformation institutionnelle', 'Podcasts', 'Livres audio'],
    clarityScore: 94,
    authorityScore: 85,
    warmthScore: 91,
    source: 'hybrid',
    engineModel: 'ElevenLabs Narrative French (MF3mGyEYCl7XYWbV9V6O) + Open-source finetuning',
    icon: 'ri-mic-fill',
    color: '#D97757',
    sampleText: 'Les stress tests climatiques imposés par la BCEAO et la COBAC redéfinissent les critères de solidité financière et ouvrent une nouvelle ère pour la finance durable en Afrique. Une opportunité historique.',
    status: 'production',
    dictionaries: ['ESG', 'Gouvernance', 'Finance'],
  },
  {
    id: 'khepra-open-source-v1',
    name: 'KHEPRA OS Voice v1 — Moteur Open-Source',
    description: 'Voix synthétique développée sur base open-source (Coqui TTS / Piper). Phase beta — modèle en cours d\'entraînement sur corpus institutionnel KHEPRA. Objectif : indépendance totale des API externes.',
    gender: 'masculin',
    tone: 'institutionnel',
    accent: 'Français international',
    languages: ['Français'],
    bestFor: ['Tests internes', 'Prototypage', 'Formations'],
    clarityScore: 72,
    authorityScore: 68,
    warmthScore: 55,
    source: 'open_source',
    engineModel: 'Coqui TTS XTTS-v2 + Fine-tuning KHEPRA Corpus (150h)',
    icon: 'ri-cpu-line',
    color: '#059669',
    sampleText: 'Ceci est une démonstration de la voix synthétique open-source KHEPRA, actuellement en phase de développement. La qualité s\'améliore à chaque itération d\'entraînement.',
    status: 'development',
    dictionaries: ['BCEAO', 'COBAC'],
  },
];

// ─── PRONUNCIATION DICTIONARIES — MÉTIER ──────────────────────────────────

export interface PronunciationEntry {
  term: string;
  phonetic: string;
  category: string;
  context: string;
  commonError: string;
  validated: boolean;
}

export interface PronunciationDictionary {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  entryCount: number;
  lastUpdated: string;
  maturity: number;
  categories: string[];
  sampleEntries: PronunciationEntry[];
}

export const PRONUNCIATION_DICTIONARIES: PronunciationDictionary[] = [
  {
    id: 'bceao',
    name: 'BCEAO',
    icon: 'ri-bank-line',
    color: 'primary',
    description: 'Dictionnaire de prononciation des termes, sigles et concepts propres à la Banque Centrale des États de l\'Afrique de l\'Ouest. Couvre les instructions, circulaires, décisions et dispositifs prudentiels.',
    entryCount: 342,
    lastUpdated: '2026-06-22',
    maturity: 95,
    categories: ['Sigles', 'Instructions', 'Circulaires', 'Dispositifs prudentiels', 'Reporting', 'Agréments'],
    sampleEntries: [
      { term: 'BCEAO', phonetic: 'bé-cé-eu-a-o', category: 'Sigles', context: 'Banque Centrale des États de l\'Afrique de l\'Ouest', commonError: 'bé-ka-o (prononciation anglicisée)', validated: true },
      { term: 'UEMOA', phonetic: 'ué-mo-a', category: 'Sigles', context: 'Union Économique et Monétaire Ouest Africaine', commonError: 'u-é-mo-a (épelé)', validated: true },
      { term: 'Instruction 003-2018', phonetic: 'instruction zéro-zéro-trois deux-mille-dix-huit', category: 'Instructions', context: 'Finance Islamique SFD', commonError: 'instruction trois deux-mille-dix-huit (omission des zéros)', validated: true },
      { term: 'Ratio de solvabilité', phonetic: 'ra-ti-o de sol-va-bi-li-té', category: 'Dispositifs prudentiels', context: 'Ratio fonds propres / risques pondérés', commonError: 'ra-cho (anglicisme)', validated: true },
      { term: 'Dispositif prudentiel', phonetic: 'dis-po-zi-tif pru-den-ci-el', category: 'Dispositifs prudentiels', context: 'Ensemble des règles de gestion des risques', commonError: 'pru-den-tiel (liaison incorrecte)', validated: true },
      { term: 'Créances en souffrance', phonetic: 'cré-ances en souf-france', category: 'Reporting', context: 'Prêts non performants (NPL)', commonError: 'sou-france (prononcé souffrance au sens médical)', validated: true },
      { term: 'LBC/FT', phonetic: 'el-bé-cé ef-té', category: 'Sigles', context: 'Lutte contre le Blanchiment de Capitaux et le Financement du Terrorisme', commonError: 'el-bi-ci (anglicisme)', validated: true },
      { term: 'AMF-UEMOA', phonetic: 'cré-pé-em-ef', category: 'Sigles', context: 'Conseil Régional de l\'Épargne Publique et des Marchés Financiers', commonError: 'cré-pe-me-fe (épellation incomplète)', validated: true },
    ],
  },
  {
    id: 'cobac',
    name: 'COBAC',
    icon: 'ri-shield-line',
    color: 'accent',
    description: 'Dictionnaire de prononciation des termes relatifs à la Commission Bancaire de l\'Afrique Centrale. Couvre les directives prudentielles, réglementation CEMAC, résilience opérationnelle, cybersécurité.',
    entryCount: 278,
    lastUpdated: '2026-06-21',
    maturity: 91,
    categories: ['Sigles', 'Directives', 'Règlements', 'Cybersécurité', 'Résilience', 'Inspection'],
    sampleEntries: [
      { term: 'COBAC', phonetic: 'co-bac', category: 'Sigles', context: 'Commission Bancaire de l\'Afrique Centrale', commonError: 'co-bake (anglicisme)', validated: true },
      { term: 'CEMAC', phonetic: 'cé-mac', category: 'Sigles', context: 'Communauté Économique et Monétaire de l\'Afrique Centrale', commonError: 'cé-maque (anglicisme)', validated: true },
      { term: 'BEAC', phonetic: 'bé-ac', category: 'Sigles', context: 'Banque des États de l\'Afrique Centrale', commonError: 'bike (anglicisme)', validated: true },
      { term: 'Règlement R-2016/01', phonetic: 'rè-gle-ment R deux-mille-seize zéro-un', category: 'Règlements', context: 'Contrôle Interne COBAC', commonError: 'R vingt-seize un (année incorrecte)', validated: true },
      { term: 'COSUMAF', phonetic: 'co-su-maf', category: 'Sigles', context: 'Commission de Surveillance du Marché Financier de l\'Afrique Centrale', commonError: 'co-sou-maf (prononciation anglicisée)', validated: true },
      { term: 'GABAC', phonetic: 'ga-bac', category: 'Sigles', context: 'Groupe d\'Action contre le Blanchiment d\'Argent en Afrique Centrale', commonError: 'ga-bake (anglicisme)', validated: true },
    ],
  },
  {
    id: 'ohada',
    name: 'OHADA',
    icon: 'ri-scales-line',
    color: 'secondary',
    description: 'Dictionnaire de prononciation des termes juridiques et comptables OHADA. Actes Uniformes, droit des sociétés, sûretés, procédures collectives, comptabilité.',
    entryCount: 215,
    lastUpdated: '2026-06-20',
    maturity: 88,
    categories: ['Actes Uniformes', 'Droit des sociétés', 'Sûretés', 'Procédures', 'Comptabilité', 'Arbitrage'],
    sampleEntries: [
      { term: 'OHADA', phonetic: 'o-a-da', category: 'Sigles', context: 'Organisation pour l\'Harmonisation en Afrique du Droit des Affaires', commonError: 'o-ha-da (aspiration du H)', validated: true },
      { term: 'AUSC-GIE', phonetic: 'a-u-es-cé gé-i-eu', category: 'Actes Uniformes', context: 'Acte Uniforme relatif au droit des Sociétés Commerciales et du Groupement d\'Intérêt Économique', commonError: 'osque-gui (contraction abusive)', validated: true },
      { term: 'CCJA', phonetic: 'cé-cé-ji-a', category: 'Sigles', context: 'Cour Commune de Justice et d\'Arbitrage', commonError: 'cé-cé-ja (prononciation anglicisée)', validated: true },
      { term: 'SYSCOHADA', phonetic: 'sis-co-a-da', category: 'Comptabilité', context: 'Système Comptable OHADA', commonError: 'si-co-a-da (première syllabe)', validated: true },
      { term: 'Procédure de règlement préventif', phonetic: 'pro-cé-dure de rè-gle-ment pré-ven-tif', category: 'Procédures', context: 'Procédure collective préventive OHADA', commonError: 'préventif (accentuation incorrecte)', validated: true },
    ],
  },
  {
    id: 'gouvernance',
    name: 'Gouvernance',
    icon: 'ri-government-line',
    color: 'primary',
    description: 'Dictionnaire des termes de gouvernance d\'entreprise, rôles du Conseil d\'Administration, comités spécialisés, administrateurs indépendants, dispositif de gouvernance BCEAO/COBAC.',
    entryCount: 187,
    lastUpdated: '2026-06-21',
    maturity: 90,
    categories: ['Rôle CA', 'Comités', 'Administrateurs', 'Reporting', 'Évaluation'],
    sampleEntries: [
      { term: 'PCA', phonetic: 'pé-cé-a', category: 'Sigles', context: 'Président du Conseil d\'Administration', commonError: 'pi-ci-èye (anglicisme)', validated: true },
      { term: 'Administrateur indépendant', phonetic: 'ad-mi-nis-tra-teur in-dé-pen-dant', category: 'Administrateurs', context: 'Membre du CA sans lien avec la direction', commonError: 'indépendant (liaison incorrecte avec le mot précédent)', validated: true },
      { term: 'Comité d\'audit', phonetic: 'co-mi-té d\'au-dit', category: 'Comités', context: 'Comité spécialisé du Conseil', commonError: 'o-dite (anglicisme)', validated: true },
      { term: 'Comité de rémunération', phonetic: 'co-mi-té de ré-mu-né-ra-tion', category: 'Comités', context: 'Comité spécialisé RH et rémunération', commonError: 'rémunération (élision du é)', validated: true },
      { term: 'Circulaire 01-2017', phonetic: 'cir-cu-laire zéro-un deux-mille-dix-sept', category: 'Reporting', context: 'Gouvernance bancaire BCEAO', commonError: 'circulaire un deux-mille-dix-sept', validated: true },
    ],
  },
  {
    id: 'audit',
    name: 'Audit & Contrôle Interne',
    icon: 'ri-find-replace-line',
    color: 'secondary',
    description: 'Dictionnaire des termes d\'audit Big Four, normes ISA, contrôle interne COSO, cartographie des risques, programmes d\'audit.',
    entryCount: 234,
    lastUpdated: '2026-06-22',
    maturity: 92,
    categories: ['Normes ISA', 'COSO', 'Méthodologie', 'Risques', 'Reporting'],
    sampleEntries: [
      { term: 'ISA 315', phonetic: 'i-es-a trois-cent-quinze', category: 'Normes ISA', context: 'Identification et évaluation des risques d\'anomalies significatives', commonError: 'i-za trois-un-cinq (anglicisme)', validated: true },
      { term: 'COSO', phonetic: 'co-zo', category: 'COSO', context: 'Committee of Sponsoring Organizations', commonError: 'co-so (épellation)', validated: true },
      { term: 'Seuil de signification', phonetic: 'seuil de si-gni-fi-ca-tion', category: 'Méthodologie', context: 'Materiality threshold en audit', commonError: 'signification (accentuation incorrecte)', validated: true },
      { term: 'Cartographie des risques', phonetic: 'car-to-gra-phie des risques', category: 'Risques', context: 'Risk mapping / heat map', commonError: 'cartographie (anglicisme risk mapping)', validated: true },
      { term: 'Rapport de commissariat aux comptes', phonetic: 'ra-pport de com-mis-sa-riat aux comptes', category: 'Reporting', context: 'Opinion d\'audit légal', commonError: 'commissariat (liaison incorrecte)', validated: true },
    ],
  },
  {
    id: 'compliance',
    name: 'Conformité & LBC/FT',
    icon: 'ri-shield-check-line',
    color: 'accent',
    description: 'Dictionnaire des termes de conformité, LBC/FT, KYC/CDD, gel des avoirs, déclaration de soupçon, sanctions internationales.',
    entryCount: 198,
    lastUpdated: '2026-06-22',
    maturity: 89,
    categories: ['LBC/FT', 'KYC/CDD', 'Sanctions', 'Déclarations', 'GAFI'],
    sampleEntries: [
      { term: 'KYC', phonetic: 'ka-i-ci', category: 'KYC/CDD', context: 'Know Your Customer — Connaissance Client', commonError: 'kik (anglicisme)', validated: true },
      { term: 'CDD', phonetic: 'cé-dé-dé', category: 'KYC/CDD', context: 'Customer Due Diligence — Devoir de vigilance', commonError: 'ci-di-di (anglicisme)', validated: true },
      { term: 'Déclaration de soupçon', phonetic: 'dé-cla-ra-tion de soup-çon', category: 'Déclarations', context: 'Suspicious Transaction Report (STR)', commonError: 'soupçon (prononcé soup-con)', validated: true },
      { term: 'GAFI', phonetic: 'ga-fi', category: 'GAFI', context: 'Groupe d\'Action Financière', commonError: 'ga-fi (anglicisme FATF)', validated: true },
      { term: 'Personne politiquement exposée', phonetic: 'per-sonne po-li-ti-que-ment ex-po-sée', category: 'LBC/FT', context: 'PEP — Politically Exposed Person', commonError: 'PEP (anglicisme)', validated: true },
      { term: 'Gel des avoirs', phonetic: 'gel des a-voirs', category: 'Sanctions', context: 'Asset freeze — sanction financière', commonError: 'gel (prononcé gèle)', validated: true },
    ],
  },
  {
    id: 'esg',
    name: 'ESG & Finance Durable',
    icon: 'ri-seedling-line',
    color: 'primary',
    description: 'Dictionnaire des termes ESG, ISSB, taxonomie verte, bilan carbone, stress tests climatiques, finance durable.',
    entryCount: 156,
    lastUpdated: '2026-06-20',
    maturity: 76,
    categories: ['ISSB', 'Taxonomie', 'Carbone', 'Climat', 'Reporting'],
    sampleEntries: [
      { term: 'ISSB', phonetic: 'i-es-es-bé', category: 'ISSB', context: 'International Sustainability Standards Board', commonError: 'i-es-es-bi (anglicisme)', validated: true },
      { term: 'IFRS S1', phonetic: 'i-ef-er-es S-un', category: 'ISSB', context: 'General Requirements for Disclosure of Sustainability-related Financial Information', commonError: 'i-fersse (contraction)', validated: true },
      { term: 'Taxonomie verte', phonetic: 'ta-xo-no-mie verte', category: 'Taxonomie', context: 'Classification des activités économiques durables', commonError: 'taxonomie (prononcé à l\'anglaise)', validated: true },
      { term: 'Scope 3', phonetic: 'scope trois', category: 'Carbone', context: 'Émissions indirectes de GES — chaîne de valeur', commonError: 'scope three (anglicisme)', validated: true },
      { term: 'Stress test climatique', phonetic: 'stress test cli-ma-tique', category: 'Climat', context: 'Simulation d\'impact du changement climatique sur le portefeuille', commonError: 'stress tes-te (anglicisme)', validated: true },
    ],
  },
  {
    id: 'finance',
    name: 'Finance & Banque',
    icon: 'ri-funds-line',
    color: 'secondary',
    description: 'Dictionnaire des termes financiers, ALM, ratios prudentiels, refinancement, gestion actif-passif, fintech.',
    entryCount: 267,
    lastUpdated: '2026-06-21',
    maturity: 87,
    categories: ['ALM', 'Ratios', 'Refinancement', 'Instruments', 'Fintech'],
    sampleEntries: [
      { term: 'ALM', phonetic: 'a-el-em', category: 'ALM', context: 'Asset and Liability Management — Gestion Actif-Passif', commonError: 'alm (prononcé comme un mot)', validated: true },
      { term: 'Ratio de liquidité', phonetic: 'ra-ti-o de li-qui-di-té', category: 'Ratios', context: 'LCR — Liquidity Coverage Ratio', commonError: 'likuidité (anglicisme)', validated: true },
      { term: 'Taux débiteur', phonetic: 'taux dé-bi-teur', category: 'Instruments', context: 'Taux d\'intérêt appliqué aux prêts', commonError: 'débiteur (accentuation)', validated: true },
      { term: 'Provisionnement IFRS 9', phonetic: 'pro-vi-sion-ne-ment i-ef-er-es neuf', category: 'Ratios', context: 'Provisionnement des pertes de crédit attendues', commonError: 'i-fersse neuf (contraction anglicisée)', validated: true },
      { term: 'Refinancement BCEAO', phonetic: 're-fi-nan-ce-ment bé-cé-eu-a-o', category: 'Refinancement', context: 'Guichet de refinancement de la banque centrale', commonError: 'refinancement (élision)', validated: true },
    ],
  },
  {
    id: 'uemoa',
    name: 'UEMOA',
    icon: 'ri-global-line',
    color: 'primary',
    description: 'Dictionnaire des termes institutionnels UEMOA, BRVM, AMF-UEMOA, intégration économique, marché financier régional.',
    entryCount: 145,
    lastUpdated: '2026-06-19',
    maturity: 82,
    categories: ['Institutions', 'Marché financier', 'Intégration', 'Politique monétaire'],
    sampleEntries: [
      { term: 'BRVM', phonetic: 'bé-er-vé-em', category: 'Marché financier', context: 'Bourse Régionale des Valeurs Mobilières', commonError: 'bé-er-vi-em (anglicisme)', validated: true },
      { term: 'Conseil des Ministres UEMOA', phonetic: 'con-seil des mi-nistres ué-mo-a', category: 'Institutions', context: 'Organe décisionnel suprême de l\'UEMOA', commonError: 'ué-mo-a (prononcé comme un mot)', validated: true },
    ],
  },
  {
    id: 'cemac',
    name: 'CEMAC',
    icon: 'ri-earth-line',
    color: 'accent',
    description: 'Dictionnaire des termes institutionnels CEMAC, BEAC, convergence macroéconomique, marché financier unifié.',
    entryCount: 112,
    lastUpdated: '2026-06-18',
    maturity: 78,
    categories: ['Institutions', 'Convergence', 'Marché unifié'],
    sampleEntries: [
      { term: 'Convergence macroéconomique', phonetic: 'con-ver-gence ma-cro-é-co-no-mique', category: 'Convergence', context: 'Critères de convergence CEMAC', commonError: 'macroéconomique (prononcé sans pause)', validated: true },
    ],
  },
];

// ─── SCRIPT NORMALIZATION ENGINE ───────────────────────────────────────────

export interface ScriptTemplate {
  id: string;
  name: string;
  type: 'video' | 'podcast' | 'voiceover' | 'audiobook' | 'training';
  icon: string;
  description: string;
  sections: { name: string; durationPct: number; description: string; voiceGuidance: string }[];
  targetDuration: string;
  wordsPerMinute: number;
  toneGuidelines: string;
}

export const SCRIPT_TEMPLATES: ScriptTemplate[] = [
  {
    id: 'big-four-video',
    name: 'Vidéo Big Four — Format Long (10-15 min)',
    type: 'video',
    icon: 'ri-film-line',
    description: 'Structure éditoriale Big Four pour vidéos YouTube : Hook → Contexte → Analyse → Recommandations → CTA. Optimisé pour rétention et référencement.',
    sections: [
      { name: 'Hook (Accroche)', durationPct: 8, description: '30-45 secondes. Question provocante, statistique choc, ou promesse claire.', voiceGuidance: 'Débit rapide, ton assertif, pause après la question d\'ouverture' },
      { name: 'Contexte (Background)', durationPct: 15, description: 'Cadrage réglementaire, pourquoi maintenant, qui est concerné.', voiceGuidance: 'Débit modéré, ton informatif, articulation précise des sigles' },
      { name: 'Analyse (Décryptage)', durationPct: 40, description: '3-5 points clés détaillés. Chiffres, références, implications.', voiceGuidance: 'Débit contrôlé, pause entre chaque point, emphase sur les chiffres' },
      { name: 'Recommandations (Action)', durationPct: 25, description: '3 recommandations actionnables. Que faire concrètement.', voiceGuidance: 'Ton directif mais pas alarmiste, débit légèrement accéléré' },
      { name: 'CTA (Call-to-Action)', durationPct: 12, description: 'Abonnement, commentaire, lien site web, prochaine vidéo.', voiceGuidance: 'Ton chaleureux, sourire audible, invitation pas injonction' },
    ],
    targetDuration: '12 min',
    wordsPerMinute: 155,
    toneGuidelines: 'Ton institutionnel KHEPRA : expert, accessible, jamais alarmiste. Éviter le jargon non expliqué. Toujours citer les sources réglementaires.',
  },
  {
    id: 'big-four-podcast',
    name: 'Podcast Big Four — Format Club Experts (20-30 min)',
    type: 'podcast',
    icon: 'ri-headphone-line',
    description: 'Format conversationnel structuré pour podcast audio. Ton plus détendu que la vidéo mais maintient la rigueur éditoriale Big Four.',
    sections: [
      { name: 'Introduction & Bienvenue', durationPct: 5, description: 'Présentation du sujet, de l\'invité, contexte.', voiceGuidance: 'Ton chaleureux, accueillant, naturel' },
      { name: 'Mise en contexte', durationPct: 15, description: 'Pourquoi ce sujet maintenant ? Actualité réglementaire.', voiceGuidance: 'Ton conversationnel, ponctué de questions rhétoriques' },
      { name: 'Analyse approfondie', durationPct: 50, description: 'Décryptage détaillé en 3-4 segments thématiques.', voiceGuidance: 'Alternance voix posée / voix dynamique, pauses marquées entre segments' },
      { name: 'Recommandations pratiques', durationPct: 20, description: 'Conseils actionnables pour le public cible.', voiceGuidance: 'Ton pratique, concret, exemples parlants' },
      { name: 'Conclusion & Prochain épisode', durationPct: 10, description: 'Résumé, teaser prochain épisode, remerciements.', voiceGuidance: 'Ton chaleureux, sourire audible, invitation à s\'abonner' },
    ],
    targetDuration: '25 min',
    wordsPerMinute: 145,
    toneGuidelines: 'Ton conversationnel mais professionnel. Laisser des silences naturels. Le podcast tolère plus de répétitions et de reformulations que la vidéo.',
  },
  {
    id: 'big-four-voiceover',
    name: 'Voix Off Institutionnelle',
    type: 'voiceover',
    icon: 'ri-mic-line',
    description: 'Format voix off pour vidéos institutionnelles, présentations corporate, modules e-learning.',
    sections: [
      { name: 'Annonce du sujet', durationPct: 10, description: 'Titre et objectif de la présentation.', voiceGuidance: 'Ton posé, articulation impeccable' },
      { name: 'Développement', durationPct: 70, description: 'Corps du sujet en 3-4 parties.', voiceGuidance: 'Rythme régulier, transitions marquées par des pauses' },
      { name: 'Synthèse', durationPct: 20, description: 'Résumé des points clés et prochaines étapes.', voiceGuidance: 'Ton conclusif, débit légèrement ralenti' },
    ],
    targetDuration: '5 min',
    wordsPerMinute: 140,
    toneGuidelines: 'Ton neutre et professionnel. Aucune émotion excessive. Clarté absolue sur chaque mot technique.',
  },
  {
    id: 'big-four-training',
    name: 'Module Formation / E-Learning',
    type: 'training',
    icon: 'ri-graduation-cap-line',
    description: 'Format pédagogique pour modules de formation, tutoriels, présentations didactiques.',
    sections: [
      { name: 'Objectifs pédagogiques', durationPct: 8, description: 'Ce que l\'apprenant va savoir faire.', voiceGuidance: 'Ton encourageant, clair, débit modéré' },
      { name: 'Introduction théorique', durationPct: 22, description: 'Concepts clés, définitions, cadre.', voiceGuidance: 'Débit lent, répétition des termes importants' },
      { name: 'Cas pratique / Exemple', durationPct: 30, description: 'Mise en situation concrète.', voiceGuidance: 'Ton engageant, questions aux apprenants' },
      { name: 'Exercice / Démonstration', durationPct: 25, description: 'Application guidée pas à pas.', voiceGuidance: 'Instructions claires, pauses pour laisser le temps de suivre' },
      { name: 'Récapitulatif & Quiz', durationPct: 15, description: 'Synthèse et évaluation des acquis.', voiceGuidance: 'Ton récapitulatif, questions à voix montante' },
    ],
    targetDuration: '18 min',
    wordsPerMinute: 130,
    toneGuidelines: 'Ton pédagogue : patient, encourageant, jamais condescendant. Expliquer chaque sigle à la première occurrence. Laisser des silences pour la réflexion.',
  },
];

// ─── VOICE ENGINE OPTIONS — COMPARATIVE ────────────────────────────────────

export interface VoiceEngineOption {
  id: string;
  name: string;
  type: 'open_source' | 'commercial_api' | 'hybrid';
  engine: string;
  description: string;
  costPerMinuteFCFA: number;
  latencyEstimateSec: number;
  qualityScore: number;
  languages: string[];
  pros: string[];
  cons: string[];
  status: 'active' | 'evaluating' | 'deprecated';
  integrationLevel: 'native' | 'edge_function' | 'external';
  requiresGPU: boolean;
  canRunLocally: boolean;
  icon: string;
}

export const VOICE_ENGINE_OPTIONS: VoiceEngineOption[] = [
  {
    id: 'elevenlabs',
    name: 'ElevenLabs Multilingual v2',
    type: 'commercial_api',
    engine: 'ElevenLabs API — pNInz6obpgDQGcFmaJgB (Adam) / jsCqWAovK2LkecY7zXl4 (Nicole) / MF3mGyEYCl7XYWbV9V6O (Narrative FR)',
    description: 'Moteur TTS commercial actuellement utilisé pour la production KHEPRA. Qualité professionnelle, latence faible, coût par caractère. Intégré via Edge Function kos-youtube-voice.',
    costPerMinuteFCFA: 75,
    latencyEstimateSec: 2.5,
    qualityScore: 94,
    languages: ['Français', 'Anglais', '28+ langues'],
    pros: ['Qualité audio professionnelle', '3 voix KHEPRA validées', 'Latence < 3 secondes', 'Multilingue natif', 'Pas d\'infrastructure GPU requise'],
    cons: ['Dépendance API externe', 'Coût récurrent par caractère', 'Pas de contrôle total sur le modèle', 'Pas d\'entraînement sur corpus KHEPRA spécifique'],
    status: 'active',
    integrationLevel: 'edge_function',
    requiresGPU: false,
    canRunLocally: false,
    icon: 'ri-cloud-line',
  },
  {
    id: 'coqui-tts',
    name: 'Coqui TTS XTTS-v2 (Open-Source)',
    type: 'open_source',
    engine: 'Coqui TTS — XTTS-v2 + Fine-tuning KHEPRA Corpus',
    description: 'Moteur TTS open-source en cours d\'évaluation. Permet un fine-tuning sur le corpus institutionnel KHEPRA. Nécessite infrastructure GPU pour l\'inférence en temps réel.',
    costPerMinuteFCFA: 8,
    latencyEstimateSec: 12,
    qualityScore: 68,
    languages: ['Français', 'Anglais'],
    pros: ['100% open-source — pas de dépendance externe', 'Fine-tuning possible sur corpus KHEPRA', 'Coût marginal quasi nul après setup', 'Contrôle total du modèle', 'Déploiement sur infra contrôlée'],
    cons: ['Qualité encore inférieure à ElevenLabs', 'Latence élevée sans GPU', 'Nécessite GPU (RTX 4090 ou A100)', 'Corpus d\'entraînement KHEPRA en construction (150h visées)', 'Maintenance technique requise'],
    status: 'evaluating',
    integrationLevel: 'native',
    requiresGPU: true,
    canRunLocally: true,
    icon: 'ri-cpu-line',
  },
  {
    id: 'piper-tts',
    name: 'Piper TTS (Lightweight)',
    type: 'open_source',
    engine: 'Piper TTS — Modèle FR qualifié',
    description: 'Moteur TTS ultra-léger pour les cas d\'usage basse latence (notifications, messages courts). Fonctionne sur CPU. Qualité acceptable pour les usages non-diffusés.',
    costPerMinuteFCFA: 1,
    latencyEstimateSec: 1.5,
    qualityScore: 52,
    languages: ['Français'],
    pros: ['Ultra-léger — fonctionne sur CPU', 'Latence < 2 secondes', 'Coût quasi nul', 'Parfait pour notifications et messages courts'],
    cons: ['Qualité nettement inférieure', 'Pas adapté à la diffusion publique', 'Pas de fine-tuning avancé', 'Français uniquement'],
    status: 'evaluating',
    integrationLevel: 'native',
    requiresGPU: false,
    canRunLocally: true,
    icon: 'ri-smartphone-line',
  },
  {
    id: 'hybrid-khepra',
    name: 'KOS Hybrid Voice Engine™ (Cible)',
    type: 'hybrid',
    engine: 'Coqui TTS Fine-tuned KHEPRA + ElevenLabs fallback',
    description: 'Architecture cible : production principale sur Coqui TTS fine-tuned KHEPRA, fallback automatique vers ElevenLabs si la qualité est insuffisante. Routeur intelligent selon le type de contenu.',
    costPerMinuteFCFA: 25,
    latencyEstimateSec: 5,
    qualityScore: 82,
    languages: ['Français', 'Anglais'],
    pros: ['Indépendance progressive d\'ElevenLabs', 'Coût réduit de 67%', 'Fallback automatique si qualité insuffisante', 'Amélioration continue via fine-tuning'],
    cons: ['Encore en développement (cible Q3 2026)', 'Nécessite infrastructure GPU', 'Complexité de routage', 'Validation qualité nécessaire avant chaque bascule'],
    status: 'evaluating',
    integrationLevel: 'native',
    requiresGPU: true,
    canRunLocally: false,
    icon: 'ri-git-branch-line',
  },
];

// ─── AUDIO QA ENGINE ───────────────────────────────────────────────────────

export interface AudioQADimension {
  id: string;
  name: string;
  weight: number;
  icon: string;
  description: string;
  checks: string[];
  autoFlagBelow: number;
}

export const AUDIO_QA_DIMENSIONS: AudioQADimension[] = [
  {
    id: 'intelligibility',
    name: 'Intelligibilité',
    weight: 25,
    icon: 'ri-volume-up-line',
    description: 'Le contenu audio est-il parfaitement compréhensible ? Vérification des sigles, termes techniques, noms propres.',
    checks: ['Tous les sigles sont correctement prononcés', 'Les termes techniques sont articulés distinctement', 'Les noms propres (personnes, institutions) sont vérifiés', 'Pas de mots « avalés » ou inaudibles', 'Volume constant sur toute la piste'],
    autoFlagBelow: 75,
  },
  {
    id: 'fluidity',
    name: 'Fluidité',
    weight: 20,
    icon: 'ri-rhythm-line',
    description: 'Le rythme de la voix est-il naturel et fluide ? Pas de pauses artificielles, de hachures ou d\'accélérations anormales.',
    checks: ['Débit constant (variation < 15%)', 'Pauses naturelles entre les phrases', 'Pas de coupures en milieu de mot', 'Transitions fluides entre les sections', 'Respiration naturelle simulée'],
    autoFlagBelow: 70,
  },
  {
    id: 'stability',
    name: 'Stabilité Audio',
    weight: 15,
    icon: 'ri-equalizer-line',
    description: 'La qualité audio est-elle stable sur toute la durée ? Pas de variations de volume, de distorsion ou d\'artefacts.',
    checks: ['Volume RMS constant (±3dB)', 'Pas de distorsion (clipping)', 'Pas d\'artefacts numériques', 'Bruit de fond < -60dB', 'Format de sortie conforme (MP3 320kbps / WAV 44.1kHz)'],
    autoFlagBelow: 80,
  },
  {
    id: 'coherence',
    name: 'Cohérence du Script',
    weight: 20,
    icon: 'ri-file-text-line',
    description: 'L\'audio correspond-il exactement au script ? Pas d\'omissions, d\'ajouts, de répétitions involontaires.',
    checks: ['Correspondance texte/audio > 99%', 'Pas d\'omission de section', 'Pas de répétition involontaire', 'Les nombres et dates sont correctement lus', 'Les acronymes sont épelés quand nécessaire'],
    autoFlagBelow: 85,
  },
  {
    id: 'compliance',
    name: 'Conformité Réglementaire',
    weight: 20,
    icon: 'ri-shield-check-line',
    description: 'Le contenu audio respecte-t-il les exigences réglementaires ? Références exactes, disclaimer présent, pas d\'interprétation non sourcée.',
    checks: ['Références réglementaires exactes', 'Disclaimer réglementaire audio inclus si requis', 'Pas d\'interprétation non sourcée', 'Ton conforme à l\'identité KHEPRA', 'Mentions légales audio si diffusion publique'],
    autoFlagBelow: 80,
  },
];

export interface AudioQAResult {
  id: string;
  contentTitle: string;
  date: string;
  voiceProfile: string;
  duration: string;
  dimensions: { dimId: string; score: number; passed: boolean; issues: string[] }[];
  globalScore: number;
  decision: 'approved' | 'to_correct' | 'rejected';
}

export const AUDIO_QA_RESULTS: AudioQAResult[] = [
  {
    id: 'QA-001',
    contentTitle: 'Réforme Ratio Solvabilité UEMOA 2026 — Voice-Over',
    date: '2026-06-22',
    voiceProfile: 'Dr. Célestin Koffi',
    duration: '12:34',
    dimensions: [
      { dimId: 'intelligibility', score: 98, passed: true, issues: [] },
      { dimId: 'fluidity', score: 94, passed: true, issues: [] },
      { dimId: 'stability', score: 96, passed: true, issues: [] },
      { dimId: 'coherence', score: 99, passed: true, issues: [] },
      { dimId: 'compliance', score: 95, passed: true, issues: [] },
    ],
    globalScore: 96.4,
    decision: 'approved',
  },
  {
    id: 'QA-002',
    contentTitle: 'ESG & Finance Durable — Cadre ISSB — Voice-Over',
    date: '2026-06-21',
    voiceProfile: 'Aminata Sow',
    duration: '14:10',
    dimensions: [
      { dimId: 'intelligibility', score: 82, passed: true, issues: [] },
      { dimId: 'fluidity', score: 68, passed: false, issues: ['Pause excessive section 3.2 (3.8s)', 'Accélération anormale section 4.1'] },
      { dimId: 'stability', score: 78, passed: false, issues: ['Variation volume section 2.3 : -8dB'] },
      { dimId: 'coherence', score: 74, passed: false, issues: ['Omission phrase « selon les standards ISSB » section 1.2'] },
      { dimId: 'compliance', score: 72, passed: false, issues: ['Référence ISSB S1 non vérifiée à l\'audio'] },
    ],
    globalScore: 74.8,
    decision: 'to_correct',
  },
  {
    id: 'QA-003',
    contentTitle: 'Gouvernance SFD — 7 Piliers BCEAO — Voice-Over',
    date: '2026-06-23',
    voiceProfile: 'Fatoumata Diallo',
    duration: '18:05',
    dimensions: [
      { dimId: 'intelligibility', score: 97, passed: true, issues: [] },
      { dimId: 'fluidity', score: 95, passed: true, issues: [] },
      { dimId: 'stability', score: 98, passed: true, issues: [] },
      { dimId: 'coherence', score: 96, passed: true, issues: [] },
      { dimId: 'compliance', score: 94, passed: true, issues: [] },
    ],
    globalScore: 96.0,
    decision: 'approved',
  },
];

// ─── STANDARD PRODUCTION PROCESS ───────────────────────────────────────────

export interface ProductionStep {
  step: number;
  name: string;
  icon: string;
  description: string;
  estimatedTime: string;
  tools: string[];
  qualityCheck: string;
}

export const PRODUCTION_PROCESS: ProductionStep[] = [
  {
    step: 1,
    name: 'Analyse du Contenu',
    icon: 'ri-file-search-line',
    description: 'Analyse du contenu source : identification du type (vidéo/podcast/formation), extraction des termes techniques, repérage des sigles à prononcer, évaluation de la complexité.',
    estimatedTime: '2-5 min',
    tools: ['KOS Script Engine', 'Pronunciation Dictionary Lookup', 'Complexity Scorer'],
    qualityCheck: 'Tous les sigles et termes techniques sont-ils identifiés ?',
  },
  {
    step: 2,
    name: 'Nettoyage Rédactionnel',
    icon: 'ri-eraser-line',
    description: 'Adaptation du texte pour la voix : suppression des parenthèses et notes de bas de page, conversion des tableaux en phrases, simplification des phrases trop longues (>40 mots), normalisation des nombres.',
    estimatedTime: '3-8 min',
    tools: ['KOS Script Normalizer', 'Sentence Splitter', 'Number-to-Text Converter'],
    qualityCheck: 'Le texte est-il fluide à la lecture orale ?',
  },
  {
    step: 3,
    name: 'Adaptation Voix-Off',
    icon: 'ri-mic-line',
    description: 'Ajout des indications de lecture : pauses, emphase, intonation montante/descendante. Attribution du profil vocal selon le type de contenu et l\'audience cible. Insertion des balises SSML si nécessaire.',
    estimatedTime: '5-10 min',
    tools: ['Voice Profile Matcher', 'SSML Tag Injector', 'Pause Calculator'],
    qualityCheck: 'Le profil vocal est-il adapté au contenu et à l\'audience ?',
  },
  {
    step: 4,
    name: 'Génération Audio',
    icon: 'ri-sound-module-line',
    description: 'Appel au moteur TTS (ElevenLabs ou Open-Source selon disponibilité et coût). Paramétrage : stabilité, clarté, speaker boost. Génération par segments si contenu long.',
    estimatedTime: '1-4 min',
    tools: ['KOS Voice Engine', 'ElevenLabs Edge Function', 'Coqui TTS Local (beta)'],
    qualityCheck: 'L\'audio a-t-il été généré sans erreur ?',
  },
  {
    step: 5,
    name: 'Contrôle Qualité Audio',
    icon: 'ri-shield-check-line',
    description: 'Passage du fichier audio dans le KOS Audio QA Engine : intelligibilité, fluidité, stabilité, cohérence script, conformité réglementaire. Score global sur 100.',
    estimatedTime: '2-4 min',
    tools: ['KOS Audio QA Engine', 'Script-to-Audio Comparator', 'Volume Analyzer'],
    qualityCheck: 'Score global > 85/100 ?',
  },
  {
    step: 6,
    name: 'Livraison',
    icon: 'ri-archive-line',
    description: 'Encodage final, métadonnées, stockage, notification. Génération des formats multiples (MP3, WAV, OGG). Ajout au Voice Knowledge Base.',
    estimatedTime: '1-2 min',
    tools: ['KOS Media Factory', 'Metadata Tagger', 'Voice Knowledge Base Indexer'],
    qualityCheck: 'Tous les formats sont-ils générés et les métadonnées complètes ?',
  },
];

// ─── VOICE KNOWLEDGE BASE ──────────────────────────────────────────────────

export interface VoiceKnowledgeEntry {
  id: string;
  category: 'diction_rule' | 'validated_pronunciation' | 'reference_script' | 'audio_parameter' | 'production_guide';
  title: string;
  description: string;
  date: string;
  domain: string;
  tags: string[];
  reusable: boolean;
  usageCount: number;
}

export const VOICE_KNOWLEDGE_BASE: VoiceKnowledgeEntry[] = [
  {
    id: 'VKB-001',
    category: 'diction_rule',
    title: 'Règle de diction — Sigles BCEAO/COBAC',
    description: 'Tous les sigles réglementaires doivent être épelés (et non prononcés comme des mots) lors de leur première occurrence dans un contenu audio. Exception : BCEAO, COBAC, UEMOA, CEMAC qui sont prononcés comme des mots.',
    date: '2026-06-15',
    domain: 'Prononciation',
    tags: ['sigles', 'BCEAO', 'COBAC', 'règle'],
    reusable: true,
    usageCount: 234,
  },
  {
    id: 'VKB-002',
    category: 'validated_pronunciation',
    title: 'Prononciations validées — Noms d\'institutions africaines',
    description: 'Liste validée des prononciations des principales institutions financières africaines. COBAC → co-bac, AMF-UEMOA → cré-pé-em-ef, COSUMAF → co-su-maf, BRVM → bé-er-vé-em.',
    date: '2026-06-14',
    domain: 'Prononciation',
    tags: ['institutions', 'prononciation', 'afrique'],
    reusable: true,
    usageCount: 187,
  },
  {
    id: 'VKB-003',
    category: 'reference_script',
    title: 'Script de référence — Hook 30 secondes Vidéo Big Four',
    description: 'Modèle de hook d\'accroche optimisé pour les vidéos YouTube KHEPRA. Question provocante + statistique + promesse + invitation. Testé A/B : +23% de rétention vs hook standard.',
    date: '2026-06-13',
    domain: 'Scripts',
    tags: ['hook', 'youtube', 'script', 'modèle'],
    reusable: true,
    usageCount: 412,
  },
  {
    id: 'VKB-004',
    category: 'audio_parameter',
    title: 'Paramètres audio optimaux — ElevenLabs Multilingual v2',
    description: 'Configuration validée : stability=0.45, clarity=0.78, speaker_boost=true, style=0.30, output_format=mp3_44100_128. Ces paramètres produisent la voix la plus naturelle pour le contenu institutionnel français.',
    date: '2026-06-12',
    domain: 'Audio',
    tags: ['elevenlabs', 'paramètres', 'optimisation'],
    reusable: true,
    usageCount: 326,
  },
  {
    id: 'VKB-005',
    category: 'production_guide',
    title: 'Guide de production — Voix Off Institutionnelle KHEPRA',
    description: 'Processus complet de production d\'une voix off institutionnelle : sélection du profil → nettoyage du script → adaptation SSML → génération ElevenLabs → contrôle qualité → livraison. Inclut la checklist de validation.',
    date: '2026-06-11',
    domain: 'Production',
    tags: ['guide', 'voix-off', 'processus', 'checklist'],
    reusable: true,
    usageCount: 156,
  },
  {
    id: 'VKB-006',
    category: 'diction_rule',
    title: 'Règle de diction — Nombres et pourcentages',
    description: 'Les nombres entiers sont lus en toutes lettres jusqu\'à 100. Au-delà, format numérique. Les pourcentages sont lus « X pour cent ». Les années : « deux-mille-vingt-six » (pas « vingt-vingt-six »).',
    date: '2026-06-10',
    domain: 'Prononciation',
    tags: ['nombres', 'pourcentages', 'années', 'règle'],
    reusable: true,
    usageCount: 289,
  },
  {
    id: 'VKB-007',
    category: 'audio_parameter',
    title: 'Égalisation et mastering — Standard KHEPRA',
    description: 'Profil d\'égalisation standard : léger boost à 2.5kHz (+2dB) pour la clarté des consonnes, coupe-bas à 80Hz pour éliminer les rumbles, compresseur doux (ratio 2:1, threshold -18dB), limiteur à -1dB true peak.',
    date: '2026-06-09',
    domain: 'Audio',
    tags: ['mastering', 'égalisation', 'compression', 'standard'],
    reusable: true,
    usageCount: 134,
  },
  {
    id: 'VKB-008',
    category: 'reference_script',
    title: 'Script de référence — Outro CTA YouTube KHEPRA',
    description: 'Modèle d\'outro avec call-to-action optimisé : remerciement → récapitulatif en une phrase → invitation à s\'abonner → lien vers article lié → signature KHEPRA. Format testé sur 47 vidéos, taux de conversion abonnement +18%.',
    date: '2026-06-08',
    domain: 'Scripts',
    tags: ['outro', 'CTA', 'youtube', 'script'],
    reusable: true,
    usageCount: 378,
  },
];

// ─── KPIs — SYSTEM PERFORMANCE ────────────────────────────────────────────

export interface VoiceFactoryKPI {
  id: string;
  name: string;
  icon: string;
  color: string;
  current: number;
  previous: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  history: { month: string; value: number }[];
}

export const VOICE_FACTORY_KPIS: VoiceFactoryKPI[] = [
  {
    id: 'audio-quality',
    name: 'Qualité Audio Globale',
    icon: 'ri-medal-line',
    color: 'primary',
    current: 91.2,
    previous: 86.5,
    target: 95,
    unit: '/100',
    trend: 'up',
    history: [
      { month: 'Jan', value: 72 }, { month: 'Fév', value: 76 }, { month: 'Mar', value: 80 },
      { month: 'Avr', value: 84 }, { month: 'Mai', value: 86.5 }, { month: 'Juin', value: 91.2 },
    ],
  },
  {
    id: 'production-time',
    name: 'Temps de Production Moyen',
    icon: 'ri-timer-line',
    color: 'accent',
    current: 18.5,
    previous: 24.2,
    target: 12,
    unit: 'min',
    trend: 'down',
    history: [
      { month: 'Jan', value: 35 }, { month: 'Fév', value: 30 }, { month: 'Mar', value: 27 },
      { month: 'Avr', value: 24 }, { month: 'Mai', value: 24.2 }, { month: 'Juin', value: 18.5 },
    ],
  },
  {
    id: 'reuse-rate',
    name: 'Taux de Réutilisation Scripts',
    icon: 'ri-repeat-line',
    color: 'secondary',
    current: 68.3,
    previous: 52.1,
    target: 80,
    unit: '%',
    trend: 'up',
    history: [
      { month: 'Jan', value: 35 }, { month: 'Fév', value: 42 }, { month: 'Mar', value: 48 },
      { month: 'Avr', value: 52 }, { month: 'Mai', value: 52.1 }, { month: 'Juin', value: 68.3 },
    ],
  },
  {
    id: 'cost-per-minute',
    name: 'Coût par Minute Produite',
    icon: 'ri-money-dollar-circle-line',
    color: 'primary',
    current: 65,
    previous: 95,
    target: 30,
    unit: 'FCFA',
    trend: 'down',
    history: [
      { month: 'Jan', value: 120 }, { month: 'Fév', value: 110 }, { month: 'Mar', value: 100 },
      { month: 'Avr', value: 95 }, { month: 'Mai', value: 95 }, { month: 'Juin', value: 65 },
    ],
  },
  {
    id: 'error-rate',
    name: 'Erreurs QA Détectées',
    icon: 'ri-error-warning-line',
    color: 'accent',
    current: 3.2,
    previous: 7.8,
    target: 1.0,
    unit: '%',
    trend: 'down',
    history: [
      { month: 'Jan', value: 12 }, { month: 'Fév', value: 10 }, { month: 'Mar', value: 8.5 },
      { month: 'Avr', value: 7.8 }, { month: 'Mai', value: 5.1 }, { month: 'Juin', value: 3.2 },
    ],
  },
  {
    id: 'user-satisfaction',
    name: 'Satisfaction Utilisateurs',
    icon: 'ri-user-heart-line',
    color: 'secondary',
    current: 88,
    previous: 79,
    target: 92,
    unit: '%',
    trend: 'up',
    history: [
      { month: 'Jan', value: 65 }, { month: 'Fév', value: 70 }, { month: 'Mar', value: 74 },
      { month: 'Avr', value: 79 }, { month: 'Mai', value: 79 }, { month: 'Juin', value: 88 },
    ],
  },
  {
    id: 'open-source-adoption',
    name: 'Taux d\'Adoption Open-Source',
    icon: 'ri-cpu-line',
    color: 'primary',
    current: 12,
    previous: 0,
    target: 60,
    unit: '%',
    trend: 'up',
    history: [
      { month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 },
      { month: 'Avr', value: 3 }, { month: 'Mai', value: 7 }, { month: 'Juin', value: 12 },
    ],
  },
];

// ─── GLOBAL STATS ──────────────────────────────────────────────────────────

export const VOICE_FACTORY_STATS = {
  programVersion: 'KHEPRA Voice™ v1.0 — Proprietary Voice Factory',
  launched: '2026-06-23',
  totalVoiceProfiles: 4,
  productionVoices: 3,
  totalDictionaries: 10,
  totalDictionaryEntries: 2134,
  totalValidatedPronunciations: 1890,
  openSourceModels: 2,
  commercialEngines: 1,
  scriptTemplates: 4,
  knowledgeBaseEntries: 8,
  qaDimensions: 5,
  totalMinutesProduced: 2450,
  minutesThisMonth: 342,
  costSavedVsExternal: 184500,
  avgProductionTimeReduction: 42,
  qualityImprovementYTD: 19.2,
  reuseRateTarget: 80,
  maturityScore: 76,
  targetMaturity: 90,
  governanceStatus: 'Actif — Toute voix produite doit être documentée, traçable et validée avant diffusion publique.',
};