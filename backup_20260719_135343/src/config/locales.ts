// ============================================================
// KHEPRA LOCALES CONFIG — 18 Langues
// UEMOA/CEMAC + International Business
// ============================================================
// Usage: import { KHEPRA_LOCALES, type LocaleCode } from '@/config/locales'
// ============================================================

export const KHEPRA_LOCALES = {
  // ── UEMOA/CEMAC Locales ──
  'fr': { name: 'Français', deepl: 'FR', tts: 'fr-FR', region: 'Afrique de l\'Ouest & Centrale' },
  'wo': { name: 'Wolof', deepl: null, tts: 'wo-SN', llm: 'wolof', region: 'Sénégal' },
  'ee': { name: 'Ewe', deepl: null, tts: 'ee-TG', llm: 'ewe', region: 'Togo/Ghana' },
  'ln': { name: 'Lingala', deepl: null, tts: 'ln-CD', llm: 'lingala', region: 'RDC/Congo' },
  'ha': { name: 'Hausa', deepl: null, tts: 'ha-NG', llm: 'hausa', region: 'Nigeria/Sahel' },
  'bm': { name: 'Bambara', deepl: null, tts: 'bm-ML', llm: 'bambara', region: 'Mali' },
  'dy': { name: 'Dioula', deepl: null, tts: 'dy-CI', llm: 'dioula', region: 'Côte d\'Ivoire/Burkina' },
  'sg': { name: 'Sango', deepl: null, tts: 'sg-CF', llm: 'sango', region: 'Centrafrique' },
  'ff': { name: 'Peul', deepl: null, tts: 'ff-SN', llm: 'fula', region: 'Sahel' },
  'yo': { name: 'Yoruba', deepl: null, tts: 'yo-NG', llm: 'yoruba', region: 'Nigeria/Bénin' },
  'sw': { name: 'Swahili', deepl: 'EN-GB', tts: 'sw-KE', llm: 'swahili', region: 'Afrique de l\'Est' },
  'am': { name: 'Amharique', deepl: null, tts: 'am-ET', llm: 'amharic', region: 'Éthiopie' },
  // ── International Business ──
  'en': { name: 'English', deepl: 'EN-GB', tts: 'en-US', region: 'International' },
  'ar': { name: 'Arabic', deepl: 'AR', tts: 'ar-SA', region: 'MENA' },
  'pt': { name: 'Portuguese', deepl: 'PT-PT', tts: 'pt-PT', region: 'Lusophone' },
  'es': { name: 'Spanish', deepl: 'ES', tts: 'es-ES', region: 'Hispanophone' },
  'zh': { name: 'Chinese', deepl: 'ZH', tts: 'zh-CN', region: 'Asie-Pacifique' },
  'ru': { name: 'Russian', deepl: 'RU', tts: 'ru-RU', region: 'CEI' },
} as const

export type LocaleCode = keyof typeof KHEPRA_LOCALES

export const AFRICAN_LOCALES: LocaleCode[] = ['fr', 'wo', 'ee', 'ln', 'ha', 'bm', 'dy', 'sg', 'ff', 'yo', 'sw', 'am']
export const INTERNATIONAL_LOCALES: LocaleCode[] = ['en', 'ar', 'pt', 'es', 'zh', 'ru']
export const ALL_LOCALES: LocaleCode[] = Object.keys(KHEPRA_LOCALES) as LocaleCode[]

export const DEEPL_SUPPORTED_LOCALES: LocaleCode[] = ALL_LOCALES.filter(l => KHEPRA_LOCALES[l].deepl !== null)
export const LLM_ONLY_LOCALES: LocaleCode[] = ALL_LOCALES.filter(l => KHEPRA_LOCALES[l].deepl === null && KHEPRA_LOCALES[l].llm !== undefined)

// ── Plateforme par langue ──
export const PLATFORM_MAP: Record<LocaleCode, string[]> = {
  'fr': ['youtube', 'linkedin', 'facebook', 'tiktok'],
  'wo': ['youtube', 'facebook', 'tiktok'],
  'ee': ['youtube', 'facebook', 'tiktok'],
  'ln': ['youtube', 'facebook', 'tiktok'],
  'ha': ['youtube', 'facebook', 'tiktok'],
  'bm': ['youtube', 'facebook'],
  'dy': ['youtube', 'facebook'],
  'sg': ['youtube', 'facebook'],
  'ff': ['youtube', 'facebook'],
  'yo': ['youtube', 'facebook', 'tiktok'],
  'sw': ['youtube', 'facebook', 'tiktok'],
  'am': ['youtube', 'facebook'],
  'en': ['youtube', 'linkedin', 'twitter'],
  'ar': ['youtube', 'facebook', 'instagram'],
  'pt': ['youtube', 'linkedin', 'facebook'],
  'es': ['youtube', 'linkedin', 'facebook'],
  'zh': ['youtube', 'facebook'],
  'ru': ['youtube', 'facebook'],
}

// ── Hashtags localisés ──
export const HASHTAG_MAP: Record<LocaleCode, string[]> = {
  'fr': ['#BCEAO', '#Conformité', '#PMEAfrique', '#KHEPRA'],
  'wo': ['#BCEAO', '#PME', '#Senegal', '#Khepra'],
  'ee': ['#OHADA', '#Togo', '#SFD', '#Khepra'],
  'ln': ['#COBAC', '#RDC', '#PME', '#Khepra'],
  'ha': ['#BCEAO', '#Nigeria', '#SME', '#Khepra'],
  'bm': ['#BCEAO', '#Mali', '#PME', '#Khepra'],
  'dy': ['#BCEAO', '#CotedIvoire', '#PME', '#Khepra'],
  'sg': ['#COBAC', '#Centrafrique', '#PME', '#Khepra'],
  'ff': ['#BCEAO', '#Sahel', '#PME', '#Khepra'],
  'yo': ['#BCEAO', '#Nigeria', '#SME', '#Khepra'],
  'sw': ['#BCEAO', '#EastAfrica', '#SME', '#Khepra'],
  'am': ['#BCEAO', '#Ethiopia', '#SME', '#Khepra'],
  'en': ['#BCEAO', '#Compliance', '#AfricaBusiness', '#KHEPRA'],
  'ar': ['#BCEAO', '#الامتثال', '#KHEPRA'],
  'pt': ['#BCEAO', '#Conformidade', '#Africa', '#KHEPRA'],
  'es': ['#BCEAO', '#Cumplimiento', '#Africa', '#KHEPRA'],
  'zh': ['#BCEAO', '#合规', '#AfricaBusiness', '#KHEPRA'],
  'ru': ['#BCEAO', '#Комплаенс', '#Africa', '#KHEPRA'],
}

// ── Prompts de traduction par langue ──
export const LOCALE_PROMPTS: Record<string, string> = {
  'wo': 'Traduis en Wolof Sénégal, ton professionnel mais accessible PME. Garde termes BCEAO/OHADA:',
  'ee': 'Traduis en Ewe du Togo, ton pédagogique pour entrepreneur. Garde chiffres:',
  'ln': 'Traduis en Lingala RDC, ton direct. Évite anglicismes:',
  'ha': 'Traduis en Hausa Nigeria, ton respectueux. Garde acronymes:',
  'bm': 'Traduis en Bambara Mali, ton oral. Simplifie phrases:',
  'dy': 'Traduis en Dioula CI, ton business. Garde CFA:',
  'sg': 'Traduis en Sango Centrafrique, ton simple. Garde termes COBAC:',
  'ff': 'Traduis en Peul Sahel, ton communautaire. Garde références BCEAO:',
  'yo': 'Traduis en Yoruba Nigeria, ton business. Garde acronymes:',
  'sw': 'Traduis en Swahili Afrique de l\'Est, ton professionnel. Garde termes BCEAO:',
  'am': 'Traduis en Amharique Éthiopie, ton formel. Garde chiffres:',
}

// ── Types YouTube par langue ──
export const YOUTUBE_CATEGORY_MAP: Record<LocaleCode, string> = {
  'fr': '27', 'wo': '27', 'ee': '27', 'ln': '27', 'ha': '27',
  'bm': '27', 'dy': '27', 'sg': '27', 'ff': '27', 'yo': '27',
  'sw': '27', 'am': '27', 'en': '27', 'ar': '27', 'pt': '27',
  'es': '27', 'zh': '27', 'ru': '27',
}



