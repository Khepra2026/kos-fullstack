import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { aiVisibilitySupremacy, youtubeAutopilot, llmApiGateway } from '@/mocks/kosAutonomousAIMedia';

export function useKOSAutonomousAIMedia() {
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data: liveData, error } = await supabase
        .from('studio_media_requests')
        .select('*')
        .limit(1);
      if (!error && liveData && liveData.length > 0) {
        setIsLive(true);
      }
    } catch {
      // fallback mock
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  return { aiVisibilitySupremacy, youtubeAutopilot, llmApiGateway, loading, isLive, refetch };
}