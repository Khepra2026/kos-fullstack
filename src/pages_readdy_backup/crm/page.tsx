import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SeoHead from '@/components/feature/SeoHead';
import { useCrmData } from '';
import CrmStatsCards from '';
import HotLeadsAlert from '';
import CrmKanbanBoard from '';
import CrmProjectsView from '';
import CrmCampaignsView from '';
import LeadDetailModal from '';
import CrmFunnelView from '';
import MQLNurturingPanel from '';
import { useLeadScoreRealtime } from '@/hooks/useLeadScoreRealtime';

export default function CrmPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'funnel' | 'projects' | 'campaigns' | 'nurturing'>('pipeline');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStage, setFilterStage] = useState('all');

  const {
    leads,
    activities,
    stats,
    pipelineStages,
    loading,
    error,
    selectedLead,
    setSelectedLead,
    loadLeads,
    loadActivities,
    updateLeadStage,
    addNote,
    triggerFollowUp,
  } = useCrmData();

  const { loadLeadScores, processActivity } = useLeadScoreRealtime();

  useEffect(() => {
    const stored = localStorage.getItem('dashboard_auth');
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (leads.length > 0) {
      loadLeadScores(leads.map((l) => l.id));
    }
  }, [leads, loadLeadScores]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('dashboard_auth', 'true');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <SeoHead title="CRM — KHEPRA EXPERTS" description="CRM privé KHEPRA EXPERTS" canonicalPath="/crm" noIndex={true} />
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center mx-auto mb-4">
              <i className="ri-lock-line text-white text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h1 className="text-xl font-bold text-slate-900">CRM KHEPRA EXPERTS</h1>
            <p className="text-sm text-slate-500 mt-1">Accès réservé — Machine de croissance B2B</p>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleLogin();
              }}
            />
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg text-sm font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all cursor-pointer"
              type="button"
            >
              Accéder au CRM
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              type="button"
            >
              Retour au Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      !searchQuery ||
      lead.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.country?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = filterStage === 'all' || lead.pipeline_stage === filterStage;
    return matchesSearch && matchesStage;
  });

  const mqlCount = leads.filter(l => ['contact_engaged', 'lead_hot', 'meeting_scheduled', 'proposal_sent'].includes(l.pipeline_stage)).length;
  const nurturingCount = leads.filter(l => ['contact_engaged', 'lead_hot', 'new_lead'].includes(l.pipeline_stage) && !l.meeting_scheduled_at).length;

  const tabs = [
    { id: 'pipeline' as const, label: 'Pipeline', icon: 'ri-kanban-view', count: leads.length },
    { id: 'funnel' as const, label: 'Funnel MQL→SQL', icon: 'ri-filter-line', count: mqlCount },
    { id: 'nurturing' as const, label: 'Nurturing MQL', icon: 'ri-mail-send-line', count: nurturingCount },
    { id: 'projects' as const, label: 'Projets', icon: 'ri-briefcase-line', count: leads.filter(l => ['mission_signed', 'mission_in_progress', 'client_active', 'client_recurring'].includes(l.pipeline_stage)).length },
    { id: 'campaigns' as const, label: 'Campagnes', icon: 'ri-mail-send-line', count: 6 },
  ];

  return (
    <>
      <SeoHead title="CRM Industriel — KHEPRA EXPERTS" description="Pipeline commercial, scoring leads, relances automatiques, gestion projets et campagnes" canonicalPath="/crm" noIndex={true} />
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  type="button"
                  title="Retour au Dashboard"
                >
                  <i className="ri-arrow-left-line text-lg w-5 h-5 flex items-center justify-center"></i>
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                    <i className="ri-dashboard-line text-white w-4 h-4 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-slate-900">CRM KHEPRA</h1>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Machine de Croissance</p>
                  </div>
                </div>
                <span className="hidden md:inline text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                  Phase 2 — Machine de Croissance
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2">
                  <i className="ri-search-line text-slate-400 w-4 h-4 flex items-center justify-center mr-2"></i>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un lead..."
                    className="bg-transparent text-sm text-slate-700 focus:outline-none w-48"
                  />
                </div>

                <button
                  onClick={() => navigate('/email-sequences')}
                  className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-xs font-medium hover:bg-teal-100 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                  type="button"
                >
                  <i className="ri-mail-send-line w-3 h-3 flex items-center justify-center"></i>
                  Séquences Email
                </button>

                <button
                  onClick={() => navigate('/reporting-commercial')}
                  className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-100 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                  type="button"
                >
                  <i className="ri-bar-chart-grouped-line w-3 h-3 flex items-center justify-center"></i>
                  Reporting
                </button>

                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap"
                  type="button"
                >
                  Dashboard
                </button>

                <button
                  onClick={loadLeads}
                  className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
                  type="button"
                  title="Rafraîchir"
                >
                  <i className="ri-refresh-line w-4 h-4 flex items-center justify-center text-slate-600"></i>
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem('dashboard_auth');
                    setIsAuthenticated(false);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                  type="button"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {loading && !stats ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
              <p className="mt-4 text-slate-600">Chargement du CRM...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <i className="ri-error-warning-line text-3xl text-red-500 mb-2 block"></i>
              <p className="text-red-700">{error}</p>
              <button onClick={loadLeads} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer" type="button">
                Réessayer
              </button>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="mb-6">
                <CrmStatsCards stats={stats} />
              </div>

              {/* Onglets principaux */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center bg-slate-100 rounded-lg p-1 overflow-x-auto">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                          activeTab === tab.id
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                        type="button"
                      >
                        <i className={`${tab.icon} w-4 h-4 flex items-center justify-center`}></i>
                        {tab.label}
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                          activeTab === tab.id ? 'bg-teal-100 text-teal-700' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {tab.count}
                        </span>
                      </button>
                    ))}
                  </div>

                  {activeTab === 'pipeline' && (
                    <div className="flex items-center gap-3">
                      <select
                        value={filterStage}
                        onChange={(e) => setFilterStage(e.target.value)}
                        className="text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 hidden md:block"
                      >
                        <option value="all">Tous les statuts</option>
                        <option value="lead_generated">Lead Généré</option>
                        <option value="lead_qualified">Lead Qualifié</option>
                        <option value="contact_engaged">Contact Engagé</option>
                        <option value="lead_hot">Lead Chaud</option>
                        <option value="meeting_scheduled">RDV Fixé</option>
                        <option value="proposal_sent">Proposition Envoyée</option>
                        <option value="mission_signed">Mission Signée</option>
                        <option value="mission_in_progress">Mission En Cours</option>
                        <option value="client_active">Client Actif</option>
                        <option value="client_recurring">Client Récurrent</option>
                        <option value="lost">Perdu</option>
                      </select>

                      <div className="flex items-center bg-slate-100 rounded-lg p-1">
                        <button
                          onClick={() => setViewMode('kanban')}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                            viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                          }`}
                          type="button"
                        >
                          <i className="ri-kanban-view w-3 h-3 flex items-center justify-center inline mr-1"></i>
                          Kanban
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                            viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                          }`}
                          type="button"
                        >
                          <i className="ri-list-check w-3 h-3 flex items-center justify-center inline mr-1"></i>
                          Liste
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tab Content */}
                <div className="p-4">
                  {activeTab === 'pipeline' && (
                    <>
                      <HotLeadsAlert leads={leads} onLeadClick={(lead) => {
                        setSelectedLead(lead);
                        loadActivities(lead.id);
                      }} />

                      {viewMode === 'kanban' ? (
                        <div className="bg-white rounded-xl">
                          <div className="px-4 py-3 flex items-center justify-between">
                            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                              <i className="ri-kanban-view text-teal-500 w-4 h-4 flex items-center justify-center"></i>
                              Pipeline Commercial — 10 Étapes
                            </h2>
                            <span className="text-xs text-slate-500">{filteredLeads.length} leads</span>
                          </div>
                          <div className="p-4">
                            <CrmKanbanBoard
                              leads={filteredLeads}
                              pipelineStages={pipelineStages}
                              onStageChange={updateLeadStage}
                              onLeadClick={(lead) => {
                                setSelectedLead(lead);
                                loadActivities(lead.id);
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-xl overflow-hidden">
                          <div className="px-4 py-3 flex items-center justify-between">
                            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                              <i className="ri-list-check text-teal-500 w-4 h-4 flex items-center justify-center"></i>
                              Liste des Leads
                            </h2>
                            <span className="text-xs text-slate-500">{filteredLeads.length} leads</span>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px]">
                              <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Contact</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Organisation</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Score</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Statut</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Relances</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Dernière activité</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Valeur</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {filteredLeads.map((lead) => {
                                  const stage = pipelineStages.find((s) => s.id === lead.pipeline_stage);
                                  return (
                                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                      <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                                            {lead.full_name?.charAt(0)?.toUpperCase() || '?'}
                                          </div>
                                          <div>
                                            <div className="text-sm font-medium text-slate-900">{lead.full_name}</div>
                                            <div className="text-xs text-slate-500">{lead.email}</div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 text-sm text-slate-600">
                                        {lead.organization || '—'}
                                        <div className="text-xs text-slate-400">{lead.country} {lead.sector && `• ${lead.sector}`}</div>
                                      </td>
                                      <td className="px-4 py-3">
                                        <span className={`text-sm font-bold ${lead.lead_score && lead.lead_score >= 70 ? 'text-amber-600' : lead.lead_score && lead.lead_score >= 45 ? 'text-orange-600' : 'text-slate-500'}`}>
                                          {lead.lead_score || 0}
                                        </span>
                                      </td>
                                      <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${stage?.color.replace('text-', 'bg-').replace('700', '100').replace('600', '100') + ' ' + stage?.color}`}>
                                          {stage?.label || lead.pipeline_stage}
                                        </span>
                                      </td>
                                      <td className="px-4 py-3 text-sm text-slate-600">
                                        {lead.follow_up_count || 0}/3
                                        {lead.next_follow_up_at && lead.next_follow_up_at <= new Date().toISOString() && (
                                          <span className="ml-2 text-xs text-red-500">⚠</span>
                                        )}
                                      </td>
                                      <td className="px-4 py-3 text-sm text-slate-600">
                                        {lead.last_activity_at ? new Date(lead.last_activity_at).toLocaleDateString('fr-FR') : '—'}
                                      </td>
                                      <td className="px-4 py-3 text-sm text-slate-600">
                                        {lead.deal_value ? `${lead.deal_value.toLocaleString('fr-FR')} FCFA` : '—'}
                                      </td>
                                      <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                          <button
                                            onClick={() => {
                                              setSelectedLead(lead);
                                              loadActivities(lead.id);
                                            }}
                                            className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
                                            type="button"
                                            title="Voir détails"
                                          >
                                            <i className="ri-eye-line w-3 h-3 flex items-center justify-center text-slate-600"></i>
                                          </button>
                                          <button
                                            onClick={() => triggerFollowUp(lead.id)}
                                            className="w-7 h-7 rounded-md bg-teal-50 flex items-center justify-center hover:bg-teal-100 transition-colors cursor-pointer"
                                            type="button"
                                            title="Relancer"
                                          >
                                            <i className="ri-send-plane-line w-3 h-3 flex items-center justify-center text-teal-600"></i>
                                          </button>
                                          <button
                                            onClick={() => processActivity(lead.id, 'email_opened')}
                                            className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer"
                                            type="button"
                                            title="+5 pts — Email ouvert"
                                          >
                                            <i className="ri-eye-line w-3 h-3 flex items-center justify-center text-blue-600"></i>
                                          </button>
                                          <button
                                            onClick={() => processActivity(lead.id, 'email_clicked')}
                                            className="w-7 h-7 rounded-md bg-amber-50 flex items-center justify-center hover:bg-amber-100 transition-colors cursor-pointer"
                                            type="button"
                                            title="+10 pts — Clic"
                                          >
                                            <i className="ri-cursor-line w-3 h-3 flex items-center justify-center text-amber-600"></i>
                                          </button>
                                          <button
                                            onClick={() => processActivity(lead.id, 'meeting_scheduled')}
                                            className="w-7 h-7 rounded-md bg-emerald-50 flex items-center justify-center hover:bg-emerald-100 transition-colors cursor-pointer"
                                            type="button"
                                            title="+20 pts — RDV"
                                          >
                                            <i className="ri-calendar-check-line w-3 h-3 flex items-center justify-center text-emerald-600"></i>
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {activeTab === 'funnel' && (
                    <CrmFunnelView
                      leads={filteredLeads}
                      pipelineStages={pipelineStages}
                      onLeadClick={(lead) => {
                        setSelectedLead(lead);
                        loadActivities(lead.id);
                      }}
                      onStageChange={updateLeadStage}
                    />
                  )}

                  {activeTab === 'nurturing' && (
                    <MQLNurturingPanel />
                  )}

                  {activeTab === 'projects' && (
                    <CrmProjectsView leads={leads} />
                  )}

                  {activeTab === 'campaigns' && (
                    <CrmCampaignsView leads={leads} />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          activities={activities?.[selectedLead.id] || []}
          onClose={() => setSelectedLead(null)}
          onStageChange={updateLeadStage}
          onAddNote={addNote}
          onTriggerFollowUp={triggerFollowUp}
        />
      )}
    </>
  );
}



