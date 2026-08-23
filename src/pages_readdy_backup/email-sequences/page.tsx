import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmailSequences, SEQUENCE_NAMES, SEQUENCE_COLORS } from '';
import SequenceStats from '';
import SequenceEnrollmentsTable from '';
import EmailPreview from '';
import CampaignBuilder from '';
import SeoHead from '@/components/feature/SeoHead';

export default function EmailSequencesPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'enrollments' | 'templates' | 'analytics'>('enrollments');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showCampaignBuilder, setShowCampaignBuilder] = useState(false);

  const {
    enrollments,
    stats,
    templates,
    loading,
    error,
    selectedSequence,
    setSelectedSequence,
    loadEnrollments,
    pauseEnrollment,
    resumeEnrollment,
    unsubscribeEnrollment,
    triggerManualSend,
  } = useEmailSequences();

  useEffect(() => {
    const stored = localStorage.getItem('dashboard_auth');
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('dashboard_auth', 'true');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <SeoHead
          title="Séquences Email — KHEPRA EXPERTS"
          description="Gestion des séquences email automatisées"
          canonicalPath="/email-sequences"
          noIndex={true}
        />
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
              <i className="ri-mail-send-line text-white text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h1 className="text-xl font-bold text-slate-900">Séquences Email</h1>
            <p className="text-sm text-slate-500 mt-1">Machine de conversion B2B — Phase 3</p>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleLogin();
              }}
            />
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-semibold hover:from-amber-600 hover:to-orange-600 transition-all cursor-pointer"
              type="button"
            >
              Accéder aux Séquences
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

  const filteredTemplates = selectedSequence === 'all'
    ? templates
    : templates.filter((t) => {
        const prefix = selectedSequence === 'checklist-conformite-bceao-cobac' ? 'funnel_checklist'
          : selectedSequence === 'guide-levee-fonds-afrique' ? 'funnel_guide_fonds'
          : selectedSequence === 'simulation-risque-reglementaire' ? 'funnel_simulation'
          : selectedSequence === 'template-audit-gouvernance' ? 'funnel_governance'
          : selectedSequence === 'mini-rapport-due-diligence' ? 'funnel_dd'
          : selectedSequence === 'diagnostic-esg-maturite' ? 'funnel_esg'
          : '';
        return t.template_key.startsWith(prefix);
      });

  return (
    <>
      <SeoHead
        title="Séquences Email — Funnel Industriel | KHEPRA EXPERTS"
        description="Gestion des séquences email automatisées 5-7 étapes par lead magnet"
        canonicalPath="/email-sequences"
        noIndex={true}
      />
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
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c19a6b] to-[#a47c48] flex items-center justify-center">
                    <i className="ri-mail-send-line text-white w-4 h-4 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-slate-900">Séquences Email</h1>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Funnel Industriel</p>
                  </div>
                </div>
                <span className="hidden md:inline text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                  Phase 3 — Funnel Industriel
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCampaignBuilder(true)}
                  className="px-3 py-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg text-xs font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                  type="button"
                >
                  <i className="ri-add-line w-3 h-3 flex items-center justify-center"></i>
                  Nouvelle campagne
                </button>
                <button
                  onClick={() => navigate('/crm')}
                  className="px-3 py-1.5 bg-[#f5f3f0] text-[#c19a6b] rounded-lg text-xs font-medium hover:bg-[#e5e3df] transition-colors cursor-pointer whitespace-nowrap"
                  type="button"
                >
                  CRM Pipeline
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap"
                  type="button"
                >
                  Dashboard
                </button>
                <button
                  onClick={loadEnrollments}
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
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
              <p className="mt-4 text-slate-600">Chargement des séquences...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <i className="ri-error-warning-line text-3xl text-red-500 mb-2 block"></i>
              <p className="text-red-700">{error}</p>
              <button
                onClick={loadEnrollments}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer"
                type="button"
              >
                Réessayer
              </button>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="mb-6">
                <SequenceStats stats={stats} />
              </div>

              {/* Tabs & Filter */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center bg-slate-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveTab('enrollments')}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        activeTab === 'enrollments'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                      type="button"
                    >
                      <i className="ri-user-follow-line w-3 h-3 flex items-center justify-center inline mr-1"></i>
                      Inscriptions ({enrollments.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('templates')}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        activeTab === 'templates'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                      type="button"
                    >
                      <i className="ri-mail-line w-3 h-3 flex items-center justify-center inline mr-1"></i>
                      Templates ({templates.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('analytics')}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        activeTab === 'analytics'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                      type="button"
                    >
                      <i className="ri-bar-chart-line w-3 h-3 flex items-center justify-center inline mr-1"></i>
                      Analytics
                    </button>
                  </div>

                  <select
                    value={selectedSequence}
                    onChange={(e) => setSelectedSequence(e.target.value)}
                    className="text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="all">Toutes les séquences</option>
                    {Object.entries(SEQUENCE_NAMES).map(([slug, name]) => (
                      <option key={slug} value={slug}>{name}</option>
                    ))}
                  </select>
                </div>

                {/* Tab Content */}
                <div className="p-4">
                  {activeTab === 'enrollments' && (
                    <SequenceEnrollmentsTable
                      enrollments={enrollments}
                      onPause={pauseEnrollment}
                      onResume={resumeEnrollment}
                      onUnsubscribe={unsubscribeEnrollment}
                      onManualSend={triggerManualSend}
                    />
                  )}

                  {activeTab === 'templates' && (
                    <div className="space-y-4">
                      {filteredTemplates.map((template) => {
                        const stepMatch = template.template_key.match(/step(\d+)$/);
                        const step = stepMatch ? stepMatch[1] : '?';
                        const slug = Object.entries(SEQUENCE_NAMES).find(([key]) =>
                          template.template_key.includes(key === 'checklist-conformite-bceao-cobac' ? 'funnel_checklist'
                            : key === 'guide-levee-fonds-afrique' ? 'funnel_guide_fonds'
                            : key === 'simulation-risque-reglementaire' ? 'funnel_simulation'
                            : key === 'template-audit-gouvernance' ? 'funnel_governance'
                            : key === 'mini-rapport-due-diligence' ? 'funnel_dd'
                            : 'funnel_esg')
                        )?.[0] || '';
                        const color = SEQUENCE_COLORS[slug] || '#374151';

                        return (
                          <div
                            key={template.id}
                            className="border border-slate-200 rounded-lg p-4 hover:border-amber-300 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                                  style={{ backgroundColor: color }}
                                >
                                  {step}
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-slate-900">
                                    {template.subject}
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    {SEQUENCE_NAMES[slug] || slug} — Étape {step}/7
                                    {template.send_delay_hours ? ` — Délai : ${template.send_delay_hours}h` : ''}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => setSelectedTemplate(selectedTemplate === template.id ? null : template.id)}
                                className="px-3 py-1.5 text-xs font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer"
                                type="button"
                              >
                                {selectedTemplate === template.id ? 'Masquer' : 'Aperçu'}
                              </button>
                            </div>
                            {selectedTemplate === template.id && (
                              <div className="mt-4">
                                <EmailPreview
                                  htmlBody={template.html_body}
                                  subject={template.subject}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {filteredTemplates.length === 0 && (
                        <div className="text-center py-8 text-slate-400">
                          <i className="ri-mail-line text-2xl mb-2 block"></i>
                          Aucun template pour cette séquence
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'analytics' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(SEQUENCE_NAMES).map(([slug, name]) => {
                        const count = stats?.sequencesByLeadMagnet[slug] || 0;
                        const color = SEQUENCE_COLORS[slug] || '#374151';
                        const percentage = stats?.totalEnrollments ? Math.round((count / stats.totalEnrollments) * 100) : 0;
                        return (
                          <div key={slug} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                              <h3 className="text-sm font-bold text-slate-900">{name}</h3>
                            </div>
                            <div className="text-3xl font-bold text-slate-900 mb-1">{count}</div>
                            <div className="text-xs text-slate-500 mb-3">inscriptions</div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className="rounded-full h-2 transition-all"
                                style={{ width: `${percentage}%`, backgroundColor: color }}
                              ></div>
                            </div>
                            <div className="text-xs text-slate-500 mt-1">{percentage}% du total</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Campaign Builder Modal */}
      {showCampaignBuilder && (
        <CampaignBuilder onClose={() => setShowCampaignBuilder(false)} />
      )}
    </>
  );
}



