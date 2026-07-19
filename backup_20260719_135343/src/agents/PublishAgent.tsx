import { supabase } from '@/lib/supabase';
import { Channel, PipelineResult } from '@/types/kos';
import { SocialPost } from '@/agents/SocialAgent';

async function retry<T>(fn: () => Promise<T>, times: number): Promise<T> {
  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === times - 1) throw e;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
  throw new Error('Unreachable');
}

async function postToChannel(channel: Channel): Promise<{ id: string; url: string }> {
  const { data, error } = await supabase.functions.invoke('kos-social-master', {
    body: { channel, action: 'generate_copy' },
  });

  if (error) throw new Error(`Publication ${channel} échouée: ${error.message}`);
  if (!data) throw new Error(`Publication ${channel} returned empty data`);

  return data as { id: string; url: string };
}

export function usePublishAgent() {
  const deploy = async (payload: {
    article: Record<string, unknown>;
    seo: Record<string, unknown>;
    socials: Record<string, SocialPost>;
    targets: Channel[];
  }): Promise<PipelineResult['results']> => {
    const channels = payload.targets.map(ch => ({
      name: ch,
      fn: () => retry(() => postToChannel(ch), 3),
    }));

    const results = await Promise.allSettled(
      channels.map(async ch => {
        try {
          const res = await ch.fn();
          return { channel: ch.name, status: 'OK' as const, id: res.id, url: res.url };
        } catch (e) {
          const errorMsg = e instanceof Error ? e.message : 'Erreur inconnue';
          return { channel: ch.name, status: 'FAILED' as const, error: errorMsg };
        }
      }),
    );

    const output: PipelineResult['results'] = results.map(r =>
      r.status === 'fulfilled'
        ? r.value
        : { channel: 'web' as Channel, status: 'FAILED', error: String(r.reason) },
    );

    try {
      await supabase.functions.invoke('kos-audit-insert', {
        body: {
          timestamp: new Date().toISOString(),
          version: '1.0',
          results: output,
        },
      });
    } catch {
      // Audit logging is non-critical
    }

    return output;
  };

  return { deploy };
}



