import { useState } from 'react';
import { Proposal } from '@/pages/proposals/hooks/useProposals';

interface ProposalDetailModalProps {
  proposal: Proposal;
  onClose: () => void;
  onStatusChange: (proposalId: string, status: string) => void;
  onDelete: (proposalId: string) => void;
}

const statusOptions = [
  { value: 'draft', label: 'Brouillon', color: 'bg-slate-100 text-slate-700' },
  { value: 'sent', label: 'Envoyée', color: 'bg-blue-100 text-blue-700' },
  { value: 'viewed', label: 'Vue', color: 'bg-indigo-100 text-indigo-700' },
  { value: 'accepted', label: 'Acceptée', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'rejected', label: 'Refusée', color: 'bg-red-100 text-red-700' },
  { value: 'expired', label: 'Expirée', color: 'bg-gray-100 text-gray-700' },
];

export default function ProposalDetailModal({
  proposal,
  onClose,
  onStatusChange,
  onDelete,
}: ProposalDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'preview'>('details');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const currentStatus = statusOptions.find((s) => s.value === proposal.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <i className="ri-file-paper-line text-white text-lg w-5 h-5 flex items-center justify-center"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{proposal.title}</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>{proposal.client_name}</span>
                <span className="text-slate-300">|</span>
                <span>{proposal.client_organization || '—'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${currentStatus?.color || 'bg-slate-100 text-slate-700'}`}>
              {currentStatus?.label || proposal.status}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              type="button"
            >
              <i className="ri-close-line text-xl text-slate-500"></i>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-slate-200">
          <div className="flex gap-6">
            {(['details', 'preview'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-amber-500 text-amber-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
                type="button"
              >
                {tab === 'details' && 'Détails'}
                {tab === 'preview' && 'Aperçu PDF'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Actions rapides */}
              <div className="flex flex-wrap gap-2">
                <a
                  href={`mailto:${proposal.client_email}?subject=Proposition: ${encodeURIComponent(proposal.title)}`}
                  className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors flex items-center gap-1.5"
                >
                  <i className="ri-mail-send-line w-3 h-3 flex items-center justify-center"></i>
                  Envoyer par email
                </a>
                <button
                  onClick={() => {
                    const html = proposal.custom_fields?.html_preview as string;
                    if (html) {
                      const w = window.open('', '_blank');
                      if (w) w.document.write(html);
                    }
                  }}
                  className="px-3 py-2 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-100 transition-colors cursor-pointer flex items-center gap-1.5"
                  type="button"
                >
                  <i className="ri-eye-line w-3 h-3 flex items-center justify-center"></i>
                  Ouvrir PDF
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-3 py-2 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors cursor-pointer flex items-center gap-1.5"
                  type="button"
                >
                  <i className="ri-delete-bin-line w-3 h-3 flex items-center justify-center"></i>
                  Supprimer
                </button>
              </div>

              {showDeleteConfirm && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-700 mb-3">Confirmer la suppression de cette proposition ?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        onDelete(proposal.id);
                        setShowDeleteConfirm(false);
                      }}
                      className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 cursor-pointer"
                      type="button"
                    >
                      Oui, supprimer
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-3 py-1.5 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-100 cursor-pointer"
                      type="button"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}

              {/* Infos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Client</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Nom</span><span className="font-medium text-slate-900">{proposal.client_name}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Email</span><span className="font-medium text-slate-900">{proposal.client_email}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Organisation</span><span className="font-medium text-slate-900">{proposal.client_organization || '—'}</span></div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Mission</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Type</span><span className="font-medium text-slate-900">{proposal.type}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Durée</span><span className="font-medium text-slate-900">{proposal.duration_days ? `${proposal.duration_days} jours` : '—'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Date</span><span className="font-medium text-slate-900">{new Date(proposal.created_at).toLocaleDateString('fr-FR')}</span></div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Financier</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Montant</span><span className="font-medium text-slate-900">{proposal.amount ? `${proposal.amount.toLocaleString('fr-FR')} ${proposal.currency}` : '—'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Template</span><span className="font-medium text-slate-900">{proposal.template_used || '—'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Vues</span><span className="font-medium text-slate-900">{proposal.view_count}</span></div>
                  </div>
                </div>
              </div>

              {/* Changement de statut */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Changer le statut</h3>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => onStatusChange(proposal.id, status.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${status.color} ${
                        proposal.status === status.value ? 'ring-2 ring-offset-1 ring-slate-400' : 'hover:opacity-80'
                      }`}
                      type="button"
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Livrables */}
              {proposal.deliverables && proposal.deliverables.length > 0 && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Livrables</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {proposal.deliverables.map((d, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <i className="ri-file-list-line text-amber-500 w-3 h-3 flex items-center justify-center"></i>
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {proposal.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-xs font-semibold text-yellow-800 uppercase tracking-wider mb-2">Notes</h3>
                  <p className="text-sm text-yellow-900">{proposal.notes}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <p className="text-sm text-slate-600 mb-4">
                  L'aperçu de la proposition PDF s'affiche dans un nouvel onglet.
                </p>
                <button
                  onClick={() => {
                    const html = proposal.custom_fields?.html_preview as string;
                    if (html) {
                      const w = window.open('', '_blank');
                      if (w) {
                        w.document.write(html);
                        w.document.close();
                      }
                    }
                  }}
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-colors cursor-pointer flex items-center gap-2 inline-flex"
                  type="button"
                >
                  <i className="ri-eye-line w-4 h-4 flex items-center justify-center"></i>
                  Ouvrir l'aperçu PDF
                </button>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Contenu HTML</h3>
                <pre className="text-xs text-slate-600 overflow-x-auto whitespace-pre-wrap bg-white p-3 rounded border border-slate-200 max-h-64 overflow-y-auto">
                  {String(proposal.custom_fields?.html_preview || '').slice(0, 2000)}
                  {String(proposal.custom_fields?.html_preview || '').length > 2000 && '...'}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



