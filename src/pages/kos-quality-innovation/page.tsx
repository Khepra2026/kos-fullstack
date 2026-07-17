import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { qualityInnovationHub } from '@/mocks/kosQualityInnovation';

export default function KosQualityInnovationPage() {
  const [activeTab, setActiveTab] = useState<'scoring' | 'peer-review' | 'innovation'>('scoring');
  const d = qualityInnovationHub;

  return (
    <KOSHubLayout hubId="kos-quality-innovation" title={d.title} subtitle={d.subtitle}>
      <div className="space-y-8">
        {/* Score */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background-100 rounded-lg p-5">
            <div className="text-xs text-foreground-600 uppercase tracking-wider mb-1">Score Qualité Global</div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-foreground-950">{d.globalScore}</span>
              <span className="text-lg text-foreground-500">/100</span>
            </div>
            <div className="text-xs text-foreground-500 mt-1">Cible: {d.targetScore}/100</div>
            <div className="mt-2 w-full bg-background-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${d.globalScore}%` }} />
            </div>
          </div>
          <div className="bg-background-100 rounded-lg p-5">
            <div className="text-xs text-foreground-600 uppercase tracking-wider mb-1">Approuvés 1er Passage</div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-foreground-950">{d.peerReviewWorkflow.stats.approvedFirstPass}</span>
              <span className="text-lg text-foreground-500">/ {d.peerReviewWorkflow.stats.totalReviews}</span>
            </div>
            <div className="text-xs text-foreground-500 mt-1">{d.qualityKPIs.targets.firstPassRate.current}</div>
          </div>
          <div className="bg-background-100 rounded-lg p-5">
            <div className="text-xs text-foreground-600 uppercase tracking-wider mb-1">Bloqués (&lt;55)</div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-red-600">{d.peerReviewWorkflow.stats.blocked}</span>
              <span className="text-lg text-foreground-500">livrables</span>
            </div>
            <div className="text-xs text-foreground-500 mt-1">Cible: {d.qualityKPIs.targets.blockedRate.target}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-background-100 rounded-full p-1 w-fit">
          <button
            onClick={() => setActiveTab('scoring')}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'scoring' ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-600 hover:text-foreground-900'
            }`}
          >
            <i className="ri-bar-chart-2-line" /> Scoring 6D
          </button>
          <button
            onClick={() => setActiveTab('peer-review')}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'peer-review' ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-600 hover:text-foreground-900'
            }`}
          >
            <i className="ri-user-voice-line" /> Peer Review
          </button>
          <button
            onClick={() => setActiveTab('innovation')}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'innovation' ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-600 hover:text-foreground-900'
            }`}
          >
            <i className="ri-lightbulb-line" /> Innovation Lab
          </button>
        </div>

        {activeTab === 'scoring' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {d.scoringDimensions.map((dim, i) => (
                <div key={i} className="bg-background-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground-950">{dim.name}</span>
                    <span className="text-xs text-foreground-500">Poids {dim.weight}%</span>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-3xl font-bold text-foreground-950">{dim.current}</span>
                    <span className="text-sm text-foreground-400">→ {dim.target}</span>
                  </div>
                  <div className="w-full bg-background-200 rounded-full h-2 mb-2">
                    <div className={`h-2 rounded-full ${
                      dim.current >= 90 ? 'bg-green-500' : dim.current >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} style={{ width: `${dim.current}%` }} />
                  </div>
                  <div className="space-y-1">
                    {dim.actions.map((action, j) => (
                      <div key={j} className="flex items-center gap-1.5 text-xs text-foreground-500">
                        <i className="ri-arrow-right-s-line text-foreground-400" />
                        {action}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* KPIs mensuels */}
            <div className="bg-background-100 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-line-chart-line" /> Score Qualité — 6 Derniers Mois
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {d.qualityKPIs.monthly.map((m, i) => (
                  <div key={i} className="text-center bg-background-50 rounded p-3">
                    <div className="text-xs text-foreground-500 mb-1">{m.month}</div>
                    <div className="text-xl font-bold text-foreground-950">{m.score}</div>
                    <div className="text-xs text-foreground-400 mt-1">
                      {m.peerReviews} PR · {m.blocked} BQ
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'peer-review' && (
          <div className="space-y-6">
            {/* Workflow */}
            <div className="bg-background-100 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-git-branch-line" /> Workflow Peer Review — 7 Étapes
              </h3>
              <div className="space-y-0">
                {d.peerReviewWorkflow.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold bg-green-500 text-white">
                        {step.order}
                      </div>
                      {i < d.peerReviewWorkflow.steps.length - 1 && (
                        <div className="w-0.5 h-8 bg-background-200" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground-900">{step.name}</span>
                        <span className="text-xs text-foreground-400">SLA: {step.sla}</span>
                      </div>
                      <div className="text-xs text-foreground-500">{step.actor} — {step.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-800">{d.peerReviewWorkflow.stats.approvedFirstPass}</div>
                <div className="text-xs text-green-700">Approuvés 1er passage</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-800">{d.peerReviewWorkflow.stats.peerReviewRequired}</div>
                <div className="text-xs text-yellow-700">Peer Review requis</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-800">{d.peerReviewWorkflow.stats.qualityReviewRequired}</div>
                <div className="text-xs text-orange-700">Quality Review</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-800">{d.peerReviewWorkflow.stats.blocked}</div>
                <div className="text-xs text-red-700">Bloqués</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background-100 rounded-lg p-5">
                <div className="text-xs text-foreground-600 uppercase tracking-wider mb-1">Délai Moyen de Revue</div>
                <div className="text-3xl font-bold text-foreground-950">{d.peerReviewWorkflow.stats.avgReviewTime}</div>
                <div className="text-xs text-foreground-500 mt-1">Cible: {d.qualityKPIs.targets.peerReviewTime.target}</div>
              </div>
              <div className="bg-background-100 rounded-lg p-5">
                <div className="text-xs text-foreground-600 uppercase tracking-wider mb-1">Taux d'Amélioration Post-Review</div>
                <div className="text-3xl font-bold text-green-700">{d.peerReviewWorkflow.stats.improvementRate}</div>
                <div className="text-xs text-foreground-500 mt-1">Score après Peer Review</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'innovation' && (
          <div className="space-y-6">
            {/* Innovations déployées */}
            <div className="bg-background-100 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-rocket-line" /> Innovations Développées
              </h3>
              <div className="space-y-3">
                {d.innovationProgram.innovations.map((inn, i) => (
                  <div key={i} className="flex items-start justify-between bg-background-50 rounded p-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-foreground-950">{inn.name}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          inn.status === 'deployed' ? 'bg-green-100 text-green-800' :
                          inn.status === 'testing' ? 'bg-yellow-100 text-yellow-800' :
                          inn.status === 'development' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {inn.status === 'deployed' ? 'Déployé' : inn.status === 'testing' ? 'En test' : inn.status === 'development' ? 'En développement' : 'Recherche'}
                        </span>
                      </div>
                      <div className="text-xs text-foreground-500">{inn.description}</div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xs text-foreground-500">Adoption</div>
                      <div className="text-sm font-semibold text-foreground-950">{inn.adoption}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workshops */}
            <div className="bg-background-100 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-calendar-event-line" /> Workshops d'Innovation Planifiés
              </h3>
              <div className="space-y-3">
                {d.innovationProgram.workshops.map((ws, i) => (
                  <div key={i} className="flex items-start gap-4 bg-background-50 rounded p-4">
                    <div className="w-14 h-14 rounded-lg bg-purple-50 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-purple-700">{ws.date.split('-')[2]}</span>
                      <span className="text-xs text-purple-500">{new Date(ws.date).toLocaleDateString('fr-FR', { month: 'short' })}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground-950 mb-1">{ws.theme}</div>
                      <div className="text-xs text-foreground-500">Participants: {ws.participants}</div>
                      <div className="text-xs text-foreground-500">{ws.deliverables}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800 whitespace-nowrap self-start">
                      {ws.status === 'planned' ? 'Planifié' : 'En cours'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </KOSHubLayout>
  );
}