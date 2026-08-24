import { useState } from 'react';
import type { AutoCorrectionTicket } from '@/hooks/useAutoCorrectionTickets';

interface TicketCardProps {
  ticket: AutoCorrectionTicket;
  onStatusChange: (id: number, newStatus: AutoCorrectionTicket['status'], resolutionType?: AutoCorrectionTicket['resolution_type'], notes?: string) => Promise<void>;
}

const priorityConfig = {
  critical: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700', icon: 'ri-error-warning-fill text-red-500', label: 'Critique' },
  high: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700', icon: 'ri-alert-fill text-amber-500', label: 'Haute' },
  medium: { bg: 'bg-background-50', border: 'border-background-200', badge: 'bg-secondary-100 text-secondary-700', icon: 'ri-information-fill text-secondary-500', label: 'Moyenne' },
  low: { bg: 'bg-background-50', border: 'border-background-100', badge: 'bg-background-100 text-foreground-500', icon: 'ri-information-line text-foreground-400', label: 'Basse' },
};

const statusConfig: Record<AutoCorrectionTicket['status'], { bg: string; label: string; icon: string }> = {
  open: { bg: 'bg-red-50 text-red-700 border-red-200', label: 'Ouvert', icon: 'ri-error-warning-line' },
  in_progress: { bg: 'bg-amber-50 text-amber-700 border-amber-200', label: 'En cours', icon: 'ri-loader-4-line' },
  resolved: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Résolu', icon: 'ri-check-line' },
  auto_fixed: { bg: 'bg-accent-50 text-accent-700 border-accent-200', label: 'Auto-corrigé', icon: 'ri-robot-2-line' },
  closed: { bg: 'bg-background-100 text-foreground-500 border-background-200', label: 'Fermé', icon: 'ri-archive-line' },
  false_positive: { bg: 'bg-background-100 text-foreground-500 border-background-200', label: 'Faux positif', icon: 'ri-close-circle-line' },
};

export default function TicketCard({ ticket, onStatusChange }: TicketCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [showResolveInput, setShowResolveInput] = useState(false);
  const [resolveNotes, setResolveNotes] = useState('');
  const p = priorityConfig[ticket.priority];
  const s = statusConfig[ticket.status];

  const formatDate = (d: string | null) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  const handleAction = async (newStatus: AutoCorrectionTicket['status'], resolutionType?: AutoCorrectionTicket['resolution_type']) => {
    setActionLoading(true);
    try {
      await onStatusChange(ticket.id, newStatus, resolutionType, newStatus === 'resolved' ? resolveNotes : undefined);
      setShowResolveInput(false);
      setResolveNotes('');
    } catch {
      // silently fail
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className={`rounded-xl border ${p.border} ${p.bg} transition-all`}>
      {/* Main Row */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-xs font-mono text-foreground-500 whitespace-nowrap">{ticket.ticket_id}</span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${p.badge}`}>
                <i className={`${p.icon} text-[10px] mr-1`}></i>
                {p.label}
              </span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${s.bg}`}>
                <i className={`${s.icon} text-[10px] mr-1`}></i>
                {s.label}
              </span>
            </div>
            <p className="text-sm font-medium text-foreground-900 truncate" title={ticket.target_url}>
              {ticket.target_url}
            </p>
            <div className="flex items-center gap-3 mt-1.5 text-[11px] text-foreground-500 flex-wrap">
              {ticket.status_code && (
                <span className="font-mono font-semibold">{ticket.status_code}</span>
              )}
              {ticket.error_message && (
                <span className="truncate max-w-[200px]">{ticket.error_message}</span>
              )}
              {ticket.source_url && (
                <span className="text-foreground-400 truncate max-w-[150px]">
                  <i className="ri-link mr-0.5"></i>{ticket.source_url}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1.5 text-[10px] text-foreground-400">
              <span>Créé {formatDate(ticket.created_at)}</span>
              {ticket.occurrence_count > 1 && (
                <span className="font-semibold text-amber-600">
                  <i className="ri-repeat-line mr-0.5"></i>{ticket.occurrence_count} occurrences
                </span>
              )}
              {ticket.resolved_at && (
                <span className="text-emerald-600">
                  <i className="ri-check-line mr-0.5"></i>Résolu {formatDate(ticket.resolved_at)}
                </span>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1 shrink-0">
            {ticket.status === 'open' && (
              <button
                onClick={() => handleAction('in_progress')}
                disabled={actionLoading}
                className="px-2.5 py-1.5 text-[11px] font-medium bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
                type="button"
                title="Prendre en charge"
              >
                <i className="ri-play-line mr-1"></i>Prendre
              </button>
            )}
            {(ticket.status === 'open' || ticket.status === 'in_progress') && (
              <button
                onClick={() => setShowResolveInput(!showResolveInput)}
                disabled={actionLoading}
                className="px-2.5 py-1.5 text-[11px] font-medium bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
                type="button"
                title="Marquer comme résolu"
              >
                <i className="ri-check-line mr-1"></i>Résoudre
              </button>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-7 h-7 flex items-center justify-center rounded-md text-foreground-400 hover:bg-background-200 hover:text-foreground-600 transition-colors cursor-pointer"
              type="button"
              title={expanded ? 'Réduire' : 'Détails'}
            >
              <i className={`text-sm ${expanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}></i>
            </button>
          </div>
        </div>

        {/* Resolve Input */}
        {showResolveInput && (
          <div className="mt-3 p-3 bg-background-50 rounded-lg border border-background-200">
            <textarea
              value={resolveNotes}
              onChange={(e) => setResolveNotes(e.target.value)}
              placeholder="Note de résolution (optionnel)..."
              className="w-full px-3 py-2 text-xs border border-background-200 rounded-md resize-none bg-background-50 text-foreground-900 placeholder-foreground-400 focus:outline-none focus:border-accent-300"
              rows={2}
              maxLength={500}
            />
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => handleAction('resolved', 'manual_fix')}
                disabled={actionLoading}
                className="px-3 py-1.5 text-[11px] font-medium bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
                type="button"
              >
                <i className="ri-check-line mr-1"></i>Confirmer résolution
              </button>
              <button
                onClick={() => handleAction('false_positive', 'false_positive')}
                disabled={actionLoading}
                className="px-3 py-1.5 text-[11px] font-medium bg-foreground-100 text-foreground-600 rounded-md hover:bg-foreground-200 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
                type="button"
              >
                <i className="ri-close-circle-line mr-1"></i>Faux positif
              </button>
              <button
                onClick={() => { setShowResolveInput(false); setResolveNotes(''); }}
                className="px-3 py-1.5 text-[11px] text-foreground-500 hover:text-foreground-700 cursor-pointer whitespace-nowrap"
                type="button"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-background-200/70 pt-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-foreground-400 block mb-0.5">Type</span>
              <span className="text-foreground-700 font-medium">{ticket.check_type === 'internal_link' ? 'Lien interne' : 'Page'}</span>
            </div>
            <div>
              <span className="text-foreground-400 block mb-0.5">Première détection</span>
              <span className="text-foreground-700">{formatDate(ticket.first_seen_at)}</span>
            </div>
            <div>
              <span className="text-foreground-400 block mb-0.5">Dernière détection</span>
              <span className="text-foreground-700">{formatDate(ticket.last_seen_at)}</span>
            </div>
            <div>
              <span className="text-foreground-400 block mb-0.5">Occurrences</span>
              <span className="text-foreground-700 font-semibold">{ticket.occurrence_count}</span>
            </div>
          </div>
          {ticket.resolution_notes && (
            <div className="mt-3 p-2.5 bg-background-100 rounded-lg">
              <span className="text-[10px] text-foreground-400 block mb-1">Note de résolution</span>
              <p className="text-xs text-foreground-700">{ticket.resolution_notes}</p>
            </div>
          )}
          {ticket.resolution_type && (
            <div className="mt-2">
              <span className="text-[10px] text-foreground-400">Méthode : </span>
              <span className="text-xs text-foreground-600 font-medium">
                {ticket.resolution_type === 'manual_fix' && 'Correction manuelle'}
                {ticket.resolution_type === 'auto_redirect' && 'Redirection automatique'}
                {ticket.resolution_type === 'auto_remove_link' && 'Suppression lien automatique'}
                {ticket.resolution_type === 'auto_fix_success' && 'Auto-correction réussie'}
                {ticket.resolution_type === 'false_positive' && 'Faux positif'}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



