import { useState, useEffect } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useConsultingMissionFactory } from '@/hooks/useConsultingMissionFactory';

type Tab = 'missions' | 'quality' | 'risks' | 'teams' | 'research' | 'thinktank';

export default function consultingMissionFactoryPage() {
  const {
    consultingMissions,
    missionQualityReviews,
    engagementRiskAssessments,
    autonomousConsultingTeams,
    autonomousResearchProjects,
    thinkTankPublications,
    isLive,
    loading,
    error,
    refetch,
  } = useConsultingMissionFactory();

  const [activeTab, setActiveTab] = useState<Tab>('missions');
  const [selectedMission, setSelectedMission] = useState<any>(null);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [selectedRisk, setSelectedRisk] = useState<any>(null);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [selectedResearch, setSelectedResearch] = useState<any>(null);
  const [selectedPub, setSelectedPub] = useState<any>(null);

  useEffect(() => {
    if (!loading && consultingMissions.length > 0 && !selectedMission) {
      setSelectedMission(consultingMissions[0]);
      if (missionQualityReviews.length > 0 && !selectedReview) setSelectedReview(missionQualityReviews[0]);
      if (engagementRiskAssessments.length > 0 && !selectedRisk) setSelectedRisk(engagementRiskAssessments[0]);
      if (autonomousConsultingTeams.length > 0 && !selectedTeam) setSelectedTeam(autonomousConsultingTeams[0]);
      if (autonomousResearchProjects.length > 0 && !selectedResearch) setSelectedResearch(autonomousResearchProjects[0]);
      if (thinkTankPublications.length > 0 && !selectedPub) setSelectedPub(thinkTankPublications[0]);
    }
  }, [loading, consultingMissions, missionQualityReviews, engagementRiskAssessments, autonomousConsultingTeams, autonomousResearchProjects, thinkTankPublications, selectedMission, selectedReview, selectedRisk, selectedTeam, selectedResearch, selectedPub]);

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      'Terminée': 'bg-green-100 text-green-700',
      'En cours': 'bg-secondary-100 text-secondary-900',
      'Planifié': 'bg-background-100 text-foreground-600',
      'Publié': 'bg-green-100 text-green-700',
      'En relecture': 'bg-yellow-100 text-yellow-700',
      'Brouillon': 'bg-background-100 text-foreground-500',
      'Actif': 'bg-green-100 text-green-700',
      'Inactif': 'bg-background-100 text-foreground-500',
      'Approuvé': 'bg-green-100 text-green-700',
      'Approuvé avec conditions': 'bg-yellow-100 text-yellow-700',
      'En attente — Due diligence complémentaire': 'bg-orange-100 text-orange-700',
      'En attente — Vérification financement': 'bg-orange-100 text-orange-700',
    };
    return map[status] || 'bg-background-100 text-foreground-600';
  };

  const getRiskLevelBadge = (level: string) => {
    const map: Record<string, string> = {
      'Faible': 'bg-green-100 text-green-700',
      'Modéré': 'bg-yellow-100 text-yellow-700',
      'Élevé': 'bg-orange-100 text-orange-700',
      'Critique': 'bg-red-100 text-red-700',
    };
    return map[level] || 'bg-background-100 text-foreground-600';
  };

  const getScoreColor = (score: number) => {
    if (score >= 9.0) return 'text-green-600';
    if (score >= 8.0) return 'text-yellow-600';
    if (score >= 7.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const renderScoreGauge = (score: number, maxScore: number = 10) => {
    const pct = (score / maxScore) * 100;
    const color = score >= 9.0 ? 'bg-green-500' : score >= 8.0 ? 'bg-yellow-500' : score >= 7.0 ? 'bg-orange-500' : 'bg-red-500';
    return (
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-background-200/70 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }}></div>
        </div>
        <span className={`text-sm font-bold ${getScoreColor(score)}`}>{score.toFixed(1)}</span>
      </div>
    );
  };

  const renderRiskScoreBar = (score: number, label: string) => {
    const color = score <= 2 ? 'bg-green-500' : score <= 3 ? 'bg-yellow-500' : score <= 4 ? 'bg-orange-500' : 'bg-red-500';
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-foreground-500 w-24 whitespace-nowrap">{label}</span>
        <div className="flex-1 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${color}`} style={{ width: `${(score / 5) * 100}%` }}></div>
        </div>
        <span className="text-xs font-bold text-foreground-950 w-6 text-right">{score.toFixed(1)}</span>
      </div>
    );
  };

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'missions', label: 'Missions', icon: 'ri-briefcase-line', count: consultingMissions.length },
    { id: 'quality', label: 'Qualité', icon: 'ri-shield-check-line', count: missionQualityReviews.length },
    { id: 'risks', label: 'Risques Engagement', icon: 'ri-alert-line', count: engagementRiskAssessments.filter((r: any) => r.risk_level === 'Élevé').length },
    { id: 'teams', label: 'Équipes Conseil', icon: 'ri-group-line', count: autonomousConsultingTeams.length },
    { id: 'research', label: 'Recherche', icon: 'ri-search-eye-line', count: autonomousResearchProjects.filter((r: any) => r.status === 'En cours').length },
    { id: 'thinktank', label: 'Think Tank', icon: 'ri-lightbulb-flash-line', count: thinkTankPublications.filter((p: any) => p.status === 'Publié').length },
  ];

  const avgQualityScore = missionQualityReviews.length > 0 ? (missionQualityReviews.reduce((s: number, r: any) => s + r.overall_score, 0) / missionQualityReviews.length) : 0;
  const avgSuccessRate = autonomousConsultingTeams.length > 0 ? (autonomousConsultingTeams.reduce((s: number, t: any) => s + t.success_rate, 0) / autonomousConsultingTeams.length) : 0;
  const highRiskCount = engagementRiskAssessments.filter((r: any) => r.risk_level === 'Élevé').length;
  const publishedCount = thinkTankPublications.filter((p: any) => p.status === 'Publié').length;

  return (
    <hubLayout hubId={2}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold">
                  <i className="ri-building-2-line"></i>KOS Phase 4 — Consulting & Mission Factory
                </span>
                {!loading && (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${isLive ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-600'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-orange-400'}`}></span>
                    {isLive ? 'DONNÉES LIVE — SUPABASE' : 'DONNÉES MOCK — DÉMO'}
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">Consulting & Mission Factory</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Industrialisation des missions, Contrôle Qualité, Gestion des Risques d'Engagement, Équipes de Conseil Autonomes, 
                Recherche Appliquée et Think Tank — le cœur opérationnel de KHEPRA EXPERTS.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{consultingMissions.length}</div>
                <div className="text-xs text-foreground-500">Missions</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{avgQualityScore.toFixed(1)}</div>
                <div className="text-xs text-foreground-500">Qualité Moy.</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-primary-500">{avgSuccessRate.toFixed(0)}%</div>
                <div className="text-xs text-foreground-500">Taux Succès</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
                <span className="text-xs opacity-60">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-3 border-background-200 border-t-accent-500 rounded-full animate-spin"></div>
            <p className="text-sm text-foreground-500">Chargement des données Consulting & Mission Factory...</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600">
              <i className="ri-error-warning-line text-2xl"></i>
            </div>
            <p className="text-sm text-foreground-600">Erreur de connexion à Supabase</p>
            <p className="text-xs text-foreground-400">Les données mock sont utilisées. Vérifiez votre connexion.</p>
            <button
              onClick={refetch}
              className="mt-2 px-4 py-2 rounded-full bg-foreground-950 text-background-50 text-sm font-medium cursor-pointer hover:bg-foreground-800 whitespace-nowrap"
            >
              <i className="ri-refresh-line mr-2"></i>Réessayer
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* ===== ONGLET 1 : MISSIONS ===== */}
            {activeTab === 'missions' && selectedMission && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                      <i className="ri-briefcase-line text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">KOS Consulting Factory™</h3>
                      <p className="text-xs text-foreground-500">Missions industrialisées</p>
                    </div>
                  </div>
                  {consultingMissions.map((m: any) => (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMission(m)}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedMission.id === m.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{m.sector}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(m.status)}`}>{m.status}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground-950">{m.mission_name}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-foreground-500">{m.client_name}</span>
                        <span className="text-xs text-foreground-400">{m.duration_days}j</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-2">
                  <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedMission.sector}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedMission.status)}`}>{selectedMission.status}</span>
                      <span className="text-xs text-foreground-400 ml-auto">{selectedMission.duration_days} jours</span>
                    </div>
                    <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedMission.mission_name}</h2>
                    <p className="text-sm text-foreground-500 mb-4">{selectedMission.client_name}</p>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground-950 mb-2">Méthodologie</h4>
                      <p className="text-sm text-foreground-600 leading-relaxed">{selectedMission.methodology}</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground-950 mb-2">Planning</h4>
                      <p className="text-sm text-foreground-600 leading-relaxed">{selectedMission.planning}</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground-950 mb-2">Livrables</h4>
                      <p className="text-sm text-foreground-600 leading-relaxed">{selectedMission.deliverables}</p>
                    </div>
                    <div className="p-4 bg-accent-50/50 rounded-lg border border-accent-100 mb-4">
                      <h4 className="text-sm font-semibold text-accent-700 mb-2">Indicateurs Clés</h4>
                      <p className="text-sm text-foreground-600">{selectedMission.indicators}</p>
                    </div>
                    <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                      <h4 className="text-sm font-semibold text-amber-700 mb-2">Leçons Apprises</h4>
                      <p className="text-sm text-foreground-600 leading-relaxed">{selectedMission.lessons_learned}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== ONGLET 2 : QUALITÉ ===== */}
            {activeTab === 'quality' && selectedReview && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100 text-green-700">
                      <i className="ri-shield-check-line text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">KOS Mission Quality Office™</h3>
                      <p className="text-xs text-foreground-500">Contrôle Qualité des Missions</p>
                    </div>
                  </div>
                  {missionQualityReviews.map((r: any) => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedReview(r)}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedReview.id === r.id ? 'border-green-300 bg-green-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{r.review_type}</span>
                        <span className={`text-sm font-bold ${getScoreColor(r.overall_score)}`}>{r.overall_score.toFixed(1)}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground-950">
                        {consultingMissions.find((m: any) => m.id === r.mission_id)?.mission_name || `Mission #${r.mission_id}`}
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-foreground-500">{r.reviewer}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-2">
                  <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedReview.review_type}</span>
                      <span className={`text-lg font-bold ml-auto ${getScoreColor(selectedReview.overall_score)}`}>{selectedReview.overall_score.toFixed(1)}/10</span>
                    </div>
                    <h2 className="text-lg font-bold text-foreground-950 mb-2">
                      {consultingMissions.find((m: any) => m.id === selectedReview.mission_id)?.mission_name || `Mission #${selectedReview.mission_id}`}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-background-100 rounded-lg">
                        <div className="text-xs text-foreground-500 mb-1">Score Méthodologie</div>
                        {renderScoreGauge(selectedReview.methodology_score)}
                      </div>
                      <div className="p-3 bg-background-100 rounded-lg">
                        <div className="text-xs text-foreground-500 mb-1">Conformité Livrables</div>
                        {renderScoreGauge(selectedReview.deliverables_compliance_score)}
                      </div>
                      <div className="p-3 bg-background-100 rounded-lg">
                        <div className="text-xs text-foreground-500 mb-1">Adhérence Standards</div>
                        {renderScoreGauge(selectedReview.standards_adherence_score)}
                      </div>
                      <div className="p-3 bg-background-100 rounded-lg">
                        <div className="text-xs text-foreground-500 mb-1">Satisfaction Client</div>
                        {renderScoreGauge(selectedReview.client_satisfaction_score)}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground-950 mb-2">Constatations</h4>
                      <p className="text-sm text-foreground-600 leading-relaxed">{selectedReview.findings}</p>
                    </div>
                    <div className="p-4 bg-green-50/50 rounded-lg border border-green-100">
                      <h4 className="text-sm font-semibold text-green-700 mb-2">Recommandations</h4>
                      <p className="text-sm text-foreground-600 leading-relaxed">{selectedReview.recommendations}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-background-200/70">
                      <span className="text-xs text-foreground-500">Réviseur : {selectedReview.reviewer}</span>
                      <span className="text-xs text-foreground-400">Revu le {new Date(selectedReview.reviewed_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== ONGLET 3 : RISQUES ENGAGEMENT ===== */}
            {activeTab === 'risks' && selectedRisk && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                      <i className="ri-alert-line text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">KOS Engagement Risk Office™</h3>
                      <p className="text-xs text-foreground-500">Évaluation risques avant signature</p>
                    </div>
                  </div>
                  {engagementRiskAssessments.map((r: any) => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedRisk(r)}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedRisk.id === r.id ? 'border-orange-300 bg-orange-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getRiskLevelBadge(r.risk_level)}`}>{r.risk_level}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(r.approval_status)}`}>{r.approval_status}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground-950">{r.engagement_name}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm font-bold text-foreground-950">{r.overall_risk_score.toFixed(1)}/5</span>
                        <span className="text-xs text-foreground-500">Score Risque</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-2">
                  <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getRiskLevelBadge(selectedRisk.risk_level)}`}>{selectedRisk.risk_level}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedRisk.approval_status)}`}>{selectedRisk.approval_status}</span>
                      <span className="text-sm font-bold ml-auto">Score Global : {selectedRisk.overall_risk_score.toFixed(1)}/5</span>
                    </div>
                    <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedRisk.engagement_name}</h2>
                    <div className="space-y-2 mb-4">
                      {renderRiskScoreBar(selectedRisk.financial_risk_score, 'Financier')}
                      {renderRiskScoreBar(selectedRisk.legal_risk_score, 'Juridique')}
                      {renderRiskScoreBar(selectedRisk.operational_risk_score, 'Opérationnel')}
                      {renderRiskScoreBar(selectedRisk.reputational_risk_score, 'Réputationnel')}
                    </div>
                    <div className="mb-4">
                      <div className="w-full h-3 bg-background-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${selectedRisk.risk_level === 'Faible' ? 'bg-green-500' : selectedRisk.risk_level === 'Modéré' ? 'bg-yellow-500' : 'bg-orange-500'}`}
                          style={{ width: `${(selectedRisk.overall_risk_score / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-100 mb-4">
                      <h4 className="text-sm font-semibold text-orange-700 mb-2">Plan de Mitigation</h4>
                      <p className="text-sm text-foreground-600 leading-relaxed">{selectedRisk.mitigation_plan}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-background-200/70">
                      <span className="text-xs text-foreground-500">Approuvé par : {selectedRisk.approved_by}</span>
                      <span className="text-xs text-foreground-400">MàJ {new Date(selectedRisk.updated_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== ONGLET 4 : ÉQUIPES CONSEIL AUTONOMES ===== */}
            {activeTab === 'teams' && selectedTeam && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                      <i className="ri-group-line text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">KOS Autonomous Teams™</h3>
                      <p className="text-xs text-foreground-500">Équipes de conseil autonomes IA</p>
                    </div>
                  </div>
                  {autonomousConsultingTeams.map((t: any) => (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTeam(t)}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedTeam.id === t.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{t.expertise_area.split(',')[0]}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${t.status === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-background-100 text-foreground-500'}`}>{t.status}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground-950">{t.team_name}</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-foreground-500">{t.active_missions} missions</span>
                        <span className="text-xs font-bold text-primary-600 ml-auto">{t.success_rate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-2">
                  <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                        <i className="ri-robot-line text-lg"></i>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedTeam.status === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-background-100 text-foreground-500'}`}>{selectedTeam.status}</span>
                    </div>
                    <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedTeam.team_name}</h2>
                    <p className="text-sm text-foreground-600 mb-4">{selectedTeam.expertise_area}</p>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="p-4 bg-background-100 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary-600">{selectedTeam.active_missions}</div>
                        <div className="text-xs text-foreground-500">Missions actives</div>
                      </div>
                      <div className="p-4 bg-background-100 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">{selectedTeam.success_rate}%</div>
                        <div className="text-xs text-foreground-500">Taux de succès</div>
                      </div>
                      <div className="p-4 bg-background-100 rounded-lg text-center">
                        <div className="text-2xl font-bold text-foreground-950">{selectedTeam.avg_delivery_time_days}j</div>
                        <div className="text-xs text-foreground-500">Délai moyen</div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="w-full h-2 bg-background-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${selectedTeam.success_rate}%` }}></div>
                      </div>
                    </div>
                    <div className="p-4 bg-primary-50/50 rounded-lg border border-primary-100">
                      <h4 className="text-sm font-semibold text-primary-700 mb-2">Agents IA Composant l'Équipe</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTeam.team_members.split(', ').map((member: string, i: number) => (
                          <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 font-medium border border-primary-200">{member}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== ONGLET 5 : RECHERCHE ===== */}
            {activeTab === 'research' && selectedResearch && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-900">
                      <i className="ri-search-eye-line text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">KOS Autonomous Research™</h3>
                      <p className="text-xs text-foreground-500">Recherche appliquée autonome</p>
                    </div>
                  </div>
                  {autonomousResearchProjects.map((r: any) => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedResearch(r)}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedResearch.id === r.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{r.research_type}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.status === 'Terminée' ? 'bg-green-100 text-green-700' : 'bg-secondary-100 text-secondary-900'}`}>{r.status}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground-950">{r.research_topic}</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-foreground-500">Readiness {r.publication_readiness}%</span>
                        {r.peer_reviewed && <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Peer-reviewed</span>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-2">
                  <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedResearch.research_type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedResearch.status === 'Terminée' ? 'bg-green-100 text-green-700' : 'bg-secondary-100 text-secondary-900'}`}>{selectedResearch.status}</span>
                      {selectedResearch.peer_reviewed && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium ml-auto">Peer-reviewed</span>
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedResearch.research_topic}</h2>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-foreground-500">Publication Readiness</span>
                        <span className="text-xs font-bold text-foreground-950">{selectedResearch.publication_readiness}%</span>
                      </div>
                      <div className="w-full h-3 bg-background-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${selectedResearch.publication_readiness >= 90 ? 'bg-green-500' : selectedResearch.publication_readiness >= 70 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                          style={{ width: `${selectedResearch.publication_readiness}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground-950 mb-2">Résultats Clés</h4>
                      <p className="text-sm text-foreground-600 leading-relaxed">{selectedResearch.findings_summary}</p>
                    </div>
                    {selectedResearch.completed_at && (
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-background-200/70">
                        <span className="text-xs text-foreground-500">Terminé le</span>
                        <span className="text-xs font-semibold text-foreground-950">
                          {new Date(selectedResearch.completed_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ===== ONGLET 6 : THINK TANK ===== */}
            {activeTab === 'thinktank' && selectedPub && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                      <i className="ri-lightbulb-flash-line text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">KOS Think Tank™</h3>
                      <p className="text-xs text-foreground-500">Publications & Influence</p>
                    </div>
                  </div>
                  {thinkTankPublications.map((p: any) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPub(p)}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedPub.id === p.id ? 'border-amber-300 bg-amber-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{p.publication_type}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(p.status)}`}>{p.status}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground-950">{p.title}</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-foreground-500">{p.research_domain}</span>
                        {p.citation_count > 0 && <span className="text-xs font-bold text-amber-600 ml-auto">{p.citation_count} citations</span>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-2">
                  <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedPub.publication_type}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">{selectedPub.research_domain}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${getStatusBadge(selectedPub.status)}`}>{selectedPub.status}</span>
                    </div>
                    <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedPub.title}</h2>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="p-3 bg-background-100 rounded-lg text-center">
                        <div className="text-xs font-semibold text-foreground-950">{selectedPub.publication_type}</div>
                        <div className="text-xs text-foreground-500">Type</div>
                      </div>
                      <div className="p-3 bg-background-100 rounded-lg text-center">
                        <div className="text-xs font-semibold text-foreground-950">{selectedPub.target_audience}</div>
                        <div className="text-xs text-foreground-500">Audience</div>
                      </div>
                      <div className="p-3 bg-background-100 rounded-lg text-center">
                        <div className="text-xs font-semibold text-foreground-950">{selectedPub.citation_count}</div>
                        <div className="text-xs text-foreground-500">Citations</div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground-950 mb-2">Résultats Clés</h4>
                      <p className="text-sm text-foreground-600 leading-relaxed">{selectedPub.key_findings}</p>
                    </div>
                    <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100 mb-4">
                      <h4 className="text-sm font-semibold text-amber-700 mb-2">Recommandations Politiques</h4>
                      <p className="text-sm text-foreground-600 leading-relaxed">{selectedPub.policy_recommendations}</p>
                    </div>
                    {selectedPub.published_at && (
                      <div className="flex items-center justify-between pt-4 border-t border-background-200/70">
                        <span className="text-xs text-foreground-500">Publié le</span>
                        <span className="text-xs font-semibold text-foreground-950">
                          {new Date(selectedPub.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Indicateurs Clés — Consulting & Mission Factory</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground-500">Missions en cours</span>
                <span className="text-xs font-bold text-foreground-950">{consultingMissions.filter((m: any) => m.status === 'En cours').length}/{consultingMissions.length}</span>
              </div>
              <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-accent-500 rounded-full" style={{ width: `${(consultingMissions.filter((m: any) => m.status === 'En cours').length / consultingMissions.length) * 100}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground-500">Score Qualité Global</span>
                <span className="text-xs font-bold text-foreground-950">{avgQualityScore.toFixed(1)}/10</span>
              </div>
              <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${avgQualityScore * 10}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground-500">Risques Élevés</span>
                <span className="text-xs font-bold text-foreground-950">{highRiskCount}</span>
              </div>
              <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(highRiskCount / engagementRiskAssessments.length) * 100}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground-500">Publications Think Tank</span>
                <span className="text-xs font-bold text-foreground-950">{publishedCount}/{thinkTankPublications.length}</span>
              </div>
              <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(publishedCount / thinkTankPublications.length) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





