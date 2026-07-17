import { useState } from 'react';
import TicketCard from '@/components/feature/TicketCard';
import CrossResolutionAlertsPanel, { CrossResolutionToast } from '@/components/feature/CrossResolutionAlertsPanel';
import type { AutoCorrectionTicket, TicketStats, CrossResolutionAlert, CrossResolutionResult } from '@/hooks/useAutoCorrectionTickets';

interface TicketBoardProps {
  tickets: AutoCorrectionTicket[];
  stats: TicketStats;
  loading: boolean;
  syncing: boolean;
  error: string | null;
  onStatusChange: (id: number, newStatus: AutoCorrectionTicket['status'], resolutionType?: AutoCorrectionTicket['resolution_type'], notes?: string) => Promise<CrossResolutionResult | null>;
  onSync: () => Promise<{ created: number }>;
  showSync?: boolean;
  engineTitle?: string;
  crossResolutionAlerts?: CrossResolutionAlert[];
  crossResolving?: boolean;
  onAcknowledgeCrossAlert?: (alertId: number) => void;
}

type TabFilter = 'all' | 'open' | 'in_progress' | 'resolved' | 'critical';

export default function TicketBoard({ tickets, stats, loading, syncing, error, onStatusChange, onSync, showSync = true, engineTitle, crossResolutionAlerts = [], crossResolving = false, onAcknowledgeCrossAlert }: TicketBoardProps) {
  const [activeTab, setActiveTab] = useState<TabFilter>('open');
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [crossResultToast, setCrossResultToast] = useState<CrossResolutionResult | null>(null);

  const filteredTickets = (() => {
    if (activeTab === 'all') return tickets;
    if (activeTab === 'critical') return tickets.filter((t) => t.priority === 'critical' && (t.status === 'open' || t.status === 'in_progress'));
    return tickets.filter((t) => t.status === activeTab);
  })();

  const handleSync = async () => {
    setSyncMessage(null);
    try {
      const result = await onSync();
      if (result.created > 0) {
        setSyncMessage(`${result.created} ticket(s) créé(s) automatiquement`);
      } else {
        setSyncMessage('Aucun nouveau ticket à créer — tout est déjà suivi');
      }
    } catch {
      setSyncMessage('Erreur lors de la synchronisation');
    }
  };

  const handleStatusChange = async (id: number, newStatus: AutoCorrectionTicket['status'], resolutionType?: AutoCorrectionTicket['resolution_type'], notes?: string) => {
    const result = await onStatusChange(id, newStatus, resolutionType, notes);
    if (result && result.notified_count > 0) {
      setCrossResultToast(result);
      setTimeout(() => setCrossResultToast(null), 6000);
    }
    return;
  };

  const tabs: { key: TabFilter; label: string; count: number; icon: string; color: string }[] = [
    { key: 'open', label: 'Ouverts', count: stats.open, icon: 'ri-error-warning-line', color: 'text-red-600' },
    { key: 'in_progress', label: 'En cours', count: stats.in_progress, icon: 'ri-loader-4-line', color: 'text-amber-600' },
    { key: 'resolved', label: 'Résolus', count: stats.resolved + stats.auto_fixed, icon: 'ri-check-line', color: 'text-emerald-600' },
    { key: 'critical', label: 'Critiques', count: stats.critical, icon: 'ri-error-warning-fill', color: 'text-red-600' },
    { key: 'all', label: 'Tous', count: stats.total, icon: 'ri-list-check', color: 'text-foreground-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Cross-Resolution Toast */}
      {crossResultToast && (
        <CrossResolutionToast result={crossResultToast} onClose={() => setCrossResultToast(null)} />
      )}

      {/* Cross-Resolution Alerts Panel */}
      {crossResolutionAlerts.length > 0 && onAcknowledgeCrossAlert && (
        <CrossResolutionAlertsPanel
          alerts={crossResolutionAlerts}
          onAcknowledge={onAcknowledgeCrossAlert}
          engineTitle={engineTitle}
        />
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
              activeTab === tab.key
                ? 'bg-primary-50 border-primary-200 shadow-sm'
                : 'bg-background-50 border-background-200 hover:border-background-300'
            }`}
            type="button"
          >
            <div className="flex items-center gap-2 mb-1">
              <i className={`${tab.icon} ${tab.color} text-base`}></i>
              <span className="text-2xl font-bold text-foreground-950">{tab.count}</span>
            </div>
            <p className="text-xs text-foreground-500">{tab.label}</p>
          </button>
        ))}
      </div>

      {/* Engine Title */}
      {engineTitle && (
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-accent-500" />
          <span className="text-xs font-semibold text-foreground-500 uppercase tracking-wider">{engineTitle}</span>
          <span className="text-[10px] text-foreground-400">{stats.total} tickets</span>
          {crossResolving && (
            <span className="text-[10px] text-accent-600 flex items-center gap-1 ml-2">
              <i className="ri-loader-4-line animate-spin"></i>
              Résolution croisée...
            </span>
          )}
        </div>
      )}

      {/* Sync Bar — only for URL crawl engine */}
      {showSync && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-background-100 rounded-xl border border-background-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
              <i className="ri-robot-2-line text-accent-600 text-lg"></i>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground-950">Synchronisation auto-pilotée</h3>
              <p className="text-xs text-foreground-500">
                Analyse les résultats du dernier crawl et crée automatiquement les tickets manquants
              </p>
            </div>
          </div>
          <button
            onClick={handleSync}
            disabled={syncing}
            className="px-4 py-2 text-sm font-medium text-background-50 bg-accent-500 hover:bg-accent-600 rounded-lg transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
            type="button"
          >
            {syncing ? (
              <>
                <i className="ri-loader-4-line animate-spin mr-1.5"></i>
                Synchro...
              </>
            ) : (
              <>
                <i className="ri-refresh-line mr-1.5"></i>
                Synchroniser
              </>
            )}
          </button>
        </div>
      )}

      {syncMessage && (
        <div className={`p-3 rounded-lg text-sm font-medium ${
          syncMessage.includes('Erreur')
            ? 'bg-red-50 text-red-700 border border-red-200'
            : syncMessage.includes('Aucun')
              ? 'bg-background-100 text-foreground-600 border border-background-200'
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
        }`}>
          <i className={`${
            syncMessage.includes('Erreur') ? 'ri-error-warning-line' : syncMessage.includes('Aucun') ? 'ri-information-line' : 'ri-check-line'
          } mr-1.5`}></i>
          {syncMessage}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Tickets List */}
      {loading ? (
        <div className="bg-background-50 rounded-xl border border-background-200 p-8 text-center">
          <i className="ri-loader-4-line animate-spin text-2xl text-foreground-300 block mb-3"></i>
          <p className="text-sm text-foreground-500">Chargement des tickets...</p>
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="bg-background-50 rounded-xl border border-background-200 p-8 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="ri-check-double-line text-green-600 text-xl"></i>
          </div>
          <p className="text-sm font-medium text-foreground-700">
            {activeTab === 'open' ? 'Aucun ticket ouvert' :
             activeTab === 'critical' ? 'Aucun ticket critique' :
             activeTab === 'resolved' ? 'Aucun ticket résolu' :
             'Aucun ticket'}
          </p>
          <p className="text-xs text-foreground-500 mt-1">
            {stats.total === 0 ? 'Lancez une synchronisation pour créer les premiers tickets' : 'Tout est sous contrôle'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-foreground-600">
              {filteredTickets.length} ticket{filteredTickets.length > 1 ? 's' : ''}
            </p>
          </div>
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} onStatusChange={handleStatusChange} />
          ))}
        </div>
      )}
    </div>
  );
}