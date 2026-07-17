import { useState } from 'react';

const PROXY_URL = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-routing-proxy';
const ANON_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

interface RoutingMeta {
  provider: string;
  primary: string;
  latency: number;
  failover: boolean;
}

export function useKosRouting() {
  const [meta, setMeta] = useState<RoutingMeta | null>(null);
  const [loading, setLoading] = useState(false);

  const call = async <T>(function_name: string, payload: unknown): Promise<T> => {
    setLoading(true);

    try {
      const res = await fetch(PROXY_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ function_name, payload }),
      });

      setMeta({
        provider: res.headers.get('X-Routing-Provider') || 'unknown',
        primary: res.headers.get('X-Routing-Primary') || 'unknown',
        latency: parseInt(res.headers.get('X-Routing-Latency') || '0', 10),
        failover: res.headers.get('X-Routing-Failover') === 'true',
      });

      if (!res.ok) {
        const bodyText = await res.text();
        let parsed: any = null;
        try { parsed = JSON.parse(bodyText); } catch { /* ignore */ }
        const detail = parsed?.detail || parsed?.error || parsed?.message || bodyText;
        throw new Error(`Routing failed: ${res.status} — ${detail}`);
      }

      const { data } = await res.json();
      return data as T;
    } finally {
      setLoading(false);
    }
  };

  return { call, meta, loading };
}