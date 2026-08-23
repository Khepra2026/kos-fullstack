import { useNavigate } from 'react-router-dom';
import { CrmLead } from '@/pages/crm/hooks/useCrmData';

interface CrmProjectsViewProps {
  leads: CrmLead[];
}

export default function CrmProjectsView({ leads }: CrmProjectsViewProps) {
  const navigate = useNavigate();

  const activeProjects = leads.filter((l) =>
    ['mission_signed', 'mission_in_progress', 'client_active', 'client_recurring'].includes(l.pipeline_stage)
  );

  const milestones = [
    { id: 'kickoff', label: 'Lancement' },
    { id: 'diagnostic', label: 'Diagnostic' },
    { id: 'analysis', label: 'Analyse' },
    { id: 'recommendations', label: 'Recommandations' },
    { id: 'delivery', label: 'Livraison' },
    { id: 'followup', label: 'Suivi' },
  ];

  const getRandomProgress = (leadId: string): number => {
    const hash = leadId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return 15 + (hash % 71);
  };

  const getRandomMilestone = (leadId: string): number => {
    const hash = leadId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return 1 + (hash % 5);
  };

  const getTypeMission = (lead: CrmLead): string => {
    if (lead.form_type?.includes('diagnostic')) return 'Diagnostic';
    if (lead.form_type?.includes('due-diligence') || lead.subject?.includes('Due Diligence')) return 'Due Diligence';
    if (lead.form_type?.includes('audit') || lead.subject?.includes('Audit')) return 'Audit';
    if (lead.form_type?.includes('conformite') || lead.subject?.includes('Conformité')) return 'Conformité';
    if (lead.form_type?.includes('prix-transfert') || lead.subject?.includes('Prix de Transfert')) return 'Prix de Transfert';
    if (lead.form_type?.includes('gouvernance') || lead.subject?.includes('Gouvernance')) return 'Gouvernance';
    if (lead.form_type?.includes('conseil') || lead.subject?.includes('Conseil')) return 'Conseil Stratégique';
    return 'Mission';
  };

  if (activeProjects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <i className="ri-briefcase-line text-3xl text-slate-400 w-10 h-10 flex items-center justify-center"></i>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">Aucun projet actif</h3>
        <p className="text-sm text-slate-500 mb-6">Les missions signées et en cours apparaîtront ici.</p>
        <button
          onClick={() => navigate('/crm')}
          className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg text-sm font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all cursor-pointer whitespace-nowrap"
          type="button"
        >
          Voir le Pipeline
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Résumé */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Missions actives', value: activeProjects.length, icon: 'ri-briefcase-line', color: 'text-teal-700', bg: 'bg-teal-50' },
          { label: 'En cours', value: activeProjects.filter(l => l.pipeline_stage === 'mission_in_progress').length, icon: 'ri-loader-4-line', color: 'text-cyan-700', bg: 'bg-cyan-50' },
          { label: 'Clients actifs', value: activeProjects.filter(l => ['client_active', 'client_recurring'].includes(l.pipeline_stage)).length, icon: 'ri-user-star-line', color: 'text-emerald-700', bg: 'bg-emerald-50' },
          { label: 'Valeur totale', value: `${Math.round(activeProjects.reduce((sum, l) => sum + (l.deal_value || 0), 0)).toLocaleString('fr-FR')} FCFA`, icon: 'ri-money-cny-circle-line', color: 'text-amber-700', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} rounded-xl p-4 border border-slate-200`}>
            <div className="flex items-center gap-2 mb-1">
              <i className={`${stat.icon} ${stat.color} w-4 h-4 flex items-center justify-center`}></i>
              <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
            </div>
            <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeProjects.map((lead) => {
          const progress = getRandomProgress(lead.id);
          const currentMilestone = getRandomMilestone(lead.id);
          const missionType = getTypeMission(lead);
          const isDelayed = lead.next_follow_up_at && lead.next_follow_up_at <= new Date().toISOString();

          return (
            <div key={lead.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {lead.full_name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{lead.full_name}</h3>
                    <p className="text-xs text-slate-500">{lead.organization || 'Indépendant'}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{missionType} — {lead.country || 'Non spécifié'}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    lead.pipeline_stage === 'mission_in_progress' ? 'bg-cyan-100 text-cyan-700'
                    : lead.pipeline_stage === 'client_recurring' ? 'bg-lime-100 text-lime-700'
                    : 'bg-green-100 text-green-700'
                  }`}>
                    {lead.pipeline_stage === 'mission_in_progress' ? 'En cours'
                      : lead.pipeline_stage === 'client_recurring' ? 'Récurrent'
                      : 'Actif'}
                  </span>
                  {isDelayed && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-600 flex items-center gap-1 whitespace-nowrap">
                      <i className="ri-alarm-line w-3 h-3 flex items-center justify-center"></i>
                      Retard
                    </span>
                  )}
                </div>
              </div>

              {/* Barre de progression */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-500 font-medium">Progression</span>
                  <span className="text-xs font-bold text-slate-700">{progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                      background: progress >= 80 ? 'linear-gradient(90deg, #10b981, #34d399)'
                        : progress >= 50 ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                        : 'linear-gradient(90deg, #6366f1, #818cf8)'
                    }}
                  ></div>
                </div>
              </div>

              {/* Jalons */}
              <div className="mb-4">
                <span className="text-xs text-slate-500 font-medium block mb-2">Jalons</span>
                <div className="flex items-center gap-1">
                  {milestones.map((m, idx) => {
                    const isCompleted = idx < currentMilestone;
                    const isCurrent = idx === currentMilestone;
                    return (
                      <div key={m.id} className="flex items-center flex-1">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCompleted ? 'bg-emerald-500 text-white'
                            : isCurrent ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                            : 'bg-slate-200 text-slate-400'
                          }`}
                          title={m.label}
                        >
                          {isCompleted ? <i className="ri-check-line w-3 h-3 flex items-center justify-center"></i> : idx + 1}
                        </div>
                        {idx < milestones.length - 1 && (
                          <div className={`flex-1 h-0.5 mx-0.5 ${
                            idx < currentMilestone ? 'bg-emerald-400' : 'bg-slate-200'
                          }`}></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Infos + Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{lead.deal_value ? `${lead.deal_value.toLocaleString('fr-FR')} FCFA` : '—'}</span>
                  </div>
                  {lead.meeting_scheduled_at && (
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <i className="ri-calendar-line w-3 h-3 flex items-center justify-center"></i>
                      {new Date(lead.meeting_scheduled_at).toLocaleDateString('fr-FR')}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => navigate('/email-sequences')}
                  className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-xs font-medium hover:bg-teal-100 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
                  type="button"
                >
                  <i className="ri-mail-send-line w-3 h-3 flex items-center justify-center"></i>
                  Campagne
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



