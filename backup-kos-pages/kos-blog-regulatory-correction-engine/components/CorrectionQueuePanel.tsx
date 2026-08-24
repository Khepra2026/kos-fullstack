import { Link } from 'react-router-dom';
import type { CorrectionTicket } from '@/mocks/selfLearningEngine';

interface CorrectionQueuePanelProps {
  queue: CorrectionTicket[];
  p0Count: number;
  p1Count: number;
  p2Count: number;
}

const severityConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  P0: { label: 'Critique', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
  P1: { label: 'Élevé', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  P2: { label: 'Moyen', color: 'text-secondary-700', bg: 'bg-secondary-50', border: 'border-secondary-200' },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'text-amber-600' },
  in_progress: { label: 'En cours', color: 'text-primary-600' },
  fixed: { label: 'Corrigé', color: 'text-emerald-600' },
  validated: { label: 'Validé', color: 'text-emerald-700' },
};

export default function CorrectionQueuePanel({ queue, p0Count, p1Count, p2Count }: CorrectionQueuePanelProps) {
  const sorted = [...queue].sort((a, b) => {
    const order = { P0: 0, P1: 1, P2: 2 };
    return order[a.severity] - order[b.severity];
  });

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
          <div className="flex items-center gap-2">
            <i className="ri-error-warning-line text-red-600 text-xl"></i>
            <div>
              <span className="text-2xl font-bold text-red-700 font-heading">{p0Count}</span>
              <span className="text-xs text-red-600 ml-1">P0 — Critiques</span>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
          <div className="flex items-center gap-2">
            <i className="ri-alert-line text-amber-600 text-xl"></i>
            <div>
              <span className="text-2xl font-bold text-amber-700 font-heading">{p1Count}</span>
              <span className="text-xs text-amber-600 ml-1">P1 — Élevées</span>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-secondary-50 border border-secondary-200">
          <div className="flex items-center gap-2">
            <i className="ri-information-line text-foreground-500 text-xl"></i>
            <div>
              <span className="text-2xl font-bold text-foreground-700 font-heading">{p2Count}</span>
              <span className="text-xs text-foreground-500 ml-1">P2 — Moyennes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Queue items */}
      <div className="space-y-3">
        {sorted.map(ticket => {
          const sev = severityConfig[ticket.severity];
          const st = statusConfig[ticket.status];
          return (
            <div key={ticket.id} className={`p-4 rounded-2xl border ${sev.border} ${sev.bg}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${sev.color} border ${sev.border}`}>
                      {ticket.severity}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/60 text-foreground-600 font-semibold">
                      {ticket.id}
                    </span>
                    <span className={`text-[10px] font-semibold ${st.color}`}>
                      {st.label}
                    </span>
                  </div>
                  <Link
                    to={`/blog/${ticket.articleSlug}`}
                    className="text-sm font-semibold text-foreground-900 hover:text-accent-600 transition-colors cursor-pointer block"
                  >
                    {ticket.articleTitle}
                  </Link>
                  <p className="text-xs text-foreground-600 mt-1">{ticket.patternDescription}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-xs font-semibold text-emerald-700 block">{ticket.estimatedImpact}</span>
                    <span className="text-[10px] text-foreground-400">{ticket.assignedPartner}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}





