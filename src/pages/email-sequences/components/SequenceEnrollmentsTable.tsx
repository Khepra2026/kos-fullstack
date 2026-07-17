import { useState } from 'react';
import { SEQUENCE_NAMES } from '@/pages/email-sequences/hooks/useEmailSequences';

interface Enrollment {
  id: string;
  lead_id: string;
  sequence_id: string;
  lead_magnet_slug: string;
  current_step: number;
  total_steps: number;
  status: 'active' | 'completed' | 'paused' | 'unsubscribed';
  next_send_at: string | null;
  last_sent_at: string | null;
  completed_at: string | null;
  unsubscribed_at: string | null;
  opened_count: number;
  clicked_count: number;
  conversion_event: string | null;
  created_at: string;
  updated_at: string;
  lead?: {
    id: string;
    full_name: string;
    email: string;
    organization: string | null;
    pipeline_stage: string | null;
    lead_score: number | null;
  };
}

interface SequenceEnrollmentsTableProps {
  enrollments: Enrollment[];
  onPause: (id: string) => Promise<boolean>;
  onResume: (id: string) => Promise<boolean>;
  onUnsubscribe: (id: string) => Promise<boolean>;
  onManualSend: (id: string) => Promise<boolean>;
}

export default function SequenceEnrollmentsTable({
  enrollments,
  onPause,
  onResume,
  onUnsubscribe,
  onManualSend,
}: SequenceEnrollmentsTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
            Active
          </span>
        );
      case 'paused':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
            En pause
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            <i className="ri-check-line mr-1"></i>
            Terminée
          </span>
        );
      case 'unsubscribed':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <i className="ri-user-unfollow-line mr-1"></i>
            Désinscrit
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  const handleAction = async (action: 'pause' | 'resume' | 'unsubscribe' | 'send', id: string) => {
    setActionLoading(id);
    try {
      switch (action) {
        case 'pause':
          await onPause(id);
          break;
        case 'resume':
          await onResume(id);
          break;
        case 'unsubscribe':
          await onUnsubscribe(id);
          break;
        case 'send':
          await onManualSend(id);
          break;
      }
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px]">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Contact</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Séquence</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Progression</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Statut</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Prochain envoi</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Engagement</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {enrollments.map((enrollment) => {
            const progress = Math.round((enrollment.current_step / enrollment.total_steps) * 100);
            return (
              <>
                <tr key={enrollment.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                        {enrollment.lead?.full_name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">{enrollment.lead?.full_name || '—'}</div>
                        <div className="text-xs text-slate-500">{enrollment.lead?.email || '—'}</div>
                        {enrollment.lead?.organization && (
                          <div className="text-xs text-slate-400">{enrollment.lead.organization}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {SEQUENCE_NAMES[enrollment.lead_magnet_slug] || enrollment.lead_magnet_slug}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-amber-500 rounded-full h-2 transition-all"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-slate-600">
                        {enrollment.current_step}/{enrollment.total_steps}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(enrollment.status)}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {enrollment.next_send_at
                      ? new Date(enrollment.next_send_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-600">
                        <i className="ri-eye-line w-3 h-3 flex items-center justify-center inline mr-0.5"></i>
                        {enrollment.opened_count}
                      </span>
                      <span className="text-slate-600">
                        <i className="ri-cursor-line w-3 h-3 flex items-center justify-center inline mr-0.5"></i>
                        {enrollment.clicked_count}
                      </span>
                      {enrollment.conversion_event && (
                        <span className="text-emerald-600 font-medium">
                          <i className="ri-flashlight-line w-3 h-3 flex items-center justify-center inline mr-0.5"></i>
                          {enrollment.conversion_event}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {enrollment.status === 'active' && (
                        <button
                          onClick={() => handleAction('pause', enrollment.id)}
                          disabled={actionLoading === enrollment.id}
                          className="w-7 h-7 rounded-md bg-amber-50 flex items-center justify-center hover:bg-amber-100 transition-colors cursor-pointer disabled:opacity-50"
                          type="button"
                          title="Mettre en pause"
                        >
                          <i className="ri-pause-line w-3 h-3 flex items-center justify-center text-amber-600"></i>
                        </button>
                      )}
                      {enrollment.status === 'paused' && (
                        <button
                          onClick={() => handleAction('resume', enrollment.id)}
                          disabled={actionLoading === enrollment.id}
                          className="w-7 h-7 rounded-md bg-emerald-50 flex items-center justify-center hover:bg-emerald-100 transition-colors cursor-pointer disabled:opacity-50"
                          type="button"
                          title="Reprendre"
                        >
                          <i className="ri-play-line w-3 h-3 flex items-center justify-center text-emerald-600"></i>
                        </button>
                      )}
                      <button
                        onClick={() => handleAction('send', enrollment.id)}
                        disabled={actionLoading === enrollment.id}
                        className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer disabled:opacity-50"
                        type="button"
                        title="Envoyer manuellement"
                      >
                        <i className="ri-send-plane-line w-3 h-3 flex items-center justify-center text-blue-600"></i>
                      </button>
                      {enrollment.status !== 'unsubscribed' && enrollment.status !== 'completed' && (
                        <button
                          onClick={() => handleAction('unsubscribe', enrollment.id)}
                          disabled={actionLoading === enrollment.id}
                          className="w-7 h-7 rounded-md bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer disabled:opacity-50"
                          type="button"
                          title="Désinscrire"
                        >
                          <i className="ri-user-unfollow-line w-3 h-3 flex items-center justify-center text-red-600"></i>
                        </button>
                      )}
                      <button
                        onClick={() => setExpandedRow(expandedRow === enrollment.id ? null : enrollment.id)}
                        className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
                        type="button"
                        title="Détails"
                      >
                        <i className={`${expandedRow === enrollment.id ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} w-3 h-3 flex items-center justify-center text-slate-600`}></i>
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRow === enrollment.id && (
                  <tr>
                    <td colSpan={7} className="px-4 py-4 bg-slate-50">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Inscrit le</div>
                          <div className="text-slate-900">
                            {new Date(enrollment.created_at).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Dernier envoi</div>
                          <div className="text-slate-900">
                            {enrollment.last_sent_at
                              ? new Date(enrollment.last_sent_at).toLocaleDateString('fr-FR')
                              : '—'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Terminé le</div>
                          <div className="text-slate-900">
                            {enrollment.completed_at
                              ? new Date(enrollment.completed_at).toLocaleDateString('fr-FR')
                              : '—'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Désinscrit le</div>
                          <div className="text-slate-900">
                            {enrollment.unsubscribed_at
                              ? new Date(enrollment.unsubscribed_at).toLocaleDateString('fr-FR')
                              : '—'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Score lead</div>
                          <div className="text-slate-900 font-medium">
                            {enrollment.lead?.lead_score || '—'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Pipeline</div>
                          <div className="text-slate-900">
                            {enrollment.lead?.pipeline_stage || '—'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Ouvertures</div>
                          <div className="text-slate-900">{enrollment.opened_count}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Clics</div>
                          <div className="text-slate-900">{enrollment.clicked_count}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
          {enrollments.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                <i className="ri-inbox-line text-2xl mb-2 block"></i>
                Aucune inscription active. Les leads seront automatiquement inscrits lorsqu''ils téléchargent un lead magnet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}