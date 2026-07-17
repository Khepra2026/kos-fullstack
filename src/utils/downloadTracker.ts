import { supabase } from '@/lib/supabase';

const READDY_DOWNLOAD_FORM_URL = 'https://readdy.ai/api/form/d7b9lmuoim692ipjm2d0';
const NOTIFY_FUNCTION_URL = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/submit-form';

export type DownloadSource = 'hero' | 'exit-popup' | 'case-studies' | 'thank-you' | 'other';

export interface DownloadEvent {
  id: string;
  source: DownloadSource;
  page: string;
  user_agent?: string;
  referrer?: string;
  country?: string;
  created_at: string;
}

export interface DownloadStats {
  total: number;
  bySource: Record<DownloadSource, number>;
  byDay: Record<string, number>;
  byCountry: Record<string, number>;
  lastDownload: DownloadEvent | null;
  events: DownloadEvent[];
}

async function detectCountry(): Promise<string | null> {
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    const data = await res.json();
    return data.country_name ?? data.country ?? null;
  } catch {
    return null;
  }
}

export async function trackDownload(source: DownloadSource): Promise<void> {
  try {
    const country = await detectCountry();
    const page = typeof window !== 'undefined' ? window.location.pathname : '/';

    const formBody = new URLSearchParams({
      source,
      page,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      referrer: typeof document !== 'undefined' ? document.referrer || '' : '',
      country: country || '',
    });

    await fetch(READDY_DOWNLOAD_FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody.toString(),
    });

    // Vérifier si c'est un nouveau pays et envoyer une alerte email si besoin
    if (country) {
      fetch(NOTIFY_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'country_alert', country, source, page }),
      }).catch(() => {
        // silently fail
      });
    }
  } catch {
    // silently fail
  }
}

export async function getDownloadStats(periodDays?: number | null): Promise<DownloadStats> {
  try {
    let query = supabase
      .from('downloads')
      .select('id, source, page, country, created_at')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (periodDays) {
      const since = new Date();
      since.setDate(since.getDate() - periodDays);
      query = query.gte('created_at', since.toISOString());
    }

    const { data, error } = await query;

    if (error || !data) {
      return emptyStats();
    }

    const events: DownloadEvent[] = data.map((row: any) => ({
      id: row.id,
      source: (row.source as DownloadSource) || 'other',
      page: row.page || '/',
      country: row.country || undefined,
      created_at: row.created_at,
    }));

    const bySource: Record<DownloadSource, number> = {
      hero: 0,
      'exit-popup': 0,
      'case-studies': 0,
      'thank-you': 0,
      other: 0,
    };

    const byDay: Record<string, number> = {};
    const byCountry: Record<string, number> = {};

    for (const ev of events) {
      const src = ev.source in bySource ? ev.source : 'other';
      bySource[src] = (bySource[src] || 0) + 1;

      const day = ev.created_at.slice(0, 10);
      byDay[day] = (byDay[day] || 0) + 1;

      if (ev.country) {
        byCountry[ev.country] = (byCountry[ev.country] || 0) + 1;
      }
    }

    return {
      total: events.length,
      bySource,
      byDay,
      byCountry,
      lastDownload: events.length > 0 ? events[0] : null,
      events,
    };
  } catch {
    return emptyStats();
  }
}

function emptyStats(): DownloadStats {
  return {
    total: 0,
    bySource: { hero: 0, 'exit-popup': 0, 'case-studies': 0, 'thank-you': 0, other: 0 },
    byDay: {},
    byCountry: {},
    lastDownload: null,
    events: [],
  };
}