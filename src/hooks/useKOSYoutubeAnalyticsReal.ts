import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface RealChannelStats {
  views: number;
  subscribers: number;
  videos: number;
}

export interface RealAnalyticsSummary {
  views30d: number;
  watchTimeHours30d: number;
  subscribersGained30d: number;
  subscribersLost30d: number;
  netSubs30d: number;
  likes30d: number;
  comments30d: number;
  shares30d: number;
}

export interface RealVideoItem {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  duration: number;
  durationFormatted: string;
  views: number;
  likes: number;
  comments: number;
  thumbnailUrl: string;
  tags: string[];
  views30d?: number;
  watchTimeMin30d?: number;
  subsGained30d?: number;
  ctr?: number;
}

export interface RealAnalyticsData {
  loading: boolean;
  error: string | null;
  oauthConnected: boolean;
  realData: boolean;
  channel: RealChannelStats & { id: string; name: string; handle: string };
  summary: RealAnalyticsSummary;
  videos: RealVideoItem[];
  period: { start: string; end: string };
  refresh: () => Promise<void>;
  // Detailled video fetch
  fetchVideoPerformance: () => Promise<RealVideoItem[]>;
}

export function useKOSYoutubeAnalyticsReal(): RealAnalyticsData {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [oauthConnected, setOauthConnected] = useState(false);
  const [realData, setRealData] = useState(false);
  const [channel, setChannel] = useState<RealChannelStats & { id: string; name: string; handle: string }>({
    id: 'UCjkq4dMhKIW1LbMNXYHjjLg',
    name: 'KHEPRA EXPERTS',
    handle: '@KHEPRAEXPERTS',
    views: 0,
    subscribers: 0,
    videos: 0,
  });
  const [summary, setSummary] = useState<RealAnalyticsSummary>({
    views30d: 0,
    watchTimeHours30d: 0,
    subscribersGained30d: 0,
    subscribersLost30d: 0,
    netSubs30d: 0,
    likes30d: 0,
    comments30d: 0,
    shares30d: 0,
  });
  const [videos, setVideos] = useState<RealVideoItem[]>([]);
  const [period, setPeriod] = useState({ start: '', end: '' });

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('kos-youtube-analytics', {
        body: { action: 'dashboard' },
      });

      if (fnError) {
        setError(fnError.message || 'Edge Function unreachable');
        setOauthConnected(false);
        setRealData(false);
        setLoading(false);
        return;
      }

      if (data) {
        setOauthConnected(data.oauth_connected || false);
        setRealData(data.real_data || false);

        if (data.channel) {
          setChannel({
            id: data.channel.id || 'UCjkq4dMhKIW1LbMNXYHjjLg',
            name: data.channel.name || 'KHEPRA EXPERTS',
            handle: data.channel.handle || '@KHEPRAEXPERTS',
            views: data.channel.views || 0,
            subscribers: data.channel.subscribers || 0,
            videos: data.channel.videos || 0,
          });
        }

        if (data.summary) {
          setSummary(data.summary as RealAnalyticsSummary);
        }

        if (data.videos) {
          setVideos(data.videos as RealVideoItem[]);
        }

        if (data.period) {
          setPeriod(data.period);
        }
      }
    } catch (err) {
      setError((err as Error).message);
      setOauthConnected(false);
      setRealData(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVideoPerformance = useCallback(async (): Promise<RealVideoItem[]> => {
    try {
      const { data } = await supabase.functions.invoke('kos-youtube-analytics', {
        body: { action: 'video_performance' },
      });
      if (data?.videos) {
        setVideos(data.videos as RealVideoItem[]);
        return data.videos as RealVideoItem[];
      }
    } catch { /* silent */ }
    return [];
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    loading,
    error,
    oauthConnected,
    realData,
    channel,
    summary,
    videos,
    period,
    refresh,
    fetchVideoPerformance,
  };
}