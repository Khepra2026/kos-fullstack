// ============================================================
// KOS Auto LinkedIn Generator
// Génère automatiquement 3 posts LinkedIn par nouvel article
// Détecte les articles sans posts existants via le source_url
// ============================================================

import { ARTICLES_GENERATED } from '@/mocks/kosGeneratedArticles';
import type { SocialQueueItem } from '@/mocks/socialAutomationQueue';

function slugFromUrl(url: string): string | null {
  const match = url.match(/\/blog\/([^/?#]+)/);
  return match ? match[1] : null;
}

export function getExistingArticleSlugs(existingQueue: SocialQueueItem[]): Set<string> {
  const slugs = new Set<string>();
  for (const item of existingQueue) {
    const slug = slugFromUrl(item.source_url);
    if (slug) slugs.add(slug);
  }
  return slugs;
}

function cleanHashtag(tag: string): string {
  return tag.replace(/[^a-zA-Z0-9\u00C0-\u024F]/g, '').trim();
}

function formatHashtags(tags: string[]): string[] {
  return [...new Set(tags.slice(0, 7).map(cleanHashtag).filter(Boolean))];
}

function bulletEmoji(index: number): string {
  const emojis = ['📊', '🔍', '⚡', '🛡️', '📋', '💰', '⏱️', '🔐'];
  return emojis[index % emojis.length];
}

function pillarEmoji(status: string, score: string): string {
  if (status === 'critical') return '🔴';
  const numScore = parseInt(score, 10);
  if (!isNaN(numScore)) {
    if (numScore < 40) return '🔴';
    if (numScore < 60) return '🟡';
    return '🟢';
  }
  return '🟡';
}

export function generateAutoLinkedInPosts(existingQueue: SocialQueueItem[]): SocialQueueItem[] {
  const existingSlugs = getExistingArticleSlugs(existingQueue);
  const newPosts: SocialQueueItem[] = [];

  const maxId = existingQueue.reduce((max, i) => Math.max(max, i.id), 0);
  let nextId = maxId + 1;

  for (const article of ARTICLES_GENERATED) {
    if (existingSlugs.has(article.slug)) continue;
    if (article.status !== 'published') continue;

    const tags = formatHashtags(article.tags);
    const url = `https://khepraexperts.com/blog/${article.slug}`;
    const now = new Date().toISOString();
    const authorName = article.author?.split(',')[0]?.trim() || article.author;

    // Schedule over 4 calendar days from now, within business hours
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    startDate.setHours(8, 0, 0, 0);

    const day2 = new Date(startDate);
    day2.setDate(day2.getDate() + 2);
    const day4 = new Date(startDate);
    day4.setDate(day4.getDate() + 4);

    // ── Post 1: Article Share ──
    const sectionBullets = (article.sections || []).slice(0, 4)
      .map((s, i) => `${bulletEmoji(i)} ${s.title}`)
      .join('\n');

    const excerpt1 = article.executive_summary?.substring(0, 220) || article.subtitle || '';
    const post1Title = article.title;
    const post1Content = `📰 ${article.title}\n\n${excerpt1}\n\n${sectionBullets ? `Au sommaire :\n\n${sectionBullets}\n\n` : ''}🔗 Article complet — ${article.readTime || '12 min'} de lecture : ${url}\n\n${tags.map(t => `#${t}`).join(' ')}`;

    newPosts.push({
      id: nextId++,
      platform: 'linkedin',
      post_type: 'article',
      title: post1Title,
      content: post1Content,
      excerpt: excerpt1,
      source_url: url,
      hashtags: tags,
      template_id: `AUTO-GEN-${article.id}`,
      scheduled_for: startDate.toISOString(),
      generated_at: now,
      status: 'draft',
      priority: 1,
      engagement_estimate: 'high',
      agent_generated: 'kos-auto-linkedin-generator',
      metadata: {
        article_id: article.id,
        article_slug: article.slug,
        article_author: authorName,
        post_type: 'article_share',
        auto_generated: true,
      },
      created_at: now,
    });

    // ── Post 2: Insight Snippet ──
    const insight = article.executive_insight;
    const insightBullets = insight?.insights?.slice(0, 3)
      .map((ins, i) => `${i + 1}️⃣ ${ins}`)
      .join('\n\n') || '';

    const riskText = insight?.underestimated_risk || '';
    const oppText = insight?.immediate_opportunity || '';
    const post2Title = riskText
      ? `${article.title.split(':')[0].trim()} — ${riskText.substring(0, 80)}`
      : article.title;
    const post2Content = `⚡ ${riskText}\n\n${insightBullets}\n\n${oppText ? `${oppText}\n\n` : ''}${tags.slice(0, 5).map(t => `#${t}`).join(' ')}`;

    newPosts.push({
      id: nextId++,
      platform: 'linkedin',
      post_type: 'insight',
      title: post2Title,
      content: post2Content,
      excerpt: riskText.substring(0, 200) || insightBullets.split('\n')[0] || article.subtitle,
      source_url: url,
      hashtags: tags.slice(0, 5),
      template_id: `AUTO-GEN-${article.id}`,
      scheduled_for: day2.toISOString(),
      generated_at: now,
      status: 'draft',
      priority: 2,
      engagement_estimate: 'medium',
      agent_generated: 'kos-auto-linkedin-generator',
      metadata: {
        article_id: article.id,
        article_slug: article.slug,
        article_author: authorName,
        post_type: 'insight_snippet',
        auto_generated: true,
      },
      created_at: now,
    });

    // ── Post 3: Framework Highlight ──
    const fw = article.framework;
    const fwName = fw?.name || '';
    const fwDesc = fw?.description || '';
    const pillars = fw?.pillars || [];

    const pillarLines = pillars.length > 0
      ? pillars.map(p => `${pillarEmoji(p.status, p.score)} ${p.label} (Score: ${p.score})`).join('\n')
      : '';

    const post3Title = fwName
      ? `${fwName} — ${fwDesc.substring(0, 70)}`
      : article.title;
    const post3Content = `📊 ${fwName}${fwDesc ? ` — ${fwDesc}` : ''}\n\n${pillarLines ? `${pillars.length} piliers d'évaluation :\n\n${pillarLines}\n\n` : ''}${article.cta?.title ? `${article.cta.title}\n\n` : ''}${['KOSFramework', ...tags.slice(0, 4)].map(t => `#${t}`).join(' ')}`;

    newPosts.push({
      id: nextId++,
      platform: 'linkedin',
      post_type: 'analyse',
      title: post3Title,
      content: post3Content,
      excerpt: fwDesc || article.subtitle,
      source_url: url,
      hashtags: ['KOSFramework', ...tags.slice(0, 4)],
      template_id: `AUTO-GEN-${article.id}`,
      scheduled_for: day4.toISOString(),
      generated_at: now,
      status: 'draft',
      priority: 3,
      engagement_estimate: 'medium',
      agent_generated: 'kos-auto-linkedin-generator',
      metadata: {
        article_id: article.id,
        article_slug: article.slug,
        article_author: authorName,
        post_type: 'framework_highlight',
        auto_generated: true,
      },
      created_at: now,
    });
  }

  return newPosts;
}