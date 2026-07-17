import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CrmLead, LeadActivity } from '@/pages/crm/hooks/useCrmData';

interface LeadDetailModalProps {
  lead: CrmLead;
  activities: LeadActivity[];
  onClose: () => void;
  onStageChange: (leadId: string, stage: string) => void;
  onAddNote: (leadId: string, note: string) => void;
  onTriggerFollowUp: (leadId: string) => void;
}

const stageOptions = [
  { value: 'lead_generated', label: 'Lead Généré', color: 'bg-slate-100 text-slate-700' },
  { value: 'lead_qualified', label: 'Lead Qualifié', color: 'bg-blue-100 text-blue-700' },
  { value: 'contact_engaged', label: 'Contact Engagé', color: 'bg-indigo-100 text-indigo-700' },
  { value: 'lead_hot', label: 'Lead Chaud', color: 'bg-amber-100 text-amber-700' },
  { value: 'meeting_scheduled', label: 'RDV Fixé', color: 'bg-orange-100 text-orange-700' },
  { value: 'proposal_sent', label: 'Proposition Envoyée', color: 'bg-teal-100 text-teal-700' },
  { value: 'mission_signed', label: 'Mission Signée', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'mission_in_progress', label: 'Mission En Cours', color: 'bg-cyan-100 text-cyan-700' },
  { value: 'client_active', label: 'Client Actif', color: 'bg-green-100 text-green-700' },
  { value: 'client_recurring', label: 'Client Récurrent / Upsell', color: 'bg-lime-100 text-lime-700' },
  { value: 'lost', label: 'Perdu', color: 'bg-gray-100 text-gray-700' },
];

function getActivityIcon(type: string): string {
  const icons: Record<string, string> = {
    email_sent: 'ri-mail-send-line',
    email_opened: 'ri-mail-open-line',
    email_clicked: 'ri-mail-check-line',
    page_view: 'ri-eye-line',
    download: 'ri-download-line',
    form_submit: 'ri-file-list-line',
    diagnostic_complete: 'ri-stethoscope-line',
    meeting_scheduled: 'ri-calendar-check-line',
    status_change: 'ri-arrow-left-right-line',
    note_added: 'ri-sticky-note-line',
    lead_scored: 'ri-bar-chart-line',
    follow_up_sent: 'ri-send-plane-line',
    call_made: 'ri-phone-line',
    proposal_sent: 'ri-file-paper-line',
    contract_signed: 'ri-file-shield-line',
    payment_received: 'ri-money-euro-circle-line',
    upsell: 'ri-line-chart-line',
  };
  return icons[type] || 'ri-question-line';
}

function getActivityLabel(type: string): string {
  const labels: Record<string, string> = {
    email_sent: 'Email envoyé',
    email_opened: 'Email ouvert',
    email_clicked: 'Clic email',
    page_view: 'Page vue',
    download: 'Téléchargement',
    form_submit: 'Formulaire soumis',
    diagnostic_complete: 'Diagnostic terminé',
    meeting_scheduled: 'Rendez-vous fixé',
    status_change: 'Changement de statut',
    note_added: 'Note ajoutée',
    lead_scored: 'Score mis à jour',
    follow_up_sent: 'Relance envoyée',
    call_made: 'Appel effectué',
    proposal_sent: 'Proposition envoyée',
    contract_signed: 'Contrat signé',
    payment_received: 'Paiement reçu',
    upsell: 'Upsell détecté',
  };
  return labels[type] || type;
}

export default function LeadDetailModal({
  lead,
  activities,
  onClose,
  onStageChange,
  onAddNote,
  onTriggerFollowUp,
}: LeadDetailModalProps) {
  const { t } = useTranslation();
  const [note, setNote] = useState('');
  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'notes'>('info');

  const currentStage = stageOptions.find((s) => s.value === lead.pipeline_stage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
              {lead.full_name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{lead.full_name}</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>{lead.email}</span>
                {lead.phone && <span className="text-slate-300">|</span>}
                {lead.phone && <span>{lead.phone}</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${currentStage?.color || 'bg-slate-100 text-slate-700'}`}>
              {currentStage?.label || lead.pipeline_stage}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-700">
              Score: {lead.lead_score || 0}
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
            {(['info', 'history', 'notes'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-teal-500 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
                type="button"
              >
                {tab === 'info' && 'Informations'}
                {tab === 'history' && `Historique (${activities.length})`}
                {tab === 'notes' && 'Notes'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Actions rapides */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onTriggerFollowUp(lead.id)}
                  className="px-3 py-2 bg-teal-50 text-teal-700 rounded-lg text-xs font-medium hover:bg-teal-100 transition-colors cursor-pointer flex items-center gap-1.5"
                  type="button"
                >
                  <i className="ri-send-plane-line w-3 h-3 flex items-center justify-center"></i>
                  Relancer maintenant
                </button>
                <a
                  href={`mailto:${lead.email}`}
                  className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors flex items-center gap-1.5"
                >
                  <i className="ri-mail-line w-3 h-3 flex items-center justify-center"></i>
                  Envoyer un email
                </a>
                <a
                  href="https://calendly.com/khepra-experts/diagnostic-strategique"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-orange-50 text-orange-700 rounded-lg text-xs font-medium hover:bg-orange-100 transition-colors flex items-center gap-1.5"
                >
                  <i className="ri-calendar-line w-3 h-3 flex items-center justify-center"></i>
                  Planifier RDV
                </a>
              </div>

              {/* Informations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">{t('crm.lead.organization')}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Organisation</span><span className="font-medium text-slate-900">{lead.organization || '—'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Poste</span><span className="font-medium text-slate-900">{lead.position || '—'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Secteur</span><span className="font-medium text-slate-900">{lead.sector || '—'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Pays</span><span className="font-medium text-slate-900">{lead.country || '—'}</span></div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">{t('crm.lead.source')}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Source</span><span className="font-medium text-slate-900">{lead.source_page || 'Direct'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Type</span><span className="font-medium text-slate-900">{lead.form_type || 'Contact'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Date</span><span className="font-medium text-slate-900">{new Date(lead.created_at).toLocaleDateString('fr-FR')}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Expert assigné</span><span className="font-medium text-slate-900">{lead.assigned_expert || '—'}</span></div>
                  </div>
                </div>
              </div>

              {/* Changement de statut */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Changer de statut</h3>
                <div className="flex flex-wrap gap-2">
                  {stageOptions.map((stage) => (
                    <button
                      key={stage.value}
                      onClick={() => onStageChange(lead.id, stage.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${stage.color} ${
                        lead.pipeline_stage === stage.value ? 'ring-2 ring-offset-1 ring-slate-400' : 'hover:opacity-80'
                      }`}
                      type="button"
                    >
                      {stage.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Valeur estimée */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Valeur estimée</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{lead.deal_value?.toLocaleString('fr-FR') || '—'} FCFA</div>
                    <div className="text-xs text-slate-500 mt-1">Valeur deal</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{lead.probability || 0}%</div>
                    <div className="text-xs text-slate-500 mt-1">Probabilité</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600">
                      {lead.deal_value && lead.probability ? Math.round(lead.deal_value * lead.probability / 100).toLocaleString('fr-FR') : '—'} FCFA
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Valeur pondérée</div>
                  </div>
                </div>
              </div>

              {/* Message initial */}
              {lead.message && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Message initial</h3>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{lead.message}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              {activities.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <i className="ri-history-line text-4xl mb-2 block"></i>
                  <p className="text-sm">Aucune activité enregistrée</p>
                </div>
              ) : (
                activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <i className={`${getActivityIcon(activity.activity_type)} text-teal-600 text-sm w-4 h-4 flex items-center justify-center`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-slate-900">{getActivityLabel(activity.activity_type)}</span>
                        <span className="text-xs text-slate-400 whitespace-nowrap">
                          {new Date(activity.created_at).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                        <div className="mt-1 text-xs text-slate-500">
                          {activity.metadata.note && <p className="italic">{String(activity.metadata.note)}</p>}
                          {activity.metadata.new_stage && <p>Nouveau statut : <span className="font-medium">{activity.metadata.new_stage}</span></p>}
                          {activity.metadata.score && <p>Score : <span className="font-medium">{String(activity.metadata.score)}</span></p>}
                          {activity.metadata.reason && <p>Raison : <span className="font-medium">{String(activity.metadata.reason)}</span></p>}
                          {activity.metadata.delay && <p>Relance {String(activity.metadata.delay)} — Séquence {String(activity.metadata.sequence)}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ajouter une note</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Note interne sur ce lead..."
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-400">{note.length}/500</span>
                  <button
                    onClick={() => {
                      if (note.trim()) {
                        onAddNote(lead.id, note.trim());
                        setNote('');
                      }
                    }}
                    disabled={!note.trim()}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    type="button"
                  >
                    <i className="ri-add-line w-3 h-3 flex items-center justify-center inline-block mr-1"></i>
                    Ajouter
                  </button>
                </div>
              </div>

              {lead.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-xs font-semibold text-yellow-800 uppercase tracking-wider mb-2">Notes existantes</h3>
                  <div className="text-sm text-yellow-900 whitespace-pre-wrap">{lead.notes}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}