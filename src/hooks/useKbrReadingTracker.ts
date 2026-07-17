import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface KbrReadingEvent {
  article_id: string;
  article_slug: string;
  article_title: string;
  article_category?: string;
  article_edition?: string;
  article_reading_time?: number;
  article_author?: string;
  event_type: 'read' | 'close' | 'direct_link';
  time_spent_seconds?: number;
  engagement_level?: 'shallow' | 'medium' | 'deep';
  source?: string;
}

export function useKbrReadingTracker() {
  const trackReading = useCallback(async (event: KbrReadingEvent): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('kbr_reading_events')
        .insert({
          article_id: event.article_id,
          article_slug: event.article_slug,
          article_title: event.article_title,
          article_category: event.article_category || null,
          article_edition: event.article_edition || null,
          article_reading_time: event.article_reading_time || null,
          article_author: event.article_author || null,
          event_type: event.event_type,
          time_spent_seconds: event.time_spent_seconds || 0,
          engagement_level: event.engagement_level || null,
          source: event.source || null,
          user_agent: navigator.userAgent.substring(0, 500),
        });

      if (error) {
        // Silently fail — tracking should never break UX
        if (import.meta.env.DEV) console.warn('[KBR Tracking] Supabase insert failed:', error.message);
        return false;
      }
      return true;
    } catch (err: any) {
      if (import.meta.env.DEV) console.warn('[KBR Tracking] Error:', err.message);
      return false;
    }
  }, []);

  return { trackReading };
}