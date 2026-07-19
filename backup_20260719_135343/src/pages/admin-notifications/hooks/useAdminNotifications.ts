import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { mockAdminNotifications } from '@/mocks/adminNotifications';

export interface AdminNotification {
  id: string;
  created_at: string;
  updated_at: string;
  type: string;
  severity: string;
  title: string;
  message: string;
  related_lead_id: string | null;
  related_proposal_id: string | null;
  metadata: Record<string, unknown>;
  read_at: string | null;
  dismissed_at: string | null;
  action_url: string | null;
  action_label: string | null;
}

export function useAdminNotifications() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastCheck, setLastCheck] = useState<string | null>(null);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('admin_notifications')
        .select('*')
        .is('dismissed_at', null)
        .order('created_at', { ascending: false });

      if (err) {
        console.warn('Supabase notifications error, using mock:', err.message);
        setNotifications(mockAdminNotifications.filter((n) => !n.dismissed_at));
      } else {
        setNotifications(data || []);
      }
    } catch (err) {
      console.warn('Using mock notifications:', err);
      setNotifications(mockAdminNotifications.filter((n) => !n.dismissed_at));
    } finally {
      setLoading(false);
    }
  }, []);

  const checkNotifications = useCallback(async () => {
    try {
      const { data, error: err } = await supabase.functions.invoke('admin-notifications-check', {
        body: {},
      });

      if (err) {
        console.warn('Edge function check error:', err);
      } else {
        setLastCheck(new Date().toISOString());
        if (data?.notifications_created && data.notifications_created > 0) {
          await loadNotifications();
        }
      }
    } catch (err) {
      console.warn('Edge function unavailable:', err);
    }
  }, [loadNotifications]);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const { error: err } = await supabase
        .from('admin_notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('id', notificationId);

      if (err) {
        console.warn('markAsRead error:', err);
      }
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read_at: new Date().toISOString() } : n))
      );
    } catch (err) {
      console.warn('markAsRead error:', err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    const unreadIds = notifications.filter((n) => !n.read_at).map((n) => n.id);
    if (unreadIds.length === 0) return;
    try {
      const { error: err } = await supabase
        .from('admin_notifications')
        .update({ read_at: new Date().toISOString() })
        .in('id', unreadIds);

      if (err) {
        console.warn('markAllAsRead error:', err);
      }
      setNotifications((prev) =>
        prev.map((n) => (unreadIds.includes(n.id) ? { ...n, read_at: new Date().toISOString() } : n))
      );
    } catch (err) {
      console.warn('markAllAsRead error:', err);
    }
  }, [notifications]);

  const dismissNotification = useCallback(async (notificationId: string) => {
    try {
      const { error: err } = await supabase
        .from('admin_notifications')
        .update({ dismissed_at: new Date().toISOString() })
        .eq('id', notificationId);

      if (err) {
        console.warn('dismiss error:', err);
      }
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    } catch (err) {
      console.warn('dismiss error:', err);
    }
  }, []);

  const dismissAll = useCallback(async () => {
    const ids = notifications.map((n) => n.id);
    if (ids.length === 0) return;
    try {
      const { error: err } = await supabase
        .from('admin_notifications')
        .update({ dismissed_at: new Date().toISOString() })
        .in('id', ids);

      if (err) {
        console.warn('dismissAll error:', err);
      }
      setNotifications([]);
    } catch (err) {
      console.warn('dismissAll error:', err);
    }
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read_at).length;
  const criticalCount = notifications.filter((n) => !n.read_at && n.severity === 'critical').length;
  const highCount = notifications.filter((n) => !n.read_at && n.severity === 'high').length;

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return {
    notifications,
    loading,
    error,
    unreadCount,
    criticalCount,
    highCount,
    lastCheck,
    loadNotifications,
    checkNotifications,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    dismissAll,
  };
}


export const useAdminNotifications = { id: 1, label: "Stub data" }; // stub



