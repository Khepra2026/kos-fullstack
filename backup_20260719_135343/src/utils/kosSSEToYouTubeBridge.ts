// ═══════════════════════════════════════════════════════════════════
// KOS SSE → YouTube Production Pipeline Bridge
// Convertit les articles approuvés du Social Selling Engine (Hub 85)
// en ScriptGeneration pour le pipeline YouTube (Hub 77)
// ═══════════════════════════════════════════════════════════════════

import { SOCIAL_SELLING_ARTICLES } from '@/mocks/linkedInSocialSellingEngine';
import type { ScriptGeneration } from '@/mocks/youtubeProductionPipeline';

function extractKeywords(article: typeof SOCIAL_SELLING_ARTICLES[number]): string[] {
  const tags = article.contentBundle.hashtags
    .map((t) => t.replace('#', '').trim())
    .filter(Boolean);

  const seoWords = article.contentBundle.nativeArticle.title
    .split(' ')
    .filter((w) => w.length > 4)
    .slice(0, 5);

  const unique = [...new Set([...tags, ...seoWords])];
  return unique.slice(0, 8);
}

function determineScriptType(article: typeof SOCIAL_SELLING_ARTICLES[number]): ScriptGeneration['type'] {
  const title = article.title.toLowerCase();
  if (title.includes('guide')) return 'formation';
  if (title.includes('diagnostic')) return 'capsule';
  if (title.includes('analyse') || title.includes('décryptage')) return 'analyse';
  return 'podcast';
}

function estimateDuration(article: typeof SOCIAL_SELLING_ARTICLES[number]): string {
  const wordCount = article.contentBundle.nativeArticle.wordCount || 1500;
  if (wordCount > 2000) return '22 min';
  if (wordCount > 1500) return '16 min';
  if (wordCount > 1000) return '12 min';
  return '8 min';
}

function countReferences(article: typeof SOCIAL_SELLING_ARTICLES[number]): number {
  const sections = article.contentBundle.nativeArticle.sections.length;
  return Math.min(sections * 2 + 2, 15);
}

/**
 * Génère les entrées ScriptGeneration à partir des articles SSE approuvés (score ≥ 90).
 * Chaque article approuvé génère un script YouTube complet.
 */
export function generateSSEYouTubeScripts(existingScripts: ScriptGeneration[]): ScriptGeneration[] {
  const approvedArticles = SOCIAL_SELLING_ARTICLES.filter(
    (a) => a.status === 'approved' && a.scoring.authorized && a.scoring.globalScore >= 90,
  );

  if (approvedArticles.length === 0) return [];

  const existingSSEIds = new Set(
    existingScripts
      .filter((s) => (s as Record<string, unknown>).sseGenerated === true)
      .map((s) => s.scriptId),
  );

  const maxId = existingScripts.reduce((max, s) => {
    const num = parseInt(s.scriptId.replace('SCR-', '').replace('SSE-', ''), 10);
    return Math.max(max, isNaN(num) ? 0 : num);
  }, 0);

  let nextId = maxId + 1;
  const now = new Date().toISOString();
  const newScripts: ScriptGeneration[] = [];

  for (const article of approvedArticles) {
    const scriptId = `SSE-${String(nextId).padStart(3, '0')}`;
    if (existingSSEIds.has(scriptId)) {
      nextId++;
      continue;
    }

    const keywords = extractKeywords(article);
    const bundle = article.contentBundle;
    const nativeArticle = bundle.nativeArticle;

    const scriptTitle = `${nativeArticle.title} | KHEPRA EXPERTS`;

    newScripts.push({
      scriptId,
      title: scriptTitle,
      type: determineScriptType(article),
      duration: estimateDuration(article),
      tone: 'Big Four — Institutionnel expert (SSE 90+)',
      references: countReferences(article),
      seoKeywords: keywords,
      qualityScore: article.scoring.globalScore / 10,
      status: 'approved',
      createdAt: now,
      // Extension fields — preserved via type assertion
      ...({
        sseGenerated: true,
        sseArticleId: article.id,
        sseGlobalScore: article.scoring.globalScore,
        sseHookScore: article.scoring.hookScore,
        source: 'kos-linkedin-social-selling-engine',
      } as Record<string, unknown>),
    } as ScriptGeneration & Record<string, unknown>);

    nextId++;
  }

  return newScripts;
}

/**
 * Vérifie si des articles SSE sont déjà présents dans la liste de scripts
 * pour éviter les doublons.
 */
export function getExistingSSEScriptIds(existingScripts: ScriptGeneration[]): Set<string> {
  const ids = new Set<string>();
  for (const s of existingScripts) {
    const sseId = (s as Record<string, unknown>).sseArticleId as string | undefined;
    if (sseId) ids.add(sseId);
  }
  return ids;
}



