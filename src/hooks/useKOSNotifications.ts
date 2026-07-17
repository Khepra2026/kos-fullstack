import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface KOSCriticalEvent {
  id: number;
  hub_id: number;
  hub_name: string;
  event_type: 'critical' | 'warning' | 'info' | 'resolved';
  title: string;
  message: string;
  metric_name: string | null;
  current_value: number | null;
  threshold_value: number | null;
  acknowledged: boolean;
  created_at: string;
  acknowledged_at: string | null;
}

interface UseKOSNotificationsReturn {
  events: KOSCriticalEvent[];
  unacknowledgedCount: number;
  criticalCount: number;
  loading: boolean;
  error: string | null;
  acknowledgeEvent: (id: number) => Promise<void>;
  refreshEvents: () => Promise<void>;
}

export function useKOSNotifications(): UseKOSNotificationsReturn {
  const [events, setEvents] = useState<KOSCriticalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('kos_critical_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (fetchError) throw fetchError;
      setEvents(data || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const acknowledgeEvent = useCallback(async (id: number) => {
    try {
      await supabase
        .from('kos_critical_events')
        .update({ acknowledged: true, acknowledged_at: new Date().toISOString() })
        .eq('id', id);

      setEvents(prev =>
        prev.map(e => (e.id === id ? { ...e, acknowledged: true, acknowledged_at: new Date().toISOString() } : e))
      );
    } catch {
      // silently fail — notification stays unacknowledged
    }
  }, []);

  const unacknowledgedCount = events.filter(e => !e.acknowledged).length;
  const criticalCount = events.filter(e => e.event_type === 'critical' && !e.acknowledged).length;

  return { events, unacknowledgedCount, criticalCount, loading, error, acknowledgeEvent, refreshEvents: fetchEvents };
}