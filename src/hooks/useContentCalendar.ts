import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { ContentTheme } from '@/mocks/kosContentCalendar';
import { NOVEMBER_BATCH_IDS } from '@/mocks/kosContentCalendar';

interface CalendarState {
  themes: ContentTheme[];
  loading: boolean;
  error: string | null;
  source: 'live' | 'mock';
}

export function useContentCalendar() {
  const [state, setState] = useState<CalendarState>({
    themes: [],
    loading: true,
    error: null,
    source: 'mock',
  });

  const fetchThemes = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { data, error: supabaseError } = await supabase
        .from('kos_content_thematiques')
        .select('*')
        .order('id', { ascending: true });

      if (supabaseError) throw supabaseError;
      if (data && data.length > 0) {
        setState({ themes: data as ContentTheme[], loading: false, error: null, source: 'live' });
        return;
      }
      throw new Error('No data');
    } catch (err) {
      console.warn('[useContentCalendar] Supabase fetch failed, using mock:', (err as Error)?.message);
      // Fallback: try to fetch from Supabase one more time
      try {
        const { data } = await supabase.from('kos_content_thematiques').select('*').order('id', { ascending: true });
        if (data && data.length > 0) {
          setState({ themes: data as ContentTheme[], loading: false, error: null, source: 'live' });
          return;
        }
      } catch (_) { /* fall through to mock */ }
      setState({ themes: [], loading: false, error: null, source: 'mock' });
    }
  }, []);

  useEffect(() => {
    fetchThemes();
  }, [fetchThemes]);

  const novemberBatch = state.themes.filter(t => NOVEMBER_BATCH_IDS.includes(t.id));
  const clusters = [...new Set(state.themes.map(t => t.cluster))].sort();
  const levels = [...new Set(state.themes.map(t => t.niveau))].sort();
  const formats = [...new Set(state.themes.map(t => t.format_type))].sort();

  return { ...state, novemberBatch, clusters, levels, formats, refresh: fetchThemes };
}