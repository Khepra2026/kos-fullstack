import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useClosingIntelligence } from '@/hooks/useClosingIntelligence';

type TabId = 'live' | 'pipeline' | 'recommendations' | 'history';

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'P0': return 'text-red-700 bg-red-50 border-red-200';
    case 'P1': return 'text-amber-700 bg-amber-50 border-amber-200';
    case 'P2': return 'text-orange-700 bg-orange-50 border-orange-200';
    default: return 'text-slate-500 bg-slate-50 border-slate-200';
  }
}

function getAlertTypeIcon(type: string) {
  switch (type) {
    case 'score_threshold': return 'ri-bar-chart-line text-teal-600';
    case 'hot_detected': return 'ri-fire-line text-red-600';
    case 'proposal_viewed': return 'ri-eye-line text-amber-600';
    case 'meeting_scheduled': return 'ri-calendar-check-line text-emerald-600';
    case 'email_engaged': return 'ri-mail-open-line text-accent-600';
    default: return 'ri-notification-3-line text-slate-600';
  }
}

function getAlertTypeLabel(type: string) {
  switch (type) {
    case 'score_threshold': return 'Score threshold';
    case 'hot_detected': return 'Hot lead';
    case 'proposal_viewed': return 'Proposition vue';
    case 'meeting_scheduled': return 'RDV planifié';
    case 'email_engaged': return 'Email engagé';
    default: return 'Alerte';
  }
}

function formatCurrency(value: number) {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + ' M€';
  if (value >= 1000) return (value / 1000).toFixed(1) + ' K€';
  return value + ' €';
}

export default function closingIntelligencePage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState<TabId>('live');
  const {
    alerts,
    stats,
    recommendations,
    loading,
    error,
    newAlertCount,
    loadHotLeads,
    dismissAlert,
    markAsContacted,
  } = useClosingIntelligence();

  const tabs: { id: TabId; label: string; icon: string; count: number }[] = [
    { id: 'live', label: 'Alertes temps réel', icon: 'ri-radar-line', count: newAlertCount },
    { id: 'pipeline', label: 'Pipeline Closing', icon: 'ri-funds-line', count: stats.totalHotLeads },
    { id: 'recommendations', label: 'Recommandations', icon: 'ri-lightbulb-flash-line', count: recommendations.length },
    { id: 'history', label: 'Historique', icon: 'ri-history-line', count: 0 },
  ];

  return (
    <hubLayout hubId={56}>
      <SeoHead
        title="KOS Closing Intelligence Engine™ — Alertes Temps Réel & Actions de Closing | KHEPRA EXPERTS"
        description="Hub de closing intelligent KOS. Alertes temps réel quand un lead passe 70pts. Hot leads, propositions à relancer, RDV à planifier. Pilotage du closing en direct."
        keywords="KOS Closing Intelligence, alertes temps réel leads, hot leads, actions de closing, pipeline commercial, KHEPRA EXPERTS"
        canonicalPath="/kos-closing-intelligence"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* Hero */}
        <section className="relative bg-background-100 border-b border-background-200/70">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=abstract%20dark%20radar%20command%20center%20with%20real-time%20intelligence%20alerts%20and%20glowing%20connection%20nodes%2C%20red%20alert%20signals%20for%20hot%20leads%2C%20amber%20for%20warm%20prospects%2C%20emerald%20for%20closed%20deals%2C%20premium%20dark%20UI%20with%20data%20visualization%20grids%2C%20no%20text%20no%20human%20figures%2C%20futuristic%20sales%20intelligence%20dashboard&width=1920&height=600&seq=kos-closing-intelligence-hero&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-center opacity-20"
              width="1920"
              height="600"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/60 via-foreground-950/80 to-foreground-950" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm mb-6">
                <i className="ri-radar-line text-red-400 text-sm" />
                <span className="text-sm font-semibold text-red-300 uppercase tracking-wider">
                  KOS Closing Intelligence Engine™ — Pilotage du Closing
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Un lead passe 70pts ?
                <span className="block text-red-400 mt-2">Alerte instantanée. Action immédiate.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                <strong className="text-white">{stats.totalHotLeads} hot leads</strong> détectés.{' '}
                <strong className="text-white">{formatCurrency(stats.totalPipelineValue)}</strong> de pipeline.{' '}
                <strong className="text-white">{stats.newAlerts} nouvelles alertes</strong> aujourd'hui.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm text-red-300 font-semibold">{stats.leadsToContact} à contacter</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm text-amber-300 font-semibold">{stats.proposalsToSend} propositions à relancer</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-emerald-300 font-semibold">{stats.meetingsToSchedule} RDV à préparer</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Stats */}
        <section className="py-6 bg-white border-b border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { label: 'Hot Leads', value: String(stats.totalHotLeads), icon: 'ri-fire-line', color: '#c2410c' },
                { label: 'Pipeline', value: formatCurrency(stats.totalPipelineValue), icon: 'ri-money-dollar-circle-line', color: '#22c55e' },
                { label: 'Ticket Moyen', value: formatCurrency(stats.avgDealValue), icon: 'ri-bar-chart-line', color: '#5B8C2A' },
                { label: 'Alertes auj.', value: String(stats.alertsToday), icon: 'ri-notification-3-line', color: '#e8c547' },
                { label: 'Nouvelles', value: String(stats.newAlerts), icon: 'ri-sparkling-line', color: '#9B7B2C' },
                { label: 'À contacter', value: String(stats.leadsToContact), icon: 'ri-phone-line', color: '#c2410c' },
                { label: 'Prop. relance', value: String(stats.proposalsToSend), icon: 'ri-file-list-3-line', color: '#e8c547' },
                { label: 'RDV préparer', value: String(stats.meetingsToSchedule), icon: 'ri-calendar-event-line', color: '#22c55e' },
              ].map((stat, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200 p-4 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                    <i className={`${stat.icon} text-sm`} style={{ color: stat.color }} />
                  </div>
                  <span className="block text-lg font-bold text-foreground-950 font-heading">{stat.value}</span>
                  <span className="text-[10px] text-foreground-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto py-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-foreground-950 text-white'
                      : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                  }`}
                >
                  <i className={`${tab.icon} text-base`} />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-red-500 text-white'}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
              <button
                onClick={() => loadHotLeads()}
                className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold bg-teal-50 text-teal-700 hover:bg-teal-100 transition-all cursor-pointer whitespace-nowrap"
              >
                <i className="ri-refresh-line text-base" />
                Rafraîchir
              </button>
            </div>
          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700 flex items-center gap-2">
              <i className="ri-error-warning-line" />
              {error}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <i className="ri-loader-4-line animate-spin text-3xl text-teal-500 mb-4 block" />
            <p className="text-foreground-500 text-sm">Chargement des alertes de closing...</p>
          </div>
        )}

        {/* === TAB: LIVE ALERTS === */}
        {activeTab === 'live' && !loading && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Alertes Temps Réel — Tous les leads {`>`} 70pts
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  {alerts.length} alertes actives. Chaque mise à jour de score ou activité déclenche une alerte en temps réel.
                </p>
              </div>

              {alerts.length === 0 ? (
                <div className="text-center py-12 text-foreground-400">
                  <i className="ri-check-double-line text-3xl mb-4 block" />
                  <p className="text-sm">Aucun lead {`>`} 70pts pour le moment. Le système surveille en continu.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`rounded-2xl border bg-white p-5 transition-all hover:shadow-md ${
                        alert.is_new ? 'border-red-300 shadow-sm' : 'border-background-200'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getPriorityColor(alert.priority)}`}>
                            <i className={`${getAlertTypeIcon(alert.alert_type)} text-xl`} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-base font-bold text-foreground-950">{alert.full_name}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getPriorityColor(alert.priority)}`}>
                              {alert.priority}
                            </span>
                            {alert.is_new && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 border border-red-200 text-red-700">
                                NOUVEAU
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-foreground-500 mb-2">
                            <span>{alert.organization}</span>
                            <span>{alert.position}</span>
                            <span>{alert.sector}</span>
                            <span>{alert.country}</span>
                          </div>
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-bold text-foreground-900">{alert.lead_score}</span>
                              <span className="text-xs text-foreground-400">pts</span>
                              {alert.score_delta > 0 && (
                                <span className="text-xs text-emerald-600 font-bold">+{alert.score_delta}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-foreground-400">Pipeline:</span>
                              <span className="text-sm font-bold text-foreground-900">{formatCurrency(alert.deal_value)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-foreground-400">Type:</span>
                              <span className="text-xs font-semibold text-foreground-700">{getAlertTypeLabel(alert.alert_type)}</span>
                            </div>
                          </div>
                          <div className="bg-teal-50 border border-teal-100 rounded-xl p-3 mb-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 mb-1">
                              <i className="ri-lightbulb-flash-line" />
                              Next Best Action
                            </div>
                            <p className="text-sm text-teal-800">{alert.next_best_action}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => markAsContacted(alert.lead_id)}
                              className="px-3 py-1.5 rounded-lg bg-foreground-950 text-white text-xs font-bold hover:bg-foreground-800 transition-colors cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-check-line mr-1" />
                              Marquer contacté
                            </button>
                            <button
                              type="button"
                              onClick={() => dismissAlert(alert.id)}
                              className="px-3 py-1.5 rounded-lg bg-background-100 text-foreground-600 text-xs font-bold hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-close-line mr-1" />
                              Ignorer
                            </button>
                            <a
                              href="/crm"
                              className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 text-xs font-bold hover:bg-teal-100 transition-colors cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-external-link-line mr-1" />
                              Voir dans CRM
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* === TAB: PIPELINE CLOSING === */}
        {activeTab === 'pipeline' && !loading && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Pipeline de Closing — Hot Leads
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  {stats.totalHotLeads} leads {`>`} 70pts représentant {formatCurrency(stats.totalPipelineValue)} de pipeline.
                </p>
              </div>

              <div className="rounded-2xl border border-background-200 bg-white overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-background-200/70 bg-background-50">
                        <th className="text-left py-3 px-4 font-medium text-foreground-700">Lead</th>
                        <th className="text-center py-3 px-4 font-medium text-foreground-700">Score</th>
                        <th className="text-center py-3 px-4 font-medium text-foreground-700">Priorité</th>
                        <th className="text-right py-3 px-4 font-medium text-foreground-700">Pipeline</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground-700">Étape</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground-700">Prochaine Action</th>
                        <th className="text-center py-3 px-4 font-medium text-foreground-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alerts.map((alert) => (
                        <tr key={alert.id} className="border-b border-background-100/70 hover:bg-background-50/50">
                          <td className="py-3 px-4">
                            <div className="font-medium text-foreground-900">{alert.full_name}</div>
                            <div className="text-xs text-foreground-500">{alert.organization}</div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
                              alert.lead_score >= 80 ? 'bg-red-100 text-red-700' :
                              alert.lead_score >= 75 ? 'bg-amber-100 text-amber-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {alert.lead_score}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getPriorityColor(alert.priority)}`}>
                              {alert.priority}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-foreground-900">
                            {formatCurrency(alert.deal_value)}
                          </td>
                          <td className="py-3 px-4 text-xs text-foreground-600">
                            {alert.pipeline_stage}
                          </td>
                          <td className="py-3 px-4 text-xs text-teal-700 font-medium">
                            {alert.next_best_action}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                type="button"
                                onClick={() => markAsContacted(alert.lead_id)}
                                className="w-7 h-7 rounded-md bg-teal-50 flex items-center justify-center hover:bg-teal-100 transition-colors cursor-pointer"
                                title="Marquer contacté"
                              >
                                <i className="ri-check-line w-3 h-3 flex items-center justify-center text-teal-600" />
                              </button>
                              <button
                                type="button"
                                onClick={() => dismissAlert(alert.id)}
                                className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
                                title="Ignorer"
                              >
                                <i className="ri-close-line w-3 h-3 flex items-center justify-center text-slate-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* === TAB: RECOMMENDATIONS === */}
        {activeTab === 'recommendations' && !loading && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Recommandations de Closing
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Actions priorisées par probabilité de conversion et valeur de deal.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="rounded-2xl border border-background-200 bg-white p-6 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        rec.urgency === 'URGENT' ? 'bg-red-100' :
                        rec.urgency === 'HIGH' ? 'bg-amber-100' : 'bg-orange-100'
                      }`}>
                        <i className={`ri-lightbulb-flash-line text-lg ${
                          rec.urgency === 'URGENT' ? 'text-red-600' :
                          rec.urgency === 'HIGH' ? 'text-amber-600' : 'text-orange-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground-950">{rec.full_name}</h3>
                        <p className="text-xs text-foreground-500">{rec.organization}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-foreground-500">Score</span>
                        <span className="font-bold text-foreground-900">{rec.score} pts</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-foreground-500">Deal</span>
                        <span className="font-bold text-foreground-900">{formatCurrency(rec.deal_value)}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-foreground-500">Probabilité</span>
                        <span className="font-bold text-emerald-700">{rec.estimated_close_probability}%</span>
                      </div>
                    </div>
                    <div className="bg-teal-50 border border-teal-100 rounded-xl p-3 mb-4">
                      <p className="text-xs font-bold text-teal-700 mb-1">Action recommandée</p>
                      <p className="text-sm text-teal-800">{rec.action}</p>
                    </div>
                    <p className="text-xs text-foreground-500">{rec.reason}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        rec.urgency === 'URGENT' ? 'bg-red-50 border border-red-200 text-red-700' :
                        rec.urgency === 'HIGH' ? 'bg-amber-50 border border-amber-200 text-amber-700' :
                        'bg-orange-50 border border-orange-200 text-orange-700'
                      }`}>
                        {rec.urgency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* === TAB: HISTORY === */}
        {activeTab === 'history' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Historique des Actions de Closing
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Journal des contacts, propositions envoyées et deals closés.
                </p>
              </div>
              <div className="rounded-2xl border border-background-200 bg-white p-12 text-center">
                <i className="ri-time-line text-3xl text-foreground-300 mb-4 block" />
                <p className="text-sm text-foreground-500">L'historique des actions est synchronisé avec le CRM en temps réel.</p>
                <a href="/crm" className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-teal-50 text-teal-700 text-sm font-bold hover:bg-teal-100 transition-colors cursor-pointer">
                  <i className="ri-external-link-line" />
                  Voir dans le CRM
                </a>
              </div>
            </div>
          </section>
        )}

    </hubLayout>
  );
}



