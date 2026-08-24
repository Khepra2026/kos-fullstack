// ═══════════════════════════════════════════════════════════════════
// KOS SSE → Social Media Command Bridge
// Convertit les articles approuvés du Social Selling Engine (Hub 85)
// en SocialQueueItem pour la file d'attente LinkedIn (Hub 28)
// ═══════════════════════════════════════════════════════════════════

import { SOCIAL_SELLING_ARTICLES } from '@/mocks/linkedInSocialSellingEngine';
import type { SocialQueueItem } from '@/mocks/socialAutomationQueue';

function cleanHashtag(tag: string): string {
  return tag.replace(/[^a-zA-Z0-9\u00C0-\u024F]/g, '').trim();
}

function formatHashtags(tags: string[]): string[] {
  return [...new Set(tags.map(cleanHashtag).filter(Boolean))];
}

/**
 * Génère les entrées de file d'attente à partir des articles SSE approuvés (score ≥ 90).
 * Chaque article approuvé génère jusqu'à 3 posts LinkedIn :
 * 1. Post principal (le hook + post LinkedIn complet)
 * 2. Version dirigeant (autorité + personal branding)
 * 3. Commentaire d'amplification (engagement + CTA)
 */
export function generateSSEQueuePosts(existingQueue: SocialQueueItem[]): SocialQueueItem[] {
  const approvedArticles = SOCIAL_SELLING_ARTICLES.filter(
    (a) => a.status === 'approved' && a.scoring.authorized && a.scoring.globalScore >= 90,
  );

  if (approvedArticles.length === 0) return [];

  const maxId = existingQueue.reduce((max, i) => Math.max(max, i.id), 0);
  let nextId = maxId + 1;
  const now = new Date().toISOString();
  const newPosts: SocialQueueItem[] = [];

  for (const article of approvedArticles) {
    const bundle = article.contentBundle;
    const tags = formatHashtags(bundle.hashtags);

    // Calculate scheduling: spread across next 5 business days
    const today = new Date();
    const daysToAdd = (newPosts.length % 5) + 1;
    const scheduleDate = new Date(today);
    scheduleDate.setDate(today.getDate() + daysToAdd);
    scheduleDate.setHours(8, 0, 0, 0);

    // ── Post 1 : Post LinkedIn Principal (Haute Priorité) ──
    const post1Title = article.title;
    newPosts.push({
      id: nextId++,
      platform: 'linkedin',
      post_type: 'article',
      title: post1Title,
      content: bundle.postLinkedIn,
      excerpt: bundle.hook,
      source_url: bundle.trackedURL.fullTrackedURL,
      hashtags: tags,
      template_id: 'SSE-BIGFOUR-APPROVED',
      scheduled_for: scheduleDate.toISOString(),
      generated_at: now,
      status: 'scheduled',
      priority: 1,
      engagement_estimate: 'high',
      agent_generated: 'kos-linkedin-social-selling-engine',
      metadata: {
        sse_article_id: article.id,
        sse_global_score: article.scoring.globalScore,
        source: 'kos-linkedin-social-selling-engine',
        audit_status: 'APPROVED-BIG-FOUR-90+',
        post_type: 'post_principal',
        hook_score: article.scoring.hookScore,
        sse_approved: true,
      },
      created_at: now,
    });

    // ── Post 2 : Version Dirigeant (Autorité + Personal Branding) ──
    const dirDate = new Date(scheduleDate);
    dirDate.setDate(dirDate.getDate() + 2);
    dirDate.setHours(12, 0, 0, 0);

    const dirTitle = `${article.title} — Message du Managing Partner`;
    newPosts.push({
      id: nextId++,
      platform: 'linkedin',
      post_type: 'insight',
      title: dirTitle,
      content: bundle.versionDirigeant,
      excerpt: bundle.versionDirigeant.substring(0, 220).replace(/\n/g, ' '),
      source_url: bundle.trackedURL.fullTrackedURL,
      hashtags: tags.slice(0, 5),
      template_id: 'SSE-BIGFOUR-APPROVED',
      scheduled_for: dirDate.toISOString(),
      generated_at: now,
      status: 'scheduled',
      priority: 2,
      engagement_estimate: 'high',
      agent_generated: 'kos-linkedin-social-selling-engine',
      metadata: {
        sse_article_id: article.id,
        sse_global_score: article.scoring.globalScore,
        source: 'kos-linkedin-social-selling-engine',
        audit_status: 'APPROVED-BIG-FOUR-90+',
        post_type: 'version_dirigeant',
        sse_approved: true,
      },
      created_at: now,
    });

    // ── Post 3 : Commentaire d'Amplification ──
    const ampDate = new Date(scheduleDate);
    ampDate.setDate(ampDate.getDate() + 3);
    ampDate.setHours(10, 0, 0, 0);

    newPosts.push({
      id: nextId++,
      platform: 'linkedin',
      post_type: 'question',
      title: `📥 ${article.title} — Ressource gratuite`,
      content: bundle.amplificationComment.content,
      excerpt: bundle.amplificationComment.content.substring(0, 200),
      source_url: bundle.trackedURL.fullTrackedURL,
      hashtags: tags.slice(0, 4),
      template_id: 'SSE-BIGFOUR-APPROVED',
      scheduled_for: ampDate.toISOString(),
      generated_at: now,
      status: 'scheduled',
      priority: 3,
      engagement_estimate: 'medium',
      agent_generated: 'kos-linkedin-social-selling-engine',
      metadata: {
        sse_article_id: article.id,
        sse_global_score: article.scoring.globalScore,
        source: 'kos-linkedin-social-selling-engine',
        audit_status: 'APPROVED-BIG-FOUR-90+',
        post_type: 'amplification_comment',
        sse_approved: true,
      },
      created_at: now,
    });
  }

  return newPosts;
}

/**
 * Vérifie si des articles SSE sont déjà présents dans la file d'attente
 * pour éviter les doublons lors des re-générations.
 */
export function getExistingSSEArticleIds(existingQueue: SocialQueueItem[]): Set<string> {
  const ids = new Set<string>();
  for (const item of existingQueue) {
    const sseId = item.metadata?.sse_article_id as string | undefined;
    if (sseId) ids.add(sseId);
  }
  return ids;
}



