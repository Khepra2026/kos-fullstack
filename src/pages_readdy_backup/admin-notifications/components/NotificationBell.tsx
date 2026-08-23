import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminNotifications } from '@/pages/admin-notifications/hooks/useAdminNotifications';
import { severityConfig, typeConfig } from '@/mocks/adminNotifications';

interface NotificationBellProps {
  compact?: boolean;
}

export default function NotificationBell({ compact = false }: NotificationBellProps) {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const {
    notifications,
    unreadCount,
    criticalCount,
    highCount,
    markAsRead,
    dismissNotification,
    markAllAsRead,
  } = useAdminNotifications();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const badgeColor = criticalCount > 0
    ? 'bg-red-500'
    : highCount > 0
      ? 'bg-amber-500'
      : unreadCount > 0
        ? 'bg-blue-500'
        : 'bg-slate-400';

  const recentNotifications = notifications.slice(0, 8);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            recentNotifications.forEach((n) => {
              if (!n.read_at) markAsRead(n.id);
            });
          }
        }}
        className={`relative flex items-center justify-center cursor-pointer ${compact ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg hover:bg-slate-100 transition-colors`}
        type="button"
        title="Notifications"
      >
        <i className="ri-notification-3-line text-slate-600 w-5 h-5 flex items-center justify-center"></i>
        {unreadCount > 0 && (
          <span
            className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] ${badgeColor} text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1`}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[420px] bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-[#c19a6b]/10 to-[#a47c48]/10">
            <div className="flex items-center gap-2">
              <i className="ri-notification-3-line text-[#c19a6b] w-4 h-4 flex items-center justify-center"></i>
              <span className="text-sm font-bold text-slate-900">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-[#c19a6b] text-white text-[10px] font-bold rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={markAllAsRead}
                className="text-xs text-slate-500 hover:text-[#c19a6b] cursor-pointer"
                type="button"
                title="Tout marquer comme lu"
              >
                <i className="ri-check-double-line w-3 h-3 flex items-center justify-center inline"></i>
                Tout lire
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer"
                type="button"
              >
                <i className="ri-close-line w-4 h-4 flex items-center justify-center"></i>
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-[420px] overflow-y-auto">
            {recentNotifications.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <i className="ri-notification-off-line text-3xl mb-2 block"></i>
                <p className="text-sm">Aucune notification</p>
              </div>
            ) : (
              recentNotifications.map((notification) => {
                const severity = severityConfig[notification.severity] || severityConfig.medium;
                const type = typeConfig[notification.type] || typeConfig.new_lead;
                const isUnread = !notification.read_at;
                return (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 border-b border-slate-100 hover:bg-slate-50 transition-colors ${isUnread ? 'bg-[#c19a6b]/5' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full ${severity.bg} ${severity.border} border flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <i className={`${severity.icon} ${severity.color} w-4 h-4 flex items-center justify-center text-xs`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-900 truncate">
                            {notification.title}
                          </span>
                          {isUnread && (
                            <span className="w-2 h-2 rounded-full bg-[#c19a6b] flex-shrink-0"></span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{notification.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[10px] text-slate-400">
                            {new Date(notification.created_at).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <div className="flex items-center gap-1">
                            {notification.action_url && (
                              <button
                                onClick={() => {
                                  navigate(notification.action_url!);
                                  setIsOpen(false);
                                }}
                                className="text-[10px] px-2 py-1 bg-[#c19a6b]/10 text-[#c19a6b] rounded-md hover:bg-[#c19a6b]/20 transition-colors cursor-pointer"
                                type="button"
                              >
                                {notification.action_label || 'Voir'}
                              </button>
                            )}
                            <button
                              onClick={() => dismissNotification(notification.id)}
                              className="w-5 h-5 rounded-md hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer"
                              type="button"
                              title="Supprimer"
                            >
                              <i className="ri-close-line w-3 h-3 flex items-center justify-center"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-slate-200 bg-slate-50">
            <button
              onClick={() => {
                navigate('/admin-notifications');
                setIsOpen(false);
              }}
              className="w-full text-center text-xs text-[#c19a6b] font-medium hover:text-[#a47c48] transition-colors cursor-pointer"
              type="button"
            >
              Voir toutes les notifications
              <i className="ri-arrow-right-line w-3 h-3 flex items-center justify-center inline ml-1"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



