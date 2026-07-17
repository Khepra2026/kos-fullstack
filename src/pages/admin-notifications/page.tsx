import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SeoHead from '@/components/feature/SeoHead';
import LoginPage from '@/pages/dashboard/components/LoginPage';
import { useAdminNotifications } from './hooks/useAdminNotifications';
import { severityConfig, typeConfig } from '@/mocks/adminNotifications';

export default function AdminNotificationsPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [showRead, setShowRead] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    notifications,
    loading,
    unreadCount,
    criticalCount,
    highCount,
    loadNotifications,
    checkNotifications,
    markAsRead,
    dismissNotification,
    dismissAll,
    lastCheck,
  } = useAdminNotifications();

  useEffect(() => {
    const stored = localStorage.getItem('dashboard_auth');
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('dashboard_auth', 'true');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const filteredNotifications = notifications
    .filter((n) => {
      const matchesType = filterType === 'all' || n.type === filterType;
      const matchesSeverity = filterSeverity === 'all' || n.severity === filterSeverity;
      const matchesRead = showRead || !n.read_at;
      const matchesSearch =
        !searchQuery ||
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSeverity && matchesRead && matchesSearch;
    });

  const stats = {
    total: notifications.length,
    unread: unreadCount,
    critical: criticalCount,
    high: highCount,
    byType: {
      cold_lead: notifications.filter((n) => n.type === 'cold_lead').length,
      pipeline_drop: notifications.filter((n) => n.type === 'pipeline_drop').length,
      new_lead: notifications.filter((n) => n.type === 'new_lead').length,
      proposal_expired: notifications.filter((n) => n.type === 'proposal_expired').length,
      proposal_accepted: notifications.filter((n) => n.type === 'proposal_accepted').length,
      proposal_viewed: notifications.filter((n) => n.type === 'proposal_viewed').length,
    },
  };

  return (
    <>
      <SeoHead
        title="Notifications Admin — KHEPRA EXPERTS"
        description="Centre de notifications et alertes de performance du pipeline commercial"
        canonicalPath="/admin-notifications"
        noIndex={true}
      />
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  type="button"
                >
                  <i className="ri-arrow-left-line text-xl w-6 h-6 flex items-center justify-center"></i>
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c19a6b] to-[#a47c48] flex items-center justify-center">
                    <i className="ri-notification-3-line text-white text-lg w-5 h-5 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Notifications Admin</h1>
                    <p className="text-sm text-slate-600">Alertes de performance et monitoring du pipeline</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/crm')}
                  className="px-4 py-2 bg-[#f5f3f0] text-[#c19a6b] border border-[#e5e3df] rounded-lg text-sm font-medium hover:bg-[#e5e3df] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
                  type="button"
                >
                  <i className="ri-kanban-view w-4 h-4 flex items-center justify-center"></i>
                  CRM
                </button>
                <button
                  onClick={() => navigate('/proposals')}
                  className="px-4 py-2 bg-[#f5f3f0] text-[#c19a6b] border border-[#e5e3df] rounded-lg text-sm font-medium hover:bg-[#e5e3df] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
                  type="button"
                >
                  <i className="ri-file-paper-line w-4 h-4 flex items-center justify-center"></i>
                  Propositions
                </button>
                <button
                  onClick={() => navigate('/reporting-commercial')}
                  className="px-4 py-2 bg-[#f5f3f0] text-[#c19a6b] border border-[#e5e3df] rounded-lg text-sm font-medium hover:bg-[#e5e3df] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
                  type="button"
                >
                  <i className="ri-bar-chart-grouped-line w-4 h-4 flex items-center justify-center"></i>
                  Reporting
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 bg-gradient-to-r from-[#c19a6b] to-[#a47c48] text-white rounded-lg text-sm font-medium hover:from-[#a47c48] hover:to-[#8b6a3a] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
                  type="button"
                >
                  <i className="ri-dashboard-line w-4 h-4 flex items-center justify-center"></i>
                  Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-notification-3-line text-slate-400 w-4 h-4 flex items-center justify-center"></i>
                <span className="text-xs text-slate-500 font-medium">Total</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-eye-off-line text-[#c19a6b] w-4 h-4 flex items-center justify-center"></i>
                <span className="text-xs text-slate-500 font-medium">Non lues</span>
              </div>
              <p className="text-2xl font-bold text-[#c19a6b]">{stats.unread}</p>
            </div>
            <div className="bg-white rounded-xl border border-red-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-alarm-warning-line text-red-500 w-4 h-4 flex items-center justify-center"></i>
                <span className="text-xs text-slate-500 font-medium">Critiques</span>
              </div>
              <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
            </div>
            <div className="bg-white rounded-xl border border-amber-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-error-warning-line text-amber-500 w-4 h-4 flex items-center justify-center"></i>
                <span className="text-xs text-slate-500 font-medium">Hautes</span>
              </div>
              <p className="text-2xl font-bold text-amber-600">{stats.high}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-user-unfollow-line text-blue-500 w-4 h-4 flex items-center justify-center"></i>
                <span className="text-xs text-slate-500 font-medium">Leads froids</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stats.byType.cold_lead}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-time-line text-red-500 w-4 h-4 flex items-center justify-center"></i>
                <span className="text-xs text-slate-500 font-medium">Propositions</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stats.byType.proposal_expired}</p>
            </div>
          </div>

          {/* Filters & Toolbar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 flex-1 min-w-[200px]">
                <i className="ri-search-line text-slate-400 w-4 h-4 flex items-center justify-center mr-2"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une notification..."
                  className="bg-transparent text-sm text-slate-700 focus:outline-none w-full"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#c19a6b]"
              >
                <option value="all">Tous les types</option>
                <option value="cold_lead">Lead froid</option>
                <option value="pipeline_drop">Pipeline en baisse</option>
                <option value="new_lead">Nouveau lead</option>
                <option value="proposal_expired">Proposition expirée</option>
                <option value="proposal_accepted">Proposition acceptée</option>
                <option value="proposal_viewed">Proposition consultée</option>
              </select>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#c19a6b]"
              >
                <option value="all">Toutes sévérités</option>
                <option value="critical">Critique</option>
                <option value="high">Haute</option>
                <option value="medium">Moyenne</option>
                <option value="low">Faible</option>
              </select>
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showRead}
                  onChange={(e) => setShowRead(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#c19a6b] focus:ring-[#c19a6b]"
                />
                Afficher les lues
              </label>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={checkNotifications}
                  className="px-3 py-2 bg-[#f5f3f0] text-[#c19a6b] rounded-lg text-sm font-medium hover:bg-[#e5e3df] transition-colors cursor-pointer flex items-center gap-2"
                  type="button"
                >
                  <i className="ri-refresh-line w-4 h-4 flex items-center justify-center"></i>
                  Vérifier
                </button>
                <button
                  onClick={loadNotifications}
                  className="px-3 py-2 bg-[#f5f3f0] text-[#c19a6b] rounded-lg text-sm font-medium hover:bg-[#e5e3df] transition-colors cursor-pointer flex items-center gap-2"
                  type="button"
                >
                  <i className="ri-refresh-line w-4 h-4 flex items-center justify-center"></i>
                  Rafraîchir
                </button>
                <button
                  onClick={dismissAll}
                  className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors cursor-pointer flex items-center gap-2"
                  type="button"
                >
                  <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                  Tout supprimer
                </button>
              </div>
            </div>
            {lastCheck && (
              <p className="text-[10px] text-slate-400 mt-2">
                Dernière vérification : {new Date(lastCheck).toLocaleString('fr-FR')}
              </p>
            )}
          </div>

          {/* Notifications Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <i className="ri-notification-3-line text-[#c19a6b] w-4 h-4 flex items-center justify-center"></i>
                Notifications actives
              </h2>
              <span className="text-xs text-slate-500">{filteredNotifications.length} notifications</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase w-12">Sévérité</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Titre</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Message</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Statut</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredNotifications.map((notification) => {
                    const severity = severityConfig[notification.severity] || severityConfig.medium;
                    const type = typeConfig[notification.type] || typeConfig.new_lead;
                    const isUnread = !notification.read_at;
                    return (
                      <tr
                        key={notification.id}
                        className={`hover:bg-slate-50 transition-colors ${isUnread ? 'bg-[#c19a6b]/5' : ''}`}
                      >
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold ${severity.bg} ${severity.color} ${severity.border} border`}
                          >
                            <i className={`${severity.icon} w-3 h-3 flex items-center justify-center`}></i>
                            {notification.severity.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                            <i className={`${type.icon} w-3 h-3 flex items-center justify-center`}></i>
                            {type.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-900">{notification.title}</span>
                            {isUnread && (
                              <span className="w-2 h-2 rounded-full bg-[#c19a6b] flex-shrink-0"></span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">
                          {notification.message}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500">
                          {new Date(notification.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium ${isUnread ? 'text-[#c19a6b]' : 'text-slate-400'}`}>
                            {isUnread ? 'Non lue' : 'Lue'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {notification.action_url && (
                              <button
                                onClick={() => navigate(notification.action_url!)}
                                className="w-7 h-7 rounded-md bg-[#c19a6b]/10 flex items-center justify-center hover:bg-[#c19a6b]/20 transition-colors cursor-pointer"
                                type="button"
                                title={notification.action_label || 'Voir'}
                              >
                                <i className="ri-eye-line w-3 h-3 flex items-center justify-center text-[#c19a6b]"></i>
                              </button>
                            )}
                            {isUnread && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer"
                                type="button"
                                title="Marquer comme lu"
                              >
                                <i className="ri-check-line w-3 h-3 flex items-center justify-center text-blue-600"></i>
                              </button>
                            )}
                            <button
                              onClick={() => dismissNotification(notification.id)}
                              className="w-7 h-7 rounded-md bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer"
                              type="button"
                              title="Supprimer"
                            >
                              <i className="ri-delete-bin-line w-3 h-3 flex items-center justify-center text-red-600"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {filteredNotifications.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <i className="ri-notification-off-line text-4xl mb-2 block"></i>
                <p className="text-sm">Aucune notification correspondante</p>
                {showRead || filterType !== 'all' || filterSeverity !== 'all' || searchQuery ? (
                  <button
                    onClick={() => {
                      setShowRead(false);
                      setFilterType('all');
                      setFilterSeverity('all');
                      setSearchQuery('');
                    }}
                    className="mt-3 px-4 py-2 bg-[#c19a6b] text-white rounded-lg text-sm font-medium hover:bg-[#a47c48] transition-colors cursor-pointer"
                    type="button"
                  >
                    Réinitialiser les filtres
                  </button>
                ) : null}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <i className="ri-information-line text-[#c19a6b] w-4 h-4 flex items-center justify-center"></i>
              Types d'alertes automatiques
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <i className="ri-user-unfollow-line text-red-500 w-5 h-5 flex items-center justify-center flex-shrink-0"></i>
                <div>
                  <p className="text-sm font-medium text-red-700">Lead froid</p>
                  <p className="text-xs text-red-600 mt-0.5">Pas d'activité depuis 7 jours (critique à 14 jours)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <i className="ri-arrow-down-line text-amber-500 w-5 h-5 flex items-center justify-center flex-shrink-0"></i>
                <div>
                  <p className="text-sm font-medium text-amber-700">Pipeline en baisse</p>
                  <p className="text-xs text-amber-600 mt-0.5">Diminution de 10%+ des leads actifs sur 7 jours</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <i className="ri-user-add-line text-blue-500 w-5 h-5 flex items-center justify-center flex-shrink-0"></i>
                <div>
                  <p className="text-sm font-medium text-blue-700">Nouveau lead</p>
                  <p className="text-xs text-blue-600 mt-0.5">Nouveau formulaire soumis aujourd'hui</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <i className="ri-time-line text-red-500 w-5 h-5 flex items-center justify-center flex-shrink-0"></i>
                <div>
                  <p className="text-sm font-medium text-red-700">Proposition expirée</p>
                  <p className="text-xs text-red-600 mt-0.5">Pas de réponse 14 jours après envoi</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <i className="ri-check-double-line text-emerald-500 w-5 h-5 flex items-center justify-center flex-shrink-0"></i>
                <div>
                  <p className="text-sm font-medium text-emerald-700">Proposition acceptée</p>
                  <p className="text-xs text-emerald-600 mt-0.5">Nouvelle mission signée</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <i className="ri-eye-line text-slate-500 w-5 h-5 flex items-center justify-center flex-shrink-0"></i>
                <div>
                  <p className="text-sm font-medium text-slate-700">Proposition consultée</p>
                  <p className="text-xs text-slate-600 mt-0.5">Le client a ouvert le PDF aujourd'hui</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}