// ============================================================
// KOS MULTI-POST — Publication Multi-Plateforme par Locale
// Utilise Ayrshare pour poster sur 6 plateformes × 18 langues
// ============================================================

import { KHEPRA_LOCALES, LocaleCode, PLATFORM_MAP, HASHTAG_MAP, YOUTUBE_CATEGORY_MAP } from '@/config/locales'

interface MultiPostConfig {
  apiKey: string
  ayrshareEndpoint?: string
}

interface PostRequest {
  content: Record<LocaleCode, string>
  videoUrls: Record<LocaleCode, string>
  thumbnailUrl?: string
  scheduleDate?: string
}

interface PostResult {
  locale: LocaleCode
  platforms: string[]
  success: boolean
  postId?: string
  error?: string
}

const DEFAULT_AYRSHARE_ENDPOINT = 'https://api.ayrshare.com/api/post'

export function createMultiPost(config: MultiPostConfig) {
  const { apiKey, ayrshareEndpoint = DEFAULT_AYRSHARE_ENDPOINT } = config

  const postSingle = async (
    locale: LocaleCode,
    script: string,
    videoUrl: string,
    scheduleDate?: string,
  ): Promise<PostResult> => {
    const localeConfig = KHEPRA_LOCALES[locale]
    const platforms = PLATFORM_MAP[locale] || ['youtube', 'facebook']
    const hashtags = HASHTAG_MAP[locale] || ['#BCEAO', '#KHEPRA']
    const categoryId = YOUTUBE_CATEGORY_MAP[locale] || '27'

    const body: Record<string, unknown> = {
      post: script.slice(0, 3000),
      platforms,
      hashtags,
    }

    if (videoUrl) {
      body.mediaUrls = [videoUrl]
    }

    if (platforms.includes('youtube')) {
      body.youTubeOptions = {
        title: script.slice(0, 100),
        description: `${script.slice(0, 3000)}\n\n🔗 Diagnostic gratuit: https://khepraexperts.com/diagnostic`,
        tags: hashtags,
        categoryId,
        language: locale,
      }
    }

    if (platforms.includes('facebook') || localeConfig.name) {
      body.facebookOptions = { locale: `${locale}_${localeConfig.name}` }
    }

    if (platforms.includes('linkedin')) {
      body.linkedInOptions = { locale }
    }

    if (scheduleDate) {
      body.scheduleDate = scheduleDate
    }

    try {
      const resp = await fetch(ayrshareEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      })

      const data = await resp.json()

      if (!resp.ok) {
        return {
          locale,
          platforms,
          success: false,
          error: data?.message || `HTTP ${resp.status}`,
        }
      }

      return {
        locale,
        platforms,
        success: true,
        postId: data?.id || data?.postId || 'published',
      }
    } catch (e) {
      return {
        locale,
        platforms,
        success: false,
        error: String(e),
      }
    }
  }

  const publishAllLocales = async (request: PostRequest): Promise<PostResult[]> => {
    const { content, videoUrls, scheduleDate } = request
    const locales = Object.keys(content) as LocaleCode[]

    const results: PostResult[] = []

    for (const locale of locales) {
      const script = content[locale]
      const videoUrl = videoUrls[locale] || ''

      if (!script) continue

      const result = await postSingle(locale, script, videoUrl, scheduleDate)
      results.push(result)

      console.log(`[MULTI-POST] ${locale} → ${result.success ? '✅' : '❌'} ${result.platforms?.join(', ')}`)

      if (locales.length > 1) {
        await new Promise(r => setTimeout(r, 1200))
      }
    }

    return results
  }

  const getPlatformsForLocale = (locale: LocaleCode): string[] => {
    return PLATFORM_MAP[locale] || ['youtube', 'facebook']
  }

  const getHashtagsForLocale = (locale: LocaleCode): string[] => {
    return HASHTAG_MAP[locale] || ['#BCEAO', '#KHEPRA']
  }

  const getSupportedLocales = (): LocaleCode[] => {
    return Object.keys(KHEPRA_LOCALES) as LocaleCode[]
  }

  return {
    postSingle,
    publishAllLocales,
    getPlatformsForLocale,
    getHashtagsForLocale,
    getSupportedLocales,
  }
}

export type { MultiPostConfig, PostRequest, PostResult }



