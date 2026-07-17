// ============================================================
// KOS Auto X (Twitter) Generator
// Génère automatiquement 2 posts X/Twitter par nouvel article
// Format court, punchy, optimisé pour l'engagement X
// ============================================================

import { ARTICLES_GENERATED } from '@/mocks/kosGeneratedArticles';
import type { SocialQueueItem } from '@/mocks/socialAutomationQueue';

function slugFromUrl(url: string): string | null {
  const match = url.match(/\/blog\/([^/?#]+)/);
  return match ? match[1] : null;
}

export function getExistingXArticleSlugs(existingQueue: SocialQueueItem[]): Set<string> {
  const slugs = new Set<string>();
  for (const item of existingQueue) {
    if (item.platform !== 'x') continue;
    const slug = slugFromUrl(item.source_url);
    if (slug) slugs.add(slug);
  }
  return slugs;
}

function cleanHashtag(tag: string): string {
  return tag.replace(/[^a-zA-Z0-9\u00C0-\u024F]/g, '').trim();
}

function truncateToChars(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return text.substring(0, maxChars - 3) + '...';
}

// X posts should stay under 280 chars for broad compatibility,
// though X Premium allows longer. We target 260 to leave room for URL.
const X_CHAR_LIMIT = 260;

export function generateAutoXPosts(existingQueue: SocialQueueItem[]): SocialQueueItem[] {
  const existingSlugs = getExistingXArticleSlugs(existingQueue);
  const newPosts: SocialQueueItem[] = [];

  const maxId = existingQueue.reduce((max, i) => Math.max(max, i.id), 0);
  let nextId = maxId + 1;

  for (const article of ARTICLES_GENERATED) {
    if (existingSlugs.has(article.slug)) continue;
    if (article.status !== 'published') continue;

    const url = `https://khepraexperts.com/blog/${article.slug}`;
    const now = new Date().toISOString();
    const authorName = article.author?.split(',')[0]?.trim() || article.author;

    // X tags: only 1-2 max, the most impactful
    const primaryTag = cleanHashtag(article.tags[0] || 'Finance');
    const secondaryTag = article.tags.length > 1 ? cleanHashtag(article.tags[1]) : null;
    const xHashtags = secondaryTag ? [primaryTag, secondaryTag] : [primaryTag];

    // Schedule X posts on different days than LinkedIn (Tue/Thu/Sat)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 2); // J+2
    startDate.setHours(10, 0, 0, 0);

    const day4 = new Date(startDate);
    day4.setDate(day4.getDate() + 2); // J+4

    // ── X Post 1: Punchy Insight (format court, stats choc) ──
    const insight = article.executive_insight;
    const riskText = insight?.underestimated_risk || '';
    const statsBullet = insight?.insights?.[0] || '';

    // Build punchy X post
    const hookLine = riskText
      ? `${riskText.substring(0, 100).replace(/\.$/, '')}.`
      : `${article.title.split(':')[0].trim()}.`;

    const statLine = statsBullet
      ? `\n\n${statsBullet.substring(0, 120)}`
      : '';

    const xPost1Body = truncateToChars(
      `${hookLine}${statLine}\n\n${primaryTag ? `#${primaryTag}` : ''}`,
      X_CHAR_LIMIT
    );

    newPosts.push({
      id: nextId++,
      platform: 'x',
      post_type: 'insight',
      title: article.title.split(':')[0].trim(),
      content: xPost1Body,
      excerpt: hookLine.substring(0, 180),
      source_url: url,
      hashtags: xHashtags,
      template_id: `AUTO-X-${article.id}`,
      scheduled_for: startDate.toISOString(),
      generated_at: now,
      status: 'draft',
      priority: 2,
      engagement_estimate: 'medium',
      agent_generated: 'kos-auto-x-generator',
      metadata: {
        article_id: article.id,
        article_slug: article.slug,
        article_author: authorName,
        post_type: 'x_insight',
        auto_generated: true,
      },
      created_at: now,
    });

    // ── X Post 2: Thread Starter — 3 takeaways ──
    const sections = article.sections?.slice(0, 3) || [];
    const takeawayLines = sections
      .map((s, i) => `${i + 1}️⃣ ${s.title.substring(0, 60)}`)
      .join('\n');

    const xCTA = article.cta?.title
      ? `\n\n📎 ${article.cta.title.substring(0, 80)}`
      : `\n\n📎 ${article.readTime || '10 min'} de lecture`;

    const xPost2Body = truncateToChars(
      `${article.title.split(':')[0].trim()} — les 3 points clés :\n\n${takeawayLines}${xCTA}\n\n${url}`,
      X_CHAR_LIMIT
    );

    newPosts.push({
      id: nextId++,
      platform: 'x',
      post_type: 'thread',
      title: `${article.title.split(':')[0].trim()} — Thread`,
      content: xPost2Body,
      excerpt: `${article.title.split(':')[0].trim()} — les 3 points clés`,
      source_url: url,
      hashtags: [primaryTag],
      template_id: `AUTO-X-${article.id}`,
      scheduled_for: day4.toISOString(),
      generated_at: now,
      status: 'draft',
      priority: 3,
      engagement_estimate: 'medium',
      agent_generated: 'kos-auto-x-generator',
      metadata: {
        article_id: article.id,
        article_slug: article.slug,
        article_author: authorName,
        post_type: 'x_thread',
        auto_generated: true,
      },
      created_at: now,
    });
  }

  return newPosts;
}