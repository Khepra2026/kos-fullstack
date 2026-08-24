import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';

export interface TranscriptChannelConfig {
  channelId: string;
  channelHandle: string;
  checkIntervalMs: number;
}

export interface DetectedVideo {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  duration: string;
  thumbnailUrl: string;
  url: string;
  hasTranscript: boolean;
  transcript?: string;
  language: string;
}

export interface TranscriptResult {
  videoId: string;
  transcript: string;
  language: string;
  segments: { start: number; duration: number; text: string }[];
}

export type EngineStatus = 'idle' | 'scanning' | 'downloading' | 'processing' | 'ready' | 'error';

export interface TranscriptEngineState {
  status: EngineStatus;
  lastScanAt: string | null;
  videosDetected: DetectedVideo[];
  videosProcessed: number;
  totalTranscripts: number;
  errorMessage: string | null;
  apiKeyConfigured: boolean;
}

const DEFAULT_CHANNEL: TranscriptChannelConfig = {
  channelId: '@KHEPRAEXPERTS',
  channelHandle: '@KHEPRAEXPERTS',
  checkIntervalMs: 900000, // 15 minutes
};

function extractVideoId(url: string): string {
  const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : url;
}

function parseDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '—';
  const h = match[1] ? `${match[1]}h ` : '';
  const m = match[2] ? `${match[2]}min ` : '';
  const s = match[3] ? `${match[3]}s` : '';
  return `${h}${m}${s}`.trim() || '—';
}

export function useKOSYouTubeTranscriptEngine(config: Partial<TranscriptChannelConfig> = {}) {
  const channelConfig = { ...DEFAULT_CHANNEL, ...config };
  const [engineState, setEngineState] = useState<TranscriptEngineState>({
    status: 'idle',
    lastScanAt: null,
    videosDetected: [],
    videosProcessed: 0,
    totalTranscripts: 0,
    errorMessage: null,
    apiKeyConfigured: !!import.meta.env.VITE_PUBLIC_YOUTUBE_DATA_API_KEY,
  });

  const scanIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isScanning = useRef(false);

  const getApiKey = useCallback(async (): Promise<string | null> => {
    const envKey = import.meta.env.VITE_PUBLIC_YOUTUBE_DATA_API_KEY;
    if (envKey) return envKey;

    const { data } = await supabase
      .from('platform_credentials')
      .select('credential_value')
      .eq('platform', 'youtube')
      .eq('credential_name', 'data_api_key')
      .eq('is_active', true)
      .maybeSingle();

    return data?.credential_value || null;
  }, []);

  const fetchChannelUploads = useCallback(async (apiKey: string): Promise<DetectedVideo[]> => {
    const channelSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(channelConfig.channelHandle)}&type=channel&maxResults=1&key=${apiKey}`;

    const channelRes = await fetch(channelSearchUrl);
    if (!channelRes.ok) throw new Error(`YouTube API error: ${channelRes.status}`);

    const channelData = await channelRes.json();
    if (!channelData.items?.length) {
      console.warn('[TranscriptEngine] Channel not found:', channelConfig.channelHandle);
      return [];
    }

    const ytChannelId = channelData.items[0].id.channelId;
    const uploadsUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${ytChannelId}&type=video&order=date&maxResults=10&key=${apiKey}`;

    const videosRes = await fetch(uploadsUrl);
    if (!videosRes.ok) return [];

    const videosData = await videosRes.json();
    if (!videosData.items?.length) return [];

    const videoIds = videosData.items.map((i: any) => i.id.videoId).join(',');

    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${apiKey}`;
    const detailsRes = await fetch(detailsUrl);
    if (!detailsRes.ok) return [];

    const detailsData = await detailsRes.json();

    return (detailsData.items || []).map((item: any) => ({
      videoId: item.id,
      title: item.snippet.title,
      description: item.snippet.description?.slice(0, 300) || '',
      publishedAt: item.snippet.publishedAt,
      duration: parseDuration(item.contentDetails.duration),
      thumbnailUrl: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || '',
      url: `https://www.youtube.com/watch?v=${item.id}`,
      hasTranscript: false,
      language: item.snippet.defaultLanguage || item.snippet.defaultAudioLanguage || 'fr',
    }));
  }, [channelConfig.channelHandle]);

  const fetchTranscript = useCallback(async (videoId: string, apiKey: string): Promise<TranscriptResult | null> => {
    try {
      const captionUrl = `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`;
      const captionRes = await fetch(captionUrl);
      if (!captionRes.ok) return null;

      const captionData = await captionRes.json();
      const frCaption = captionData.items?.find((c: any) =>
        c.snippet.language === 'fr' || c.snippet.trackKind === 'standard'
      );

      if (!frCaption) return null;

      const transcriptUrl = `https://www.googleapis.com/youtube/v3/captions/${frCaption.id}?tfmt=srt&key=${apiKey}`;
      const transcriptRes = await fetch(transcriptUrl);

      if (!transcriptRes.ok) {
        console.warn('[TranscriptEngine] Could not download caption body:', transcriptRes.status);
        return null;
      }

      const rawSrt = await transcriptRes.text();
      const segments = parseSrt(rawSrt);
      const fullText = segments.map((s) => s.text).join(' ');

      return {
        videoId,
        transcript: fullText,
        language: frCaption.snippet.language || 'fr',
        segments,
      };
    } catch {
      return null;
    }
  }, []);

  const scanChannel = useCallback(async (): Promise<DetectedVideo[]> => {
    if (isScanning.current) return engineState.videosDetected;
    isScanning.current = true;

    setEngineState((prev) => ({ ...prev, status: 'scanning', errorMessage: null }));

    try {
      const apiKey = await getApiKey();
      if (!apiKey) {
        setEngineState((prev) => ({
          ...prev,
          status: 'error',
          errorMessage: 'Clé API YouTube Data v3 non configurée. Ajoutez VITE_PUBLIC_YOUTUBE_DATA_API_KEY.',
          apiKeyConfigured: false,
        }));
        isScanning.current = false;
        return [];
      }

      const videos = await fetchChannelUploads(apiKey);

      setEngineState((prev) => ({
        ...prev,
        status: 'ready',
        lastScanAt: new Date().toISOString(),
        videosDetected: videos,
        apiKeyConfigured: true,
      }));

      isScanning.current = false;
      return videos;
    } catch (err: any) {
      setEngineState((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: err.message || 'Erreur de scan YouTube',
      }));
      isScanning.current = false;
      return [];
    }
  }, [engineState.videosDetected, fetchChannelUploads, getApiKey]);

  const processVideo = useCallback(async (video: DetectedVideo): Promise<boolean> => {
    setEngineState((prev) => ({ ...prev, status: 'downloading' }));

    try {
      const apiKey = await getApiKey();
      if (!apiKey) return false;

      const transcript = await fetchTranscript(video.videoId, apiKey);

      setEngineState((prev) => ({ ...prev, status: 'processing' }));

      const { error: insertError } = await supabase.from('youtube_scripts').insert({
        title: video.title,
        hook: video.description?.slice(0, 160) || '',
        script_full: transcript?.transcript || video.description,
        language: transcript?.language || video.language || 'fr',
        status: transcript ? 'completed' : 'pending_transcript',
        keywords: extractKeywords(video.title + ' ' + (video.description || '')),
        quality_score: transcript ? 85 : 50,
        metadata: {
          channel: '@KHEPRAEXPERTS',
          video_id: video.videoId,
          youtube_url: video.url,
          published_at: video.publishedAt,
          duration: video.duration,
          source_type: 'emission_tv',
          pipeline: 'youtube_clipping_opusclip',
          transcript_available: !!transcript,
          transcript_language: transcript?.language || null,
          transcript_segments_count: transcript?.segments?.length || 0,
          auto_detected: true,
          detection_engine: 'KOS_Transcript_Engine_v1',
          clips: [],
        },
        sources: [{ type: 'youtube_video', url: video.url, video_id: video.videoId, fetched_at: new Date().toISOString() }],
        chapters: transcript ? transcript.segments.map((s) => ({
          title: `Segment ${s.start}s`,
          start_seconds: s.start,
          end_seconds: s.start + s.duration,
          text: s.text.slice(0, 200),
        })) : [],
      });

      if (insertError) {
        console.error('[TranscriptEngine] Insert error:', insertError);
        return false;
      }

      await supabase.from('orchestration_logs').insert({
        mission_type: 'youtube_transcript_download',
        lead_agent: 'agent_khepra_transcript_engine',
        status: transcript ? 'completed' : 'partial',
        quality_score: transcript ? 85 : 50,
        metadata: {
          channel: '@KHEPRAEXPERTS',
          video_id: video.videoId,
          video_title: video.title,
          transcript_available: !!transcript,
          auto_triggered: true,
          next_step: transcript ? 'virality_scoring' : 'manual_transcript',
        },
        agents_activated: [{ agent_id: 'agent_khepra_transcript_engine', role: 'transcript_processor', status: 'completed' }],
      });

      setEngineState((prev) => ({
        ...prev,
        status: 'ready',
        videosProcessed: prev.videosProcessed + 1,
        totalTranscripts: prev.totalTranscripts + (transcript ? 1 : 0),
      }));

      return true;
    } catch (err: any) {
      console.error('[TranscriptEngine] Process error:', err);
      setEngineState((prev) => ({ ...prev, status: 'error', errorMessage: err.message }));
      return false;
    }
  }, [fetchTranscript, getApiKey]);

  const processAllNewVideos = useCallback(async (): Promise<number> => {
    const videos = await scanChannel();
    if (!videos.length) return 0;

    const existingTitles = new Set<string>();
    const { data: existing } = await supabase
      .from('youtube_scripts')
      .select('title')
      .eq('metadata->>channel', '@KHEPRAEXPERTS');

    (existing || []).forEach((s: any) => existingTitles.add(s.title));

    const newVideos = videos.filter((v) => !existingTitles.has(v.title));
    let processed = 0;

    for (const video of newVideos) {
      const success = await processVideo(video);
      if (success) processed++;
    }

    return processed;
  }, [scanChannel, processVideo]);

  const startAutoScan = useCallback(() => {
    if (scanIntervalRef.current) return;
    processAllNewVideos();
    scanIntervalRef.current = setInterval(() => {
      processAllNewVideos();
    }, channelConfig.checkIntervalMs);
  }, [processAllNewVideos, channelConfig.checkIntervalMs]);

  const stopAutoScan = useCallback(() => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  }, []);

  const resetEngine = useCallback(() => {
    stopAutoScan();
    setEngineState({
      status: 'idle',
      lastScanAt: null,
      videosDetected: [],
      videosProcessed: 0,
      totalTranscripts: 0,
      errorMessage: null,
      apiKeyConfigured: !!import.meta.env.VITE_PUBLIC_YOUTUBE_DATA_API_KEY,
    });
  }, [stopAutoScan]);

  return {
    engineState,
    channelConfig,
    scanChannel,
    processVideo,
    processAllNewVideos,
    fetchTranscript,
    startAutoScan,
    stopAutoScan,
    resetEngine,
    getApiKey,
  };
}

function parseSrt(rawSrt: string): { start: number; duration: number; text: string }[] {
  const blocks = rawSrt.trim().split(/\n\s*\n/);
  const segments: { start: number; duration: number; text: string }[] = [];

  for (const block of blocks) {
    const lines = block.trim().split('\n');
    if (lines.length < 3) continue;

    const timeLine = lines[1];
    const timeMatch = timeLine.match(/(\d{2}):(\d{2}):(\d{2})[.,](\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})[.,](\d{3})/);
    if (!timeMatch) continue;

    const startSec = parseInt(timeMatch[1]) * 3600 + parseInt(timeMatch[2]) * 60 + parseInt(timeMatch[3]) + parseInt(timeMatch[4]) / 1000;
    const endSec = parseInt(timeMatch[5]) * 3600 + parseInt(timeMatch[6]) * 60 + parseInt(timeMatch[7]) + parseInt(timeMatch[8]) / 1000;
    const text = lines.slice(2).join(' ').replace(/<[^>]+>/g, '').trim();

    if (text) {
      segments.push({ start: startSec, duration: endSec - startSec, text });
    }
  }

  return segments;
}

function extractKeywords(text: string): string[] {
  const stopWords = new Set(['le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'et', 'en', 'au', 'aux', 'pour', 'par', 'sur', 'dans', 'est', 'sont', 'qui', 'que', 'pas', 'plus', 'avec', 'tout', 'tous', 'ces', 'cette', 'son', 'sa', 'ses', 'leur', 'leurs', 'nos', 'vos', 'aux', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is']);

  const words = text.toLowerCase().replace(/[^\w\sàâäéèêëîïôöùûüç]/g, ' ').split(/\s+/).filter((w) => w.length > 3 && !stopWords.has(w));

  const freq: Record<string, number> = {};
  words.forEach((w) => { freq[w] = (freq[w] || 0) + 1; });

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([w]) => w.charAt(0).toUpperCase() + w.slice(1));
}



