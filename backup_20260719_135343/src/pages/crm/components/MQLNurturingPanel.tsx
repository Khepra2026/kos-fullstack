import { useState } from 'react';
import { useMQLNurturing } from '@/hooks/useMQLNurturing';
import { useLeadScoreRealtime } from '@/hooks/useLeadScoreRealtime';
import { useEmailFunnelAutomation } from '@/hooks/useEmailFunnelAutomation';

export default function MQLNurturingPanel() {
  const {
    leads,
    stats,
    sequences,
    loading: leadsLoading,
    selectedSequence,
    setSelectedSequence,
    triggerSequenceBatch,
    getFilteredLeads,
    advanceStep,
    pauseSequence,
  } = useMQLNurturing();

  const { simulateRealtimeUpdate } = useLeadScoreRealtime();
  const {
    loading: automationLoading,
    progress,
    summary,
    lastRunAt,
    runAutomation,
    runSequenceBatch: runAutomationBatch,
    reset,
  } = useEmailFunnelAutomation();

  const [activeSequence, setActiveSequence] = useState<string | null>(null);
  const [batchLoading, setBatchLoading] = useState<string | null>(null);
  const [showAutomationResults, setShowAutomationResults] = useState(false);
  const filteredLeads = getFilteredLeads();

  const handleTriggerBatch = async (sequenceId: string) => {
    setBatchLoading(sequenceId);
    const leadIds = leads.filter((l) => l.nurturing_sequence === sequenceId).map((l) => l.id);
    await runAutomationBatch(sequenceId, leadIds);
    setBatchLoading(null);
  };

  const handleSimulateEngagement = async (leadId: string, activity: string) => {
    await simulateRealtimeUpdate(leadId, activity);
  };

  const handleRunFullAutomation = async () => {
    setShowAutomationResults(true);
    await runAutomation({ mode: 'auto', forceImmediate: true });
  };

  return (
    <div className="space-y-6">
      {/* Automation banner */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl border border-teal-200 p-5 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <i className="ri-robot-line text-white text-lg w-5 h-5 flex items-center justify-center"></i>
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Moteur d'Automatisation Nurturing</h3>
            <p className="text-teal-100 text-xs">
              {automationLoading
                ? `Automatisation en cours... ${progress}%`
                : lastRunAt
                ? `Dernière exécution : ${new Date(lastRunAt).toLocaleString('fr-FR')}`
                : '442 MQL sans suivi — assignation automatique + envoi immédiat'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {automationLoading && (
            <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
          <button
            type="button"
            onClick={handleRunFullAutomation}
            disabled={automationLoading}
            className="px-4 py-2 rounded-lg bg-white text-teal-700 text-sm font-bold hover:bg-teal-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          >
            {automationLoading ? (
              <>
                <i className="ri-loader-4-line animate-spin w-4 h-4 flex items-center justify-center inline mr-1"></i>
                En cours...
              </>
            ) : (
              <>
                <i className="ri-rocket-line w-4 h-4 flex items-center justify-center inline mr-1"></i>
                Lancer l'Automatisation
              </>
            )}
          </button>
        </div>
      </div>

      {/* Automation results */}
      {showAutomationResults && summary && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <i className="ri-bar-chart-line text-teal-500 w-4 h-4 flex items-center justify-center"></i>
              Résultats de l'Automatisation
            </h3>
            <button
              type="button"
              onClick={() => setShowAutomationResults(false)}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <i className="ri-close-line w-4 h-4 flex items-center justify-center"></i>
            </button>
          </div>
          <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-slate-700 mb-0.5">{summary.leadsScanned}</div>
              <div className="text-xs text-slate-500">MQL scannés</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-emerald-700 mb-0.5">{summary.leadsEnrolled}</div>
              <div className="text-xs text-emerald-600">Enrollés</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-700 mb-0.5">{summary.emailsTriggered}</div>
              <div className="text-xs text-blue-600">Emails envoyés</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-amber-700 mb-0.5">{summary.errors.length}</div>
              <div className="text-xs text-amber-600">Erreurs</div>
            </div>
          </div>
          {summary.sequences.length > 0 && (
            <div className="px-5 pb-4">
              <div className="text-xs text-slate-500 mb-2 font-semibold">Séquences assignées :</div>
              <div className="flex flex-wrap gap-2">
                {summary.sequences.slice(0, 20).map((s) => (
                  <span key={s.leadId} className="px-2 py-1 rounded-md bg-slate-100 text-xs text-slate-600">
                    {s.sequence} — étape {s.step}
                  </span>
                ))}
                {summary.sequences.length > 20 && (
                  <span className="px-2 py-1 rounded-md bg-slate-100 text-xs text-slate-500">
                    +{summary.sequences.length - 20} autres
                  </span>
                )}
              </div>
            </div>
          )}
          {summary.errors.length > 0 && (
            <div className="px-5 pb-4">
              <div className="text-xs text-red-500 mb-2 font-semibold">Erreurs :</div>
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {summary.errors.slice(0, 5).map((err, i) => (
                  <div key={i} className="text-xs text-red-600 bg-red-50 rounded-md px-2 py-1">
                    {err}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'MQL sans suivi', value: String(stats.totalMQLWithoutFollowUp), icon: 'ri-user-add-line', color: 'text-slate-700', bg: 'bg-slate-50' },
          { label: 'Séquence Éducatif', value: String(stats.inEducationalSequence), icon: 'ri-book-open-line', color: 'text-blue-700', bg: 'bg-blue-50' },
          { label: 'Séquence Cas Clients', value: String(stats.inCaseStudySequence), icon: 'ri-building-line', color: 'text-amber-700', bg: 'bg-amber-50' },
          { label: 'Séquence Proposition', value: String(stats.inProposalSequence), icon: 'ri-hand-coin-line', color: 'text-emerald-700', bg: 'bg-emerald-50' },
          { label: 'Séquence Relance', value: String(stats.inRelanceSequence), icon: 'ri-notification-3-line', color: 'text-red-700', bg: 'bg-red-50' },
          { label: 'Hot leads détectés', value: String(stats.hotLeadsDetected), icon: 'ri-fire-line', color: 'text-orange-700', bg: 'bg-orange-50' },
        ].map((kpi, i) => (
          <div key={i} className={`${kpi.bg} rounded-xl border border-slate-100 p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <i className={`${kpi.icon} ${kpi.color} text-sm w-4 h-4 flex items-center justify-center`}></i>
              </div>
            </div>
            <div className={`text-2xl font-bold ${kpi.color} mb-0.5`}>{kpi.value}</div>
            <div className="text-xs text-slate-500 font-medium">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Sequences overview */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <i className="ri-mail-send-line text-teal-500 w-4 h-4 flex items-center justify-center"></i>
            Moteur de Nurturing — 4 Séquences Actives
          </h2>
          <span className="text-xs text-slate-400">{stats.totalMQLWithoutFollowUp} MQL ciblés</span>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sequences.map((seq) => (
            <div
              key={seq.id}
              className={`rounded-xl border-2 p-4 cursor-pointer transition-all ${
                activeSequence === seq.id ? 'border-teal-500 shadow-md' : 'border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => setActiveSequence(activeSequence === seq.id ? null : seq.id)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${seq.color}15` }}>
                  <i className={`${seq.icon} text-lg w-5 h-5 flex items-center justify-center`} style={{ color: seq.color }}></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{seq.name}</h3>
                  <p className="text-[10px] text-slate-400">Score {seq.targetScoreRange}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">{seq.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold" style={{ color: seq.color }}>
                  {seq.steps.length} étapes
                </span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleTriggerBatch(seq.id); }}
                  className="px-2 py-1 rounded-md text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {batchLoading === seq.id ? (
                    <i className="ri-loader-4-line animate-spin w-3 h-3 flex items-center justify-center inline"></i>
                  ) : (
                    <><i className="ri-play-line w-3 h-3 flex items-center justify-center inline mr-1"></i>Lancer</>
                  )}
                </button>
              </div>
              {activeSequence === seq.id && (
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                  {seq.steps.map((step) => (
                    <div key={step.step} className="flex items-center gap-2 text-xs">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-slate-100 text-slate-600 flex-shrink-0">
                        {step.step}
                      </span>
                      <span className="text-slate-700">{step.name}</span>
                      <span className="text-slate-400 ml-auto">{step.delayHours}h</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Leads table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <i className="ri-user-follow-line text-teal-500 w-4 h-4 flex items-center justify-center"></i>
            MQL en Nurturing — {filteredLeads.length} leads
          </h2>
          <div className="flex items-center gap-2">
            <select
              value={selectedSequence}
              onChange={(e) => setSelectedSequence(e.target.value)}
              className="text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">Toutes les séquences</option>
              {sequences.map((seq) => (
                <option key={seq.id} value={seq.id}>{seq.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Contact</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Score</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Séquence</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Étape</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Activité</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Jours sans contact</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Next Best Action</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => {
                const seq = sequences.find((s) => s.id === lead.nurturing_sequence);
                const scoreColor = lead.lead_score >= 70 ? 'text-amber-700' : lead.lead_score >= 50 ? 'text-orange-700' : 'text-slate-500';
                const scoreBg = lead.lead_score >= 70 ? 'bg-amber-50' : lead.lead_score >= 50 ? 'bg-orange-50' : 'bg-slate-50';
                return (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                          {lead.full_name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{lead.full_name}</div>
                          <div className="text-xs text-slate-500">{lead.organization}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-bold ${scoreColor} ${scoreBg} px-2 py-0.5 rounded`}>
                        {lead.lead_score}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: seq?.color || '#94a3b8' }}></span>
                        {seq?.name || lead.nurturing_sequence}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-semibold text-slate-700">
                        {lead.nurturing_step} / {seq?.steps.length || 1}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span><i className="ri-eye-line w-3 h-3 flex items-center justify-center inline"></i> {lead.email_opens}</span>
                        <span><i className="ri-cursor-line w-3 h-3 flex items-center justify-center inline"></i> {lead.email_clicks}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-semibold ${lead.days_since_last_activity > 21 ? 'text-red-500' : 'text-slate-500'}`}>
                        {lead.days_since_last_activity}j
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs text-teal-600 font-medium">{lead.next_best_action}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleSimulateEngagement(lead.id, 'email_opened')}
                          className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer"
                          title="Simuler ouverture email"
                        >
                          <i className="ri-eye-line w-3 h-3 flex items-center justify-center text-blue-600"></i>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSimulateEngagement(lead.id, 'email_clicked')}
                          className="w-7 h-7 rounded-md bg-amber-50 flex items-center justify-center hover:bg-amber-100 transition-colors cursor-pointer"
                          title="Simuler clic"
                        >
                          <i className="ri-cursor-line w-3 h-3 flex items-center justify-center text-amber-600"></i>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSimulateEngagement(lead.id, 'calendar_clicked')}
                          className="w-7 h-7 rounded-md bg-emerald-50 flex items-center justify-center hover:bg-emerald-100 transition-colors cursor-pointer"
                          title="Simuler clic calendrier"
                        >
                          <i className="ri-calendar-line w-3 h-3 flex items-center justify-center text-emerald-600"></i>
                        </button>
                        <button
                          type="button"
                          onClick={() => advanceStep(lead.id)}
                          className="w-7 h-7 rounded-md bg-teal-50 flex items-center justify-center hover:bg-teal-100 transition-colors cursor-pointer"
                          title="Avancer étape"
                        >
                          <i className="ri-arrow-right-line w-3 h-3 flex items-center justify-center text-teal-600"></i>
                        </button>
                        <button
                          type="button"
                          onClick={() => pauseSequence(lead.id)}
                          className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
                          title="Pause"
                        >
                          <i className="ri-pause-line w-3 h-3 flex items-center justify-center text-slate-600"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredLeads.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <i className="ri-inbox-line text-2xl mb-2 block"></i>
              <span className="text-xs">Aucun lead dans cette séquence</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



