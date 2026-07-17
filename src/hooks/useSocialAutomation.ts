import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { MOCK_SOCIAL_QUEUE, type SocialQueueItem } from '@/mocks/socialAutomationQueue';
import { generateAutoLinkedInPosts } from '@/utils/kosAutoLinkedInGenerator';
import { generateAutoXPosts } from '@/utils/kosAutoXGenerator';
import { generateSSEQueuePosts, getExistingSSEArticleIds } from '@/utils/kosSSEToQueueBridge';

interface SocialAutomationState {
  queue: SocialQueueItem[];
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    scheduled: number;
    draft: number;
    published: number;
    engagement_high: number;
    this_week: number;
  };
  source: 'live' | 'mock';
}

function computeStats(items: SocialQueueItem[]) {
  const now = new Date();
  const weekEnd = new Date(now);
  weekEnd.setDate(now.getDate() + 7);
  return {
    total: items.length,
    scheduled: items.filter(i => i.status === 'scheduled').length,
    draft: items.filter(i => i.status === 'draft').length,
    published: items.filter(i => i.status === 'published').length,
    engagement_high: items.filter(i => i.engagement_estimate === 'high').length,
    this_week: items.filter(i => i.scheduled_for && new Date(i.scheduled_for) <= weekEnd).length,
  };
}

function mapRowToItem(row: Record<string, unknown>): SocialQueueItem {
  return {
    id: row.id as number,
    platform: (row.platform as string) || 'linkedin',
    post_type: (row.post_type as string) || 'article',
    title: (row.title as string) || '',
    content: (row.content as string) || '',
    excerpt: (row.excerpt as string) || '',
    source_url: (row.source_url as string) || '',
    hashtags: Array.isArray(row.hashtags) ? row.hashtags as string[] : [],
    template_id: (row.template_id as string) || null,
    scheduled_for: (row.scheduled_for as string) || null,
    generated_at: (row.generated_at as string) || (row.created_at as string) || new Date().toISOString(),
    status: (row.status as SocialQueueItem['status']) || 'draft',
    priority: (row.priority as number) || 5,
    engagement_estimate: (row.engagement_estimate as SocialQueueItem['engagement_estimate']) || 'medium',
    agent_generated: (row.agent_generated as string) || 'kos-social-content-generator',
    metadata: (row.metadata as Record<string, unknown>) || {},
    created_at: (row.created_at as string) || new Date().toISOString(),
  };
}

export function useSocialAutomation() {
  const [state, setState] = useState<SocialAutomationState>({
    queue: [],
    loading: true,
    error: null,
    stats: { total: 0, scheduled: 0, draft: 0, published: 0, engagement_high: 0, this_week: 0 },
    source: 'mock',
  });

  const refresh = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { data, error } = await supabase
        .from('social_automation_queue')
        .select('*')
        .order('priority', { ascending: true })
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const items: SocialQueueItem[] = (data as Record<string, unknown>[]).map(mapRowToItem);
        const autoLinkedIn = generateAutoLinkedInPosts(items);
        const allAfterLI = [...items, ...autoLinkedIn];
        const autoX = generateAutoXPosts(allAfterLI);
        const allAfterX = [...allAfterLI, ...autoX];
        const ssePosts = generateSSEQueuePosts(allAfterX);
        const mergedQueue = [...allAfterX, ...ssePosts];
        setState({
          queue: mergedQueue,
          loading: false,
          error: null,
          stats: computeStats(mergedQueue),
          source: 'live',
        });
        return;
      }

      if (error) {
        console.warn('[useSocialAutomation] Supabase fetch failed, using mock:', error.message);
      }
    } catch (err) {
      console.warn('[useSocialAutomation] Exception, using mock:', (err as Error)?.message);
    }

    // Fallback to mock — merge with auto-generated posts from new articles (LI + X) + SSE approved posts
    const mockItems = [...MOCK_SOCIAL_QUEUE];
    const autoLinkedIn = generateAutoLinkedInPosts(mockItems);
    const allAfterLI = [...mockItems, ...autoLinkedIn];
    const autoX = generateAutoXPosts(allAfterLI);
    const allAfterX = [...allAfterLI, ...autoX];
    const ssePosts = generateSSEQueuePosts(allAfterX);
    const mergedQueue = [...allAfterX, ...ssePosts];
    setState({
      queue: mergedQueue,
      loading: false,
      error: null,
      stats: computeStats(mergedQueue),
      source: 'mock',
    });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { ...state, refresh };
}