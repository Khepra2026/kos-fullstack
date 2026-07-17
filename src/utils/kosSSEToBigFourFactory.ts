// ═══════════════════════════════════════════════════════════════════
// KOS SSE → Big Four YouTube Hybrid Production Factory Bridge
// Convertit les articles approuvés du Social Selling Engine (Hub 85)
// en paramètres de production pour le Big Four YouTube Factory (Hub 80)
// ═══════════════════════════════════════════════════════════════════

import { SOCIAL_SELLING_ARTICLES } from '@/mocks/kosLinkedInSocialSellingEngine';
import type { SocialSellingArticle } from '@/mocks/kosLinkedInSocialSellingEngine';
import type {
  ContentItem,
  AudienceSegment,
  SSEFactoryParams,
  ContentStage,
  ContentStatus,
} from '@/mocks/kosHybridYoutubeStudio';
import {
  buildAllDownloads,
  buildEditorialStructure,
  buildBigFourScore,
  buildComplianceChecks,
  getRecommendedVoiceForAudiences,
} from '@/mocks/kosHybridYoutubeStudio';
import { VOICE_PROFILES } from '@/mocks/kosVoiceAIStudio';

// ─── Mappage mots-clés SSE article → AudienceSegments ──────────────────────

function detectAudienceSegments(article: SocialSellingArticle): AudienceSegment[] {
  const title = (article.title || '').toLowerCase();
  const tags = article.contentBundle.hashtags.map((h) => h.toLowerCase()).join(' ');
  const text = `${title} ${tags}`;

  const segments: AudienceSegment[] = [];

  if (text.includes('banque') || text.includes('bank') || text.includes('bceao') || text.includes('uemoa') || text.includes('agrement')) {
    segments.push('DG_BANQUE');
  }
  if (text.includes('conformit') || text.includes('compliance') || text.includes('lbc') || text.includes('gafi') || text.includes('aml')) {
    segments.push('COMPLIANCE_OFFICER');
  }
  if (text.includes('risk') || text.includes('risque') || text.includes('stress') || text.includes('pilier')) {
    segments.push('RISK_MANAGER');
  }
  if (text.includes('audit') || text.includes('controle') || text.includes('contrôle')) {
    segments.push('AUDITEUR_INTERNE');
  }
  if (text.includes('sfd') || text.includes('microfinance') || text.includes('imf') || text.includes('inclusion')) {
    segments.push('DG_MICROFINANCE');
  }
  if (text.includes('esg') || text.includes('durabil') || text.includes('vert') || text.includes('climatique')) {
    segments.push('AGENCE_PUBLIQUE');
  }
  if (text.includes('investiss') || text.includes('levee') || text.includes('levée') || text.includes('equity') || text.includes('fonds')) {
    segments.push('INVESTISSEUR');
  }
  if (text.includes('cobac') || text.includes('cemac') || text.includes('gouvernance') || text.includes('administrateur')) {
    segments.push('PCA');
  }

  // Fallback si rien détecté
  if (segments.length === 0) segments.push('DG_BANQUE');

  return [...new Set(segments)].slice(0, 3) as AudienceSegment[];
}

// ─── Détermination du type vidéo ─────────────────────────────────────────────

function detectVideoType(article: SocialSellingArticle): ContentItem['videoType'] {
  const title = article.title.toLowerCase();
  if (title.includes('guide') || title.includes('formation')) return 'formation';
  if (title.includes('diagnostic') || title.includes('flash')) return 'capsule';
  if (title.includes('analyse') || title.includes('décryptage') || title.includes('decryptage')) return 'analyse';
  if (title.includes('podcast') || title.includes('club experts')) return 'podcast';
  if (title.includes('interview')) return 'interview';
  return 'analyse';
}

// ─── Estimation durée vidéo ───────────────────────────────────────────────────

function estimateDuration(article: SocialSellingArticle): string {
  const wordCount = article.contentBundle.nativeArticle.wordCount || 1500;
  if (wordCount > 2500) return '22 min';
  if (wordCount > 2000) return '18 min';
  if (wordCount > 1500) return '14 min';
  if (wordCount > 1000) return '10 min';
  return '8 min';
}

// ─── Extraction mots-clés SEO ─────────────────────────────────────────────────

function extractSEOKeywords(article: SocialSellingArticle): string[] {
  const tags = article.contentBundle.hashtags
    .map((t) => t.replace('#', '').trim())
    .filter((t) => t.length > 3 && !['KHEPRAExperts', 'KOSPlatform', 'BigFourStandard'].includes(t));

  const titleWords = article.contentBundle.nativeArticle.title
    .split(/[\s:—–-]+/)
    .filter((w) => w.length > 4 && !/^(les|des|une|pour|dans|avec|sans|sur|que|qui|aux|par)$/i.test(w))
    .slice(0, 4);

  const unique = [...new Set([...tags, ...titleWords])];
  return unique.slice(0, 8);
}

// ─── Obtenir nom complet du profil voix ────────────────────────────────────────

function getVoiceProfileName(voiceId: string): string {
  const profile = VOICE_PROFILES.find((v) => v.id === voiceId);
  return profile?.name || 'Dr. Célestin Koffi — Expert Institutionnel';
}

// ─── FONCTION PRINCIPALE : SSE article → SSEFactoryParams ────────────────────

export function buildSSEFactoryParams(article: SocialSellingArticle): SSEFactoryParams {
  const audienceSegments = detectAudienceSegments(article);
  const recommendedVoiceId = getRecommendedVoiceForAudiences(audienceSegments);

  return {
    sseArticleId: article.id,
    topic: article.title,
    title: `${article.contentBundle.nativeArticle.title} | KHEPRA EXPERTS`,
    videoType: detectVideoType(article),
    audienceSegments,
    recommendedVoiceId,
    sseGlobalScore: article.scoring.globalScore,
    sseHookScore: article.scoring.hookScore,
    keywords: extractSEOKeywords(article),
    estimatedDuration: estimateDuration(article),
    sourceArticleUrl: article.sourceUrl,
  };
}

// ─── FONCTION : Convertir SSEFactoryParams → ContentItem (pour le studio) ─────

export function buildContentItemFromSSE(params: SSEFactoryParams): ContentItem {
  const now = new Date().toISOString();
  const contentId = `SSE-BF-${params.sseArticleId}`;
  const audienceLabel = params.audienceSegments
    .slice(0, 2)
    .map((s) => s.replace(/_/g, ' '))
    .join(', ');

  const voiceName = getVoiceProfileName(params.recommendedVoiceId);
  const isBigFour = params.sseGlobalScore >= 90;

  return {
    contentId,
    topic: params.topic,
    videoType: params.videoType,
    audience: audienceLabel,
    audienceSegments: params.audienceSegments,
    stage: 'SCRIPT_MASTER_GENERATED' as ContentStage,
    status: 'DRAFT' as ContentStatus,
    script: {
      title: params.title,
      fullText: `[INTRO — BIG FOUR SSE 90+]\n${params.topic}\n\nScore SSE : ${params.sseGlobalScore}/100 — Hook : ${params.sseHookScore}/100\n\n[Structure générée automatiquement depuis l'article approuvé du Social Selling Engine]\n\nAudience cible : ${audienceLabel}\nVoix KHEPRA recommandée : ${voiceName}\nMots-clés SEO : ${params.keywords.join(', ')}\n\n[Contenu complet à générer selon la structure Big Four :]`,
      description: `${params.topic}. Analyse approfondie par KHEPRA EXPERTS — Score qualité SSE ${params.sseGlobalScore}/100.`,
      estimatedDuration: params.estimatedDuration,
      podcastScript: `[Version podcast — générée depuis l'article SSE ${params.sseArticleId}]`,
      teleprompterScript: `[Téléprompteur — générée depuis l'article SSE ${params.sseArticleId}]`,
      transcript: `[Transcription — à générer]`,
      createdAt: now,
    },
    voice: null,
    thumbnail: null,
    video: null,
    metadata: null,
    bigFourScore: isBigFour ? buildBigFourScore(contentId, params.title, params.sseGlobalScore) : null,
    correctivePlan: null,
    complianceChecks: [],
    editorialStructure: buildEditorialStructure(params.title),
    linkedInPosts: null,
    seoArticle: null,
    shortsScripts: [],
    qualityScore: isBigFour ? params.sseGlobalScore : 0,
    qualityChecks: [],
    downloads: buildAllDownloads(contentId, 'SCRIPT_MASTER_GENERATED'),
    createdAt: now,
    updatedAt: now,
    uploadedAt: null,
    publishedAt: null,
    youtubeUrl: null,
    agentAssigned: 'KOS™ SSE → Big Four Factory Auto-Production',
    priority: params.sseGlobalScore >= 93 ? 'critical' : 'high',
    // Extended fields via type assertion
    ...({
      sseGenerated: true,
      sseArticleId: params.sseArticleId,
      sseGlobalScore: params.sseGlobalScore,
      recommendedVoiceId: params.recommendedVoiceId,
      recommendedVoiceName: voiceName,
      sourceArticleUrl: params.sourceArticleUrl,
    } as Record<string, unknown>),
  } as ContentItem & Record<string, unknown>;
}

// ─── EXPORT : Tous les articles SSE approuvés → ContentItems pour le Studio ───

export function getSSEBigFourContentItems(): ContentItem[] {
  const approvedArticles = SOCIAL_SELLING_ARTICLES.filter(
    (a) => a.status === 'approved' && a.scoring.authorized && a.scoring.globalScore >= 90,
  );

  return approvedArticles.map((article) => {
    const params = buildSSEFactoryParams(article);
    return buildContentItemFromSSE(params);
  });
}

// ─── EXPORT : Nombre d'articles SSE prêts pour production Big Four ────────────

export function getSSEReadyCount(): number {
  return SOCIAL_SELLING_ARTICLES.filter(
    (a) => a.status === 'approved' && a.scoring.authorized && a.scoring.globalScore >= 90,
  ).length;
}