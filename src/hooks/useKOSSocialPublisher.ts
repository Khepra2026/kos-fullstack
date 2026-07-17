import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export type SocialPlatform = 'youtube_shorts' | 'tiktok' | 'instagram_reels' | 'linkedin_video' | 'linkedin_article';

export interface SocialClip {
  clipId: string;
  title: string;
  duration: string;
  startTime: string;
  endTime: string;
  viralityScore: number;
  framing: string;
  platformsTarget: SocialPlatform[];
  scriptId: number;
  sourceTitle: string;
  caption: string;
  hashtags: string[];
}

export interface PlatformCredential {
  platform: string;
  credentialName: string;
  isConfigured: boolean;
  status: 'active' | 'inactive' | 'missing';
}

export interface DistributionResult {
  clipId: string;
  platform: SocialPlatform;
  success: boolean;
  message: string;
  publishedAt?: string;
  externalUrl?: string;
}

export function useKOSSocialPublisher() {
  const [distributionQueue, setDistributionQueue] = useState<SocialClip[]>([]);
  const [results, setResults] = useState<DistributionResult[]>([]);
  const [isDistributing, setIsDistributing] = useState(false);
  const [progress, setProgress] = useState(0);

  const getPlatformCredentials = useCallback(async (): Promise<PlatformCredential[]> => {
    const { data, error } = await supabase
      .from('platform_credentials')
      .select('platform, credential_name, is_active')
      .in('platform', ['tiktok', 'instagram', 'linkedin', 'youtube']);

    if (error || !data) return [];

    const platforms: SocialPlatform[] = ['youtube_shorts', 'tiktok', 'instagram_reels', 'linkedin_video'];
    const credMap: Record<string, PlatformCredential> = {};

    platforms.forEach((p) => {
      const base = p === 'youtube_shorts' ? 'youtube' : p === 'instagram_reels' ? 'instagram' : p === 'linkedin_video' ? 'linkedin' : p;
      const creds = data.filter((c) => c.platform === base);
      credMap[p] = {
        platform: p,
        credentialName: creds.map((c) => c.credential_name).join(', ') || '—',
        isConfigured: creds.some((c) => c.is_active),
        status: creds.some((c) => c.is_active) ? 'active' : 'missing',
      };
    });

    return Object.values(credMap);
  }, []);

  const fetchClipsForDistribution = useCallback(async (): Promise<SocialClip[]> => {
    const { data: scripts, error } = await supabase
      .from('youtube_scripts')
      .select('id, title, metadata')
      .eq('status', 'completed')
      .not('metadata', 'is', null)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error || !scripts) return [];

    const clips: SocialClip[] = [];

    scripts.forEach((script) => {
      const meta = script.metadata as any;
      const clipList = meta?.clips || [];

      clipList.forEach((clip: any) => {
        const platforms: SocialPlatform[] = clip.platforms_target || ['youtube_shorts', 'tiktok', 'instagram_reels'];
        clips.push({
          clipId: clip.clip_id || `clip_${script.id}_${clips.length}`,
          title: clip.title || 'Clip sans titre',
          duration: clip.end && clip.start ? `${Math.round(parseTimeToSeconds(clip.end) - parseTimeToSeconds(clip.start))}s` : '—',
          startTime: clip.start || '00:00',
          endTime: clip.end || '00:00',
          viralityScore: clip.virality_score || 0,
          framing: clip.framing || '9_16_center',
          platformsTarget: platforms,
          scriptId: script.id,
          sourceTitle: script.title,
          caption: generateCaption(clip.title || script.title, platforms),
          hashtags: generateHashtags(script.title, platforms),
        });
      });
    });

    return clips;
  }, []);

  const distributeClip = useCallback(async (clip: SocialClip, platform: SocialPlatform): Promise<DistributionResult> => {
    const baseResult: DistributionResult = {
      clipId: clip.clipId,
      platform,
      success: false,
      message: '',
    };

    try {
      switch (platform) {
        case 'linkedin_video':
        case 'linkedin_article': {
          const { data: creds, error: credError } = await supabase
            .from('platform_credentials')
            .select('credential_value')
            .eq('platform', 'linkedin')
            .eq('is_active', true);

          if (credError || !creds?.length) {
            return { ...baseResult, message: 'Credentials LinkedIn manquants. Ajoutez-les dans platform_credentials.' };
          }

          const { error: logError } = await supabase.from('orchestration_logs').insert({
            mission_type: 'social_distribution',
            lead_agent: 'agent_munch_extractor',
            status: 'completed',
            quality_score: clip.viralityScore,
            metadata: {
              clip_id: clip.clipId,
              platform,
              title: clip.title,
              virality_score: clip.viralityScore,
              caption: clip.caption,
              hashtags: clip.hashtags,
              source_script_id: clip.scriptId,
              distributed_via: 'KOS_Social_Publisher_v1',
              workflow: 'wf_content_repurposing_munch',
            },
            agents_activated: [
              { agent_id: 'agent_munch_extractor', role: 'content_repurposing_engine', status: 'completed' },
              { agent_id: 'agent_khepra_youtube_publisher', role: 'youtube_channel_manager', status: 'queued' },
            ],
          });

          if (logError) console.warn('[SocialPublisher] Log error:', logError);

          return {
            ...baseResult,
            success: true,
            message: `Clip "${clip.title}" distribué sur ${platform} — prêt pour publication`,
            publishedAt: new Date().toISOString(),
          };
        }

        case 'tiktok':
        case 'instagram_reels': {
          const { data: creds } = await supabase
            .from('platform_credentials')
            .select('credential_value')
            .eq('platform', platform === 'tiktok' ? 'tiktok' : 'instagram')
            .eq('is_active', true);

          if (!creds?.length) {
            return { ...baseResult, message: `Credentials ${platform} manquants. Ajoutez-les dans platform_credentials.` };
          }

          const { error: logError } = await supabase.from('orchestration_logs').insert({
            mission_type: 'social_distribution',
            lead_agent: 'agent_munch_extractor',
            status: 'queued',
            quality_score: clip.viralityScore,
            metadata: {
              clip_id: clip.clipId,
              platform,
              title: clip.title,
              virality_score: clip.viralityScore,
              caption: clip.caption,
              hashtags: clip.hashtags,
              status_note: 'Clip formaté 9:16, prêt pour upload manuel ou API.',
              workflow: 'wf_content_repurposing_munch',
            },
            agents_activated: [
              { agent_id: 'agent_munch_extractor', role: 'content_repurposing_engine', status: 'completed' },
            ],
          });

          return {
            ...baseResult,
            success: true,
            message: `Clip "${clip.title}" préparé pour ${platform} — prêt pour upload`,
            publishedAt: new Date().toISOString(),
          };
        }

        case 'youtube_shorts': {
          const { error: logError } = await supabase.from('orchestration_logs').insert({
            mission_type: 'social_distribution',
            lead_agent: 'agent_khepra_youtube_publisher',
            status: 'queued',
            quality_score: clip.viralityScore,
            metadata: {
              clip_id: clip.clipId,
              platform: 'youtube_shorts',
              title: clip.title,
              channel: '@KHEPRAEXPERTS',
              privacy: 'private',
              review_required: true,
              upload_schedule: { timezone: 'Africa/Abidjan', preferred_day: 'mardi', preferred_hour: 14 },
            },
            agents_activated: [
              { agent_id: 'agent_khepra_youtube_publisher', role: 'youtube_channel_manager', status: 'queued' },
            ],
          });

          if (logError) console.warn('[SocialPublisher] Shorts log error:', logError);

          return {
            ...baseResult,
            success: true,
            message: `Short "${clip.title}" programmé sur @KHEPRAEXPERTS (YouTube Shorts)`,
            publishedAt: new Date().toISOString(),
          };
        }

        default:
          return { ...baseResult, message: `Plateforme ${platform} non supportée` };
      }
    } catch (err: any) {
      return { ...baseResult, success: false, message: err.message };
    }
  }, []);

  const distributeAll = useCallback(async (clips: SocialClip[]): Promise<DistributionResult[]> => {
    setIsDistributing(true);
    setProgress(0);
    const allResults: DistributionResult[] = [];
    let totalTasks = 0;
    let completedTasks = 0;

    clips.forEach((c) => { totalTasks += c.platformsTarget.length; });

    for (const clip of clips) {
      for (const platform of clip.platformsTarget) {
        const result = await distributeClip(clip, platform);
        allResults.push(result);
        completedTasks++;
        setProgress(Math.round((completedTasks / totalTasks) * 100));
      }
    }

    setResults(allResults);
    setIsDistributing(false);
    return allResults;
  }, [distributeClip]);

  const distributeSingleClip = useCallback(async (clip: SocialClip): Promise<DistributionResult[]> => {
    setIsDistributing(true);
    setProgress(0);
    const allResults: DistributionResult[] = [];
    let completed = 0;

    for (const platform of clip.platformsTarget) {
      const result = await distributeClip(clip, platform);
      allResults.push(result);
      completed++;
      setProgress(Math.round((completed / clip.platformsTarget.length) * 100));
    }

    setResults((prev) => [...prev, ...allResults]);
    setIsDistributing(false);
    return allResults;
  }, [distributeClip]);

  const storeSocialCredentials = useCallback(async (
    platform: string,
    credentialName: string,
    credentialValue: string
  ): Promise<boolean> => {
    const { error } = await supabase.from('platform_credentials').upsert({
      platform,
      credential_name: credentialName,
      credential_value: credentialValue,
      is_active: true,
    }, { onConflict: 'platform,credential_name' });

    return !error;
  }, []);

  const resetPublisher = useCallback(() => {
    setDistributionQueue([]);
    setResults([]);
    setIsDistributing(false);
    setProgress(0);
  }, []);

  return {
    distributionQueue,
    results,
    isDistributing,
    progress,
    fetchClipsForDistribution,
    distributeClip,
    distributeAll,
    distributeSingleClip,
    getPlatformCredentials,
    storeSocialCredentials,
    resetPublisher,
  };
}

function generateCaption(title: string, platforms: SocialPlatform[]): string {
  const base = `${title}\n\n`;
  const cta = '\n\n👇 Abonnez-vous à @KHEPRAEXPERTS pour plus d\'expertise réglementaire africaine.';

  if (platforms.includes('tiktok') || platforms.includes('instagram_reels')) {
    return `${base}⚡ ${title.split(' ').slice(0, 5).join(' ')}...${cta}`;
  }

  if (platforms.includes('linkedin_video') || platforms.includes('linkedin_article')) {
    return `${base}Expertise Big Four — KHEPRA EXPERTS.\nAnalyse réglementaire UEMOA/CEMAC.${cta}`;
  }

  return `${base}📺 Émission complète sur @KHEPRAEXPERTS${cta}`;
}

function generateHashtags(title: string, platforms: SocialPlatform[]): string[] {
  const base = ['KHEPRAEXPERTS', 'Regulation', 'Afrique', 'UEMOA', 'Conformite'];

  if (platforms.includes('tiktok')) {
    return [...base, 'Fintech', 'BusinessAfrique', 'ExpertComptable', 'Viral'];
  }

  if (platforms.includes('instagram_reels')) {
    return [...base, 'BusinessAfrique', 'Finance', 'Expertise', 'Reels'];
  }

  if (platforms.includes('linkedin_video') || platforms.includes('linkedin_article')) {
    return [...base, 'Gouvernance', 'BigFour', 'BCEAO', 'Deloitte', 'PwC', 'Leadership'];
  }

  return [...base, 'YouTube', 'Shorts', 'EducationFinanciere'];
}

function parseTimeToSeconds(timeStr: string): number {
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}