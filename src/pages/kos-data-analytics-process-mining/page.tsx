import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import {
  dataAnalyticsCenter,
  organizationalIntelligence,
  modelEvaluationEngine,
  processMiningEngine,
  workflowGenerator,
  sopGenerator,
  automationAuditor,
} from '@/mocks/kosDataAnalyticsProcessMining';

type Tab = 'analytics' | 'org-intel' | 'models' | 'process-mining' | 'workflows' | 'sops' | 'audits';

export default function KOSDataAnalyticsProcessMiningPage() {
  const [activeTab, setActiveTab] = useState<Tab>('analytics');
  const [selectedAnalytics, setSelectedAnalytics] = useState(dataAnalyticsCenter[0]);
  const [selectedOrgIntel, setSelectedOrgIntel] = useState(organizationalIntelligence[0]);
  const [selectedModel, setSelectedModel] = useState(modelEvaluationEngine[0]);
  const [selectedProcess, setSelectedProcess] = useState(processMiningEngine[0]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(workflowGenerator[0]);
  const [selectedSop, setSelectedSop] = useState(sopGenerator[0]);
  const [selectedAudit, setSelectedAudit] = useState(automationAuditor[0]);

  const formatFCFA = (val: number) => {
    const abs = Math.abs(val);
    if (abs >= 1000000000) return `${(abs / 1000000000).toFixed(1)} Md`;
    if (abs >= 1000000) return `${(abs / 1000000).toFixed(0)} M`;
    return `${abs.toLocaleString('fr-FR')}`;
  };

  const renderGaugeCircle = (score: number, maxScore: number, size: number = 48, colorOverride?: string) => {
    const pct = Math.min((score / maxScore) * 100, 100);
    const r = (size - 8) / 2;
    const circ = 2 * Math.PI * r;
    const color = colorOverride || (score >= 9 ? '#22c55e' : score >= 8 ? '#06b6d4' : score >= 7 ? '#f59e0b' : '#ef4444');
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="-rotate-90" style={{ width: size, height: size }} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5"
            strokeDasharray={`${(pct / 100) * circ} ${circ}`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-foreground-950">{typeof score === 'number' && score % 1 !== 0 ? score.toFixed(1) : score}</span>
        </div>
      </div>
    );
  };

  const renderScoreBar = (score: number, max: number = 100, color?: string) => (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color || 'bg-accent-500'}`} style={{ width: `${Math.min((score / max) * 100, 100)}%` }}></div>
      </div>
      <span className="text-xs font-bold text-foreground-950">{typeof score === 'number' && score % 1 !== 0 ? score.toFixed(1) : score}{max === 1 ? '' : '%'}</span>
    </div>
  );

  const getReportChip = (type: string) => {
    const map: Record<string, string> = { 'Performance Commerciale': 'bg-emerald-100 text-emerald-700', 'Analyse Financière': 'bg-secondary-100 text-secondary-900', 'Ressources Humaines': 'bg-amber-100 text-amber-700', 'Intelligence Concurrentielle': 'bg-accent-100 text-accent-900', 'Qualité & Excellence': 'bg-cyan-100 text-cyan-700', 'Marketing Digital': 'bg-rose-100 text-rose-700', 'Innovation & R&D': 'bg-primary-100 text-primary-900', 'Risque & Conformité': 'bg-red-100 text-red-700' };
    return map[type] || 'bg-secondary-100 text-secondary-700';
  };

  const getInefficiencyChip = (score: number) => score >= 35 ? 'bg-red-100 text-red-700' : score >= 25 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700';

  const getAutoLevelChip = (level: string) => level.includes('entièrement') || level.includes('Hautement') ? 'bg-green-100 text-green-700' : level.includes('Semi') ? 'bg-amber-100 text-amber-700' : 'bg-background-100 text-foreground-600';

  const avgOrgMaturity = (organizationalIntelligence.reduce((s, o) => s + o.overall_maturity, 0) / organizationalIntelligence.length);
  const avgModelF1 = (modelEvaluationEngine.reduce((s, m) => s + m.f1_score, 0) / modelEvaluationEngine.length);
  const avgInefficiency = (processMiningEngine.reduce((s, p) => s + p.inefficiency_score, 0) / processMiningEngine.length);
  const deployedWf = workflowGenerator.filter(w => w.status === 'Actif').length;
  const activeSops = sopGenerator.filter(s => s.status === 'Actif').length;
  const avgAuditPerf = (automationAuditor.reduce((s, a) => s + a.performance_score, 0) / automationAuditor.length);

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'analytics', label: 'Centre Analytique', icon: 'ri-bar-chart-2-line', count: dataAnalyticsCenter.length },
    { id: 'org-intel', label: 'Intelligence Organisationnelle', icon: 'ri-organization-chart', count: organizationalIntelligence.length },
    { id: 'models', label: 'Évaluation Modèles', icon: 'ri-cpu-line', count: modelEvaluationEngine.filter(m => m.drift_detected).length },
    { id: 'process-mining', label: 'Process Mining', icon: 'ri-git-branch-line', count: processMiningEngine.filter(p => p.inefficiency_score >= 35).length },
    { id: 'workflows', label: 'Générateur Workflows', icon: 'ri-flow-chart', count: workflowGenerator.filter(w => w.status !== 'Actif').length },
    { id: 'sops', label: 'Générateur SOP', icon: 'ri-file-list-3-line', count: activeSops },
    { id: 'audits', label: 'Audit Automatisation', icon: 'ri-shield-check-line', count: automationAuditor.filter(a => a.performance_score < 80).length },
  ];

  return (
    <KOSHubLayout hubId={8}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-900 text-xs font-semibold mb-4">
                <i className="ri-bar-chart-2-line"></i>KOS Phase 5 — Data Analytics & Process Mining Command
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">Data Analytics & Process Mining Command</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Centre névralgique de l'intelligence data — Analytics Big Four, Évaluation de maturité organisationnelle, Évaluation des modèles IA,
                Process Mining avancé, Génération de workflows automatisés, Standardisation SOP et Audit continu de l'automatisation.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xl font-bold text-accent-600">{dataAnalyticsCenter.length}</div>
                <div className="text-xs text-foreground-500">Rapports Analytics</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xl font-bold text-emerald-600">{avgOrgMaturity.toFixed(1)}/10</div>
                <div className="text-xs text-foreground-500">Maturité Org. Moy.</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xl font-bold text-amber-600">{deployedWf}/{workflowGenerator.length}</div>
                <div className="text-xs text-foreground-500">Workflows Actifs</div>
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
                {tab.count > 0 && (tab.id === 'models' || tab.id === 'process-mining' || tab.id === 'workflows' || tab.id === 'audits') && (
                  <span className="text-xs opacity-60">{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ===== ONGLET 1 : DATA ANALYTICS CENTER ===== */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-900">
                  <i className="ri-bar-chart-2-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Data Analytics Center™</h3>
                  <p className="text-xs text-foreground-500">{dataAnalyticsCenter.length} rapports analytics</p>
                </div>
              </div>
              {dataAnalyticsCenter.map((r) => (
                <div
                  key={r.id}
                  onClick={() => setSelectedAnalytics(r)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedAnalytics.id === r.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${getReportChip(r.report_type)}`}>{r.report_type}</span>
                    <span className="text-xs text-foreground-400">{r.period}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{r.title}</h4>
                  <p className="text-xs text-foreground-500 mt-1 line-clamp-2">{r.insights.substring(0, 80)}...</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getReportChip(selectedAnalytics.report_type)}`}>{selectedAnalytics.report_type}</span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Généré le {new Date(selectedAnalytics.generated_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedAnalytics.title}</h2>
                <p className="text-sm text-foreground-500 mb-4">Période : {selectedAnalytics.period} — Source : {selectedAnalytics.data_source}</p>
                <div className="p-4 bg-background-100 rounded-lg mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">KPIs Clés</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedAnalytics.kpis}</p>
                </div>
                <div className="p-4 bg-accent-50/50 rounded-lg border border-accent-100 mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Insights</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedAnalytics.insights}</p>
                </div>
                <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Prévisions & Recommandations</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedAnalytics.forecast}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 2 : ORGANIZATIONAL INTELLIGENCE ===== */}
        {activeTab === 'org-intel' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <i className="ri-organization-chart text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Organizational Intelligence™</h3>
                  <p className="text-xs text-foreground-500">{organizationalIntelligence.length} évaluations — Maturité moyenne {avgOrgMaturity.toFixed(1)}/10</p>
                </div>
              </div>
              {organizationalIntelligence.map((o) => (
                <div
                  key={o.id}
                  onClick={() => setSelectedOrgIntel(o)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedOrgIntel.id === o.id ? 'border-emerald-300 bg-emerald-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{o.assessment_type}</span>
                    <span className="text-sm font-bold text-foreground-950">{o.overall_maturity.toFixed(1)}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{o.entity_name}</h4>
                  <div className="flex gap-2 mt-2">{renderScoreBar(o.overall_maturity * 10, 100, o.overall_maturity >= 9 ? 'bg-emerald-500' : o.overall_maturity >= 8 ? 'bg-cyan-500' : 'bg-amber-500')}</div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedOrgIntel.assessment_type}</span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Évalué le {new Date(selectedOrgIntel.assessed_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedOrgIntel.entity_name}</h2>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                  {[{ label: 'Gouvernance', val: selectedOrgIntel.governance_score }, { label: 'Leadership', val: selectedOrgIntel.leadership_score }, { label: 'Opérations', val: selectedOrgIntel.operations_score }, { label: 'Innovation', val: selectedOrgIntel.innovation_score }, { label: 'Digital', val: selectedOrgIntel.digital_score }].map((d) => (
                    <div key={d.label} className="flex flex-col items-center gap-1 p-3 bg-background-100 rounded-lg">
                      {renderGaugeCircle(d.val, 10, 44, d.val >= 9 ? '#22c55e' : d.val >= 8 ? '#06b6d4' : d.val >= 7 ? '#f59e0b' : '#ef4444')}
                      <span className="text-[10px] text-foreground-500 text-center">{d.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-500">Maturité Globale</span>
                    <span className="text-sm font-bold text-emerald-600">{selectedOrgIntel.overall_maturity.toFixed(1)}/10</span>
                  </div>
                  {renderScoreBar(selectedOrgIntel.overall_maturity * 10, 100, 'bg-emerald-500')}
                </div>
                <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Recommandations</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedOrgIntel.recommendations}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 3 : MODEL EVALUATION ENGINE ===== */}
        {activeTab === 'models' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-900">
                  <i className="ri-cpu-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Model Evaluation Engine™</h3>
                  <p className="text-xs text-foreground-500">{modelEvaluationEngine.length} modèles — F1 moyen {(avgModelF1 * 100).toFixed(0)}%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="p-2 rounded-lg bg-green-50/70 border border-green-100 text-center">
                  <div className="text-lg font-bold text-green-700">{modelEvaluationEngine.filter(m => !m.drift_detected).length}</div>
                  <div className="text-[10px] text-foreground-500">Stables</div>
                </div>
                <div className="p-2 rounded-lg bg-red-50/70 border border-red-100 text-center">
                  <div className="text-lg font-bold text-red-700">{modelEvaluationEngine.filter(m => m.drift_detected).length}</div>
                  <div className="text-[10px] text-foreground-500">Drift</div>
                </div>
              </div>
              {modelEvaluationEngine.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedModel(m)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedModel.id === m.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{m.evaluation_type}</span>
                    {m.drift_detected && <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">⚠️ Drift</span>}
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{m.model_name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">F1 Score</span>
                    <span className="text-sm font-bold text-foreground-950">{(m.f1_score * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedModel.evaluation_type}</span>
                  {selectedModel.drift_detected && <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">⚠️ Drift Détecté</span>}
                  <span className="text-xs text-foreground-400 ml-auto">
                    Évalué le {new Date(selectedModel.evaluated_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedModel.model_name}</h2>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGaugeCircle(selectedModel.accuracy_score, 1, 44, selectedModel.accuracy_score >= 0.9 ? '#22c55e' : selectedModel.accuracy_score >= 0.8 ? '#f59e0b' : '#ef4444')}</div>
                    <div className="text-xs text-foreground-500 mt-1">Accuracy</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGaugeCircle(selectedModel.precision_score, 1, 44, selectedModel.precision_score >= 0.9 ? '#22c55e' : selectedModel.precision_score >= 0.8 ? '#f59e0b' : '#ef4444')}</div>
                    <div className="text-xs text-foreground-500 mt-1">Precision</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGaugeCircle(selectedModel.recall_score, 1, 44, selectedModel.recall_score >= 0.9 ? '#22c55e' : selectedModel.recall_score >= 0.8 ? '#f59e0b' : '#ef4444')}</div>
                    <div className="text-xs text-foreground-500 mt-1">Recall</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGaugeCircle(selectedModel.f1_score, 1, 44, selectedModel.f1_score >= 0.9 ? '#22c55e' : selectedModel.f1_score >= 0.8 ? '#06b6d4' : '#f59e0b')}</div>
                    <div className="text-xs text-foreground-500 mt-1">F1 Score</div>
                  </div>
                </div>
                <div className="p-4 bg-primary-50/50 rounded-lg border border-primary-100">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Recommandations</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedModel.recommendations}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 4 : PROCESS MINING ===== */}
        {activeTab === 'process-mining' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-100 text-cyan-700">
                  <i className="ri-git-branch-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Process Mining Engine™</h3>
                  <p className="text-xs text-foreground-500">{processMiningEngine.length} processus — Inefficience {avgInefficiency.toFixed(0)}%</p>
                </div>
              </div>
              {processMiningEngine.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProcess(p)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedProcess.id === p.id ? 'border-cyan-300 bg-cyan-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{p.department}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getInefficiencyChip(p.inefficiency_score)}`}>{p.inefficiency_score.toFixed(0)}% ineff.</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{p.process_name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">{p.avg_duration_hours.toFixed(0)}h</span>
                    <span className="text-xs text-foreground-400">{formatFCFA(p.cost_per_instance_fcfa)} FCFA/instance</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedProcess.department}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getInefficiencyChip(selectedProcess.inefficiency_score)}`}>
                    Inefficience {selectedProcess.inefficiency_score.toFixed(0)}%
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedProcess.status.includes('Optimisé') ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {selectedProcess.status}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedProcess.process_name}</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{selectedProcess.avg_duration_hours.toFixed(0)}h</div>
                    <div className="text-xs text-foreground-500">Durée Moyenne</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{formatFCFA(selectedProcess.cost_per_instance_fcfa)}</div>
                    <div className="text-xs text-foreground-500">Coût/Instance (FCFA)</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGaugeCircle(100 - selectedProcess.inefficiency_score, 100, 44, selectedProcess.inefficiency_score <= 20 ? '#22c55e' : selectedProcess.inefficiency_score <= 30 ? '#f59e0b' : '#ef4444')}</div>
                    <div className="text-xs text-foreground-500 mt-1">Efficience</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-red-50/50 rounded-lg border border-red-100">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Goulets d'Étranglement</h4>
                    <p className="text-sm text-foreground-600 leading-relaxed">{selectedProcess.bottlenecks}</p>
                  </div>
                  <div className="p-4 bg-green-50/50 rounded-lg border border-green-100">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Plan d'Optimisation</h4>
                    <p className="text-sm text-foreground-600 leading-relaxed">{selectedProcess.optimization_plan}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 5 : WORKFLOW GENERATOR ===== */}
        {activeTab === 'workflows' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                  <i className="ri-flow-chart text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Workflow Generator™</h3>
                  <p className="text-xs text-foreground-500">{workflowGenerator.length} workflows — {deployedWf} actifs</p>
                </div>
              </div>
              {workflowGenerator.map((w) => (
                <div
                  key={w.id}
                  onClick={() => setSelectedWorkflow(w)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedWorkflow.id === w.id ? 'border-teal-300 bg-teal-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-500 whitespace-nowrap">{w.department}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getAutoLevelChip(w.automation_level)}`}>{w.automation_level}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{w.workflow_name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">{w.steps_count} étapes</span>
                    <span className="text-xs font-bold text-green-600">-{w.time_saved_per_execution_min.toFixed(0)} min</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedWorkflow.department}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getAutoLevelChip(selectedWorkflow.automation_level)}`}>{selectedWorkflow.automation_level}</span>
                  {selectedWorkflow.deployed_at && (
                    <span className="text-xs text-foreground-400 ml-auto">
                      Déployé le {new Date(selectedWorkflow.deployed_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedWorkflow.workflow_name}</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{selectedWorkflow.steps_count}</div>
                    <div className="text-xs text-foreground-500">Étapes</div>
                  </div>
                  <div className="p-4 bg-green-50/50 rounded-lg border border-green-100 text-center">
                    <div className="text-2xl font-bold text-green-600">-{selectedWorkflow.time_saved_per_execution_min.toFixed(0)} min</div>
                    <div className="text-xs text-foreground-500">Temps Gagné/exécution</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{selectedWorkflow.status === 'Actif' ? 'En Production' : 'En Conception'}</div>
                    <div className="text-xs text-foreground-500">Statut</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-500">Niveau d'automatisation</span>
                  </div>
                  {renderScoreBar(selectedWorkflow.automation_level.includes('Entièrement') ? 100 : selectedWorkflow.automation_level.includes('Hautement') ? 80 : selectedWorkflow.automation_level.includes('Semi') ? 50 : 25, 100, 'bg-teal-500')}
                </div>
                <div className="p-4 bg-background-100 rounded-lg">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Gain Annuel Estimé</h4>
                  <p className="text-sm text-foreground-600">
                    {(selectedWorkflow.time_saved_per_execution_min * 120 / 60).toFixed(0)}h économisées/an sur la base de 120 exécutions annuelles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 6 : SOP GENERATOR ===== */}
        {activeTab === 'sops' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-900">
                  <i className="ri-file-list-3-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS SOP Generator™</h3>
                  <p className="text-xs text-foreground-500">{sopGenerator.length} SOPs — {activeSops} actives</p>
                </div>
              </div>
              {sopGenerator.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSop(s)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedSop.id === s.id ? 'border-secondary-300 bg-secondary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{s.process_domain}</span>
                    <span className="text-xs font-semibold text-secondary-600">{s.version}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{s.sop_title}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">{s.responsible_role}</span>
                    <span className="text-xs text-foreground-400">Révision {s.review_frequency.toLowerCase()}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-900 font-medium">{selectedSop.sop_title.split(' : ')[0]}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">v{selectedSop.version}</span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Approuvé le {new Date(selectedSop.approved_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedSop.sop_title}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-sm font-bold text-foreground-950">{selectedSop.process_domain}</div>
                    <div className="text-xs text-foreground-500">Domaine</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-sm font-bold text-foreground-950">{selectedSop.responsible_role}</div>
                    <div className="text-xs text-foreground-500">Responsable</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-sm font-bold text-foreground-950">{selectedSop.review_frequency}</div>
                    <div className="text-xs text-foreground-500">Fréquence Révision</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-sm font-bold text-green-600">{selectedSop.status}</div>
                    <div className="text-xs text-foreground-500">Statut</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary-50/50 rounded-lg border border-secondary-100">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Approbation</h4>
                    <p className="text-sm text-foreground-600">Approuvé par <strong>{selectedSop.approved_by}</strong></p>
                    <p className="text-xs text-foreground-400 mt-1">Créé le {new Date(selectedSop.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Cycle de Vie</h4>
                    <p className="text-sm text-foreground-600">Version actuelle : <strong>{selectedSop.version}</strong></p>
                    <p className="text-xs text-foreground-400 mt-1">Prochaine révision : {selectedSop.review_frequency.toLowerCase()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 7 : AUTOMATION AUDITOR ===== */}
        {activeTab === 'audits' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <i className="ri-shield-check-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Automation Auditor™</h3>
                  <p className="text-xs text-foreground-500">{automationAuditor.length} audits — Perf. moyenne {avgAuditPerf.toFixed(0)}%</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="p-2 rounded-lg bg-green-50/70 border border-green-100 text-center">
                  <div className="text-lg font-bold text-green-700">{automationAuditor.filter(a => a.performance_score >= 85).length}</div>
                  <div className="text-[10px] text-foreground-500">Excellent</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-100 text-center">
                  <div className="text-lg font-bold text-amber-700">{automationAuditor.filter(a => a.performance_score >= 70 && a.performance_score < 85).length}</div>
                  <div className="text-[10px] text-foreground-500">OK</div>
                </div>
                <div className="p-2 rounded-lg bg-red-50/70 border border-red-100 text-center">
                  <div className="text-lg font-bold text-red-700">{automationAuditor.filter(a => a.performance_score < 70).length}</div>
                  <div className="text-[10px] text-foreground-500">À améliorer</div>
                </div>
              </div>
              {automationAuditor.map((a) => (
                <div
                  key={a.id}
                  onClick={() => setSelectedAudit(a)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedAudit.id === a.id ? 'border-amber-300 bg-amber-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{a.audit_type}</span>
                    <span className={`text-sm font-bold ${a.performance_score >= 85 ? 'text-green-600' : a.performance_score >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{a.performance_score.toFixed(0)}%</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">
                    {workflowGenerator.find(w => w.id === a.automation_id)?.workflow_name || `Workflow #${a.automation_id}`}
                  </h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">Erreurs {a.error_rate.toFixed(1)}%</span>
                    <span className="text-xs text-foreground-400">Conformité {a.compliance_score.toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedAudit.audit_type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedAudit.performance_score >= 85 ? 'bg-green-100 text-green-700' : selectedAudit.performance_score >= 70 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                    Score {selectedAudit.performance_score.toFixed(0)}%
                  </span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Audité le {new Date(selectedAudit.audited_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">
                  {workflowGenerator.find(w => w.id === selectedAudit.automation_id)?.workflow_name || `Workflow #${selectedAudit.automation_id}`}
                </h2>
                <p className="text-sm text-foreground-500 mb-4">Audit {selectedAudit.audit_type} — Automatisation #{selectedAudit.automation_id}</p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGaugeCircle(selectedAudit.performance_score, 100, 44, selectedAudit.performance_score >= 85 ? '#22c55e' : selectedAudit.performance_score >= 70 ? '#f59e0b' : '#ef4444')}</div>
                    <div className="text-xs text-foreground-500 mt-1">Performance</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{selectedAudit.error_rate.toFixed(1)}%</div>
                    <div className="text-xs text-foreground-500">Taux d'Erreur</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{selectedAudit.compliance_score.toFixed(0)}%</div>
                    <div className="text-xs text-foreground-500">Conformité</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Constatations</h4>
                    <p className="text-sm text-foreground-600 leading-relaxed">{selectedAudit.findings}</p>
                  </div>
                  <div className="p-4 bg-green-50/50 rounded-lg border border-green-100">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Recommandations</h4>
                    <p className="text-sm text-foreground-600 leading-relaxed">{selectedAudit.recommendations}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Indicateurs Clés — Data Analytics & Process Mining Command</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Rapports Analytics</div>
              <div className="text-lg font-bold text-accent-600">{dataAnalyticsCenter.length}</div>
              <div className="text-xs text-foreground-400 mt-2">8 types de rapports</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Maturité Org.</div>
              <div className="text-lg font-bold text-emerald-600">{avgOrgMaturity.toFixed(1)}/10</div>
              <div className="text-xs text-foreground-400 mt-2">{organizationalIntelligence.length} dimensions</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">F1 Modèles IA</div>
              <div className="text-lg font-bold text-primary-600">{(avgModelF1 * 100).toFixed(0)}%</div>
              <div className="text-xs text-foreground-400 mt-2">{modelEvaluationEngine.filter(m => m.drift_detected).length} drift détecté</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Inefficience Proc.</div>
              <div className="text-lg font-bold text-cyan-600">{avgInefficiency.toFixed(0)}%</div>
              <div className="text-xs text-foreground-400 mt-2">{processMiningEngine.length} processus</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Workflows Actifs</div>
              <div className="text-lg font-bold text-teal-600">{deployedWf}/{workflowGenerator.length}</div>
              <div className="text-xs text-foreground-400 mt-2">{workflowGenerator.filter(w => w.status !== 'Actif').length} en conception</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">SOPs Actives</div>
              <div className="text-lg font-bold text-secondary-600">{activeSops}/{sopGenerator.length}</div>
              <div className="text-xs text-foreground-400 mt-2">Toutes approuvées</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Score Audit Moy.</div>
              <div className="text-lg font-bold text-amber-600">{avgAuditPerf.toFixed(0)}%</div>
              <div className="text-xs text-foreground-400 mt-2">{automationAuditor.filter(a => a.performance_score >= 85).length} excellents</div>
            </div>
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}