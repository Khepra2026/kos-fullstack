import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useAIGovernance } from '@/hooks/useAIGovernance';
import { royaltyEngine } from '@/mocks/autoDev10X';
import { bigFourMasterPrompts } from '@/mocks/bigFourMasterPrompts';
import DigitalTwinChart from '';

type Tab = 'registry' | 'compliance' | 'risks' | 'ethics' | 'audit' | 'council' | 'prompts' | 'validation' | 'knowledge' | 'hallucination' | 'sources' | 'models' | 'standards' | 'bias' | 'kpis' | 'royalty' | 'bigfour' | 'digitaltwin';

const riskLevelColor = (level: string) => {
  if (level.includes('Élevé') || level.includes('Critique')) return 'bg-red-100 text-red-700';
  if (level.includes('Moyen')) return 'bg-amber-100 text-amber-700';
  return 'bg-green-100 text-green-700';
};

const statusColor = (status: string) => {
  if (status.includes('Conforme') && !status.includes('Non') && !status.includes('Partiellement')) return 'bg-green-100 text-green-700';
  if (status.includes('Partiellement') || status.includes('En Cours')) return 'bg-amber-100 text-amber-700';
  if (status.includes('Non Conforme')) return 'bg-red-100 text-red-700';
  if (status.includes('Validé') || status.includes('Vérifié') || status.includes('Approuvé')) return 'bg-green-100 text-green-700';
  return 'bg-secondary-100 text-secondary-700';
};

const authLevelColor = (level: string) => {
  if (level.includes('Primaire') || level.includes('Supranationale')) return 'bg-emerald-100 text-emerald-700';
  if (level.includes('International') || level.includes('Institution')) return 'bg-primary-100 text-primary-700';
  if (level.includes('Secondaire') || level.includes('Spécialisé')) return 'bg-amber-100 text-amber-700';
  return 'bg-secondary-100 text-secondary-700';
};

export default function aIGovernanceEthicsPage() {
  const {
    registry: aiRegistry,
    compliance: aiComplianceEngine,
    risks: aiRiskOffice,
    ethics: aiEthicsBoard,
    audit: aiAuditTrail,
    council: aiGovernanceCouncil,
    prompts: promptQualityOffice,
    knowledge: knowledgeValidationEngine,
    sources: sourceVerificationEngine,
    validation: aiValidationWorkflow,
    hallucination: hallucinationControlFramework,
    models: modelRegistry,
    standards: standardsAlignment,
    kpis: governanceKPIs,
    bias: biasControlFramework,
    dataSource,
    loading,
    error,
    refresh,
  } = useAIGovernance();

  const [activeTab, setActiveTab] = useState<Tab>('registry');
  const [selectedAgent, setSelectedAgent] = useState(aiRegistry[0] || null);
  const [selectedCompliance, setSelectedCompliance] = useState(aiComplianceEngine[0] || null);
  const [selectedRisk, setSelectedRisk] = useState(aiRiskOffice[0] || null);
  const [selectedEthics, setSelectedEthics] = useState(aiEthicsBoard[0] || null);
  const [selectedAudit, setSelectedAudit] = useState(aiAuditTrail[0] || null);
  const [selectedCouncil, setSelectedCouncil] = useState(aiGovernanceCouncil[0] || null);
  const [selectedPrompt, setSelectedPrompt] = useState(promptQualityOffice[0] || null);
  const [selectedKnowledge, setSelectedKnowledge] = useState(knowledgeValidationEngine[0] || null);
  const [selectedSource, setSelectedSource] = useState(sourceVerificationEngine[0] || null);
  const [selectedValidation, setSelectedValidation] = useState(aiValidationWorkflow[0] || null);
  const [selectedHallucination, setSelectedHallucination] = useState(hallucinationControlFramework[0] || null);
  const [selectedModel, setSelectedModel] = useState(modelRegistry[0] || null);
  const [selectedStandard, setSelectedStandard] = useState(standardsAlignment[0] || null);
  const [selectedBias, setSelectedBias] = useState(biasControlFramework[0] || null);
  const [selectedKPI, setSelectedKPI] = useState(governanceKPIs[0] || null);
  const [selectedBigFour, setSelectedBigFour] = useState(bigFourMasterPrompts.prompts[0]);
  const [expandedChangeLog, setExpandedChangeLog] = useState<number | null>(null);

  const isLive = dataSource === 'supabase';

  const formatFCFA = (val: number) => {
    const abs = Math.abs(val);
    if (abs >= 1000000000) return `${(abs / 1000000000).toFixed(1)} Md`;
    if (abs >= 1000000) return `${(abs / 1000000).toFixed(0)} M`;
    return `${abs.toLocaleString('fr-FR')}`;
  };

  const renderGaugeCircle = (score: number, maxScore: number, size: number = 44, colorOverride?: string) => {
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
      <span className="text-xs font-bold text-foreground-950">{typeof score === 'number' && score % 1 !== 0 ? score.toFixed(1) : score}/{max}</span>
    </div>
  );

  const getAgentById = (id: number) => aiRegistry.find(a => a.id === id);

  const prodCount = aiRegistry.filter(a => a.deployment_status === 'Production').length;
  const highRiskCount = aiRegistry.filter(a => a.risk_level === 'Élevé').length;
  const compliantCount = aiComplianceEngine.filter(c => c.is_compliant).length;
  const avgTraceability = (aiAuditTrail.reduce((s, a) => s + a.traceability_score, 0) / aiAuditTrail.length);
  const avgIso = (aiGovernanceCouncil.reduce((s, c) => s + c.iso_42001_alignment, 0) / aiGovernanceCouncil.length);
  const validKnowledge = knowledgeValidationEngine.filter(k => k.validation_status === 'Validé').length;
  const verifiedSources = sourceVerificationEngine.filter(s => s.verification_status.includes('Vérifié')).length;
  const approvedValidations = aiValidationWorkflow.filter(v => v.overall_status === 'approved').length;
  const avgHallucinationRate = (hallucinationControlFramework.reduce((s, h) => s + h.hallucination_rate, 0) / hallucinationControlFramework.length);
  const avgControlEffectiveness = (hallucinationControlFramework.reduce((s, h) => s + h.control_effectiveness_score, 0) / hallucinationControlFramework.length);
  const totalHallucinations = hallucinationControlFramework.reduce((s, h) => s + h.hallucinations_detected, 0);
  const totalOutputsChecked = hallucinationControlFramework.reduce((s, h) => s + h.total_outputs_checked, 0);
  const internalModels = modelRegistry.filter(m => m.provider.includes('KHEPRA')).length;
  const externalModels = modelRegistry.filter(m => !m.provider.includes('KHEPRA')).length;
  const avgStandardsAlignment = (standardsAlignment.reduce((s, a) => s + a.overall_alignment, 0) / standardsAlignment.length);
  const avgNistScore = (standardsAlignment.reduce((s, a) => s + a.nist_rmf_score, 0) / standardsAlignment.length);
  const avgOecdScore = (standardsAlignment.reduce((s, a) => s + a.oecd_score, 0) / standardsAlignment.length);
  const highBiasCount = biasControlFramework.filter(b => b.severity === 'Élevé').length;
  const avgBiasScore = (biasControlFramework.reduce((s, b) => s + b.bias_score, 0) / biasControlFramework.length);
  const kpiAccuracyAvg = governanceKPIs.filter(k => k.metric_category === 'accuracy').reduce((s, k) => s + k.current_value, 0) / governanceKPIs.filter(k => k.metric_category === 'accuracy').length;
  const kpiComplianceAvg = governanceKPIs.filter(k => k.metric_category === 'compliance').reduce((s, k) => s + k.current_value, 0) / governanceKPIs.filter(k => k.metric_category === 'compliance').length;
  const kpiErrorAvg = governanceKPIs.filter(k => k.metric_category === 'error_rate').reduce((s, k) => s + k.current_value, 0) / governanceKPIs.filter(k => k.metric_category === 'error_rate').length;

  const tabs: { id: Tab; label: string; icon: string; badge?: string }[] = [
    { id: 'registry', label: 'Registre IA', icon: 'ri-archive-line', badge: `${prodCount}/${aiRegistry.length}` },
    { id: 'models', label: 'Registre Modèles', icon: 'ri-cpu-line', badge: `${modelRegistry.length}` },
    { id: 'compliance', label: 'Conformité IA', icon: 'ri-check-double-line', badge: `${compliantCount}/${aiComplianceEngine.length}` },
    { id: 'standards', label: 'Standards', icon: 'ri-global-line', badge: avgStandardsAlignment.toFixed(1) },
    { id: 'risks', label: 'Risques IA', icon: 'ri-shield-flash-line', badge: `${highRiskCount} élevés` },
    { id: 'bias', label: 'Contrôle Biais', icon: 'ri-scales-3-line', badge: `${highBiasCount} élevés` },
    { id: 'ethics', label: 'Éthique IA', icon: 'ri-heart-pulse-line' },
    { id: 'audit', label: 'Traçabilité IA', icon: 'ri-footprint-line', badge: avgTraceability.toFixed(1) },
    { id: 'council', label: 'Conseil Gouvernance', icon: 'ri-government-line', badge: avgIso.toFixed(1) },
    { id: 'prompts', label: 'Prompt Register', icon: 'ri-chat-quote-line', badge: `${promptQualityOffice.length}` },
    { id: 'validation', label: 'Validation Workflow', icon: 'ri-task-line', badge: `${approvedValidations}/${aiValidationWorkflow.length}` },
    { id: 'knowledge', label: 'Validation Connaissances', icon: 'ri-brain-line', badge: `${validKnowledge}/${knowledgeValidationEngine.length}` },
    { id: 'hallucination', label: 'Hallucination Control', icon: 'ri-mind-map', badge: `${avgHallucinationRate.toFixed(1)}%` },
    { id: 'sources', label: 'Vérification Sources', icon: 'ri-links-line', badge: `${verifiedSources}` },
    { id: 'kpis', label: 'KPI Dashboard', icon: 'ri-dashboard-3-line', badge: `${kpiAccuracyAvg.toFixed(1)}%` },
    { id: 'royalty', label: 'Royalty Engine', icon: 'ri-vip-crown-line', badge: 'ISO §8.2' },
    { id: 'bigfour', label: 'Big Four Prompts', icon: 'ri-shield-star-line', badge: '3×75 agents' },
    { id: 'digitaltwin', label: 'Digital Twin', icon: 'ri-radar-line', badge: '9.2/10' },
  ];

  return (
    <hubLayout hubId={9}>
      {/* Header */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold">
                  <i className="ri-shield-keyhole-line"></i>KOS Phase 5 — AI Governance & Ethics Command
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${isLive ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                  {isLive ? 'DONNÉES LIVE — SUPABASE' : 'DONNÉES MOCK — DÉMO'}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">AI Governance & Ethics Command</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Gouvernance avancée des 68 agents KOS selon ISO 42001, EU AI Act et standards internationaux.
                Registre, conformité, risques, éthique, traçabilité, validation workflow, prompt register, hallucination control, connaissances et sources — le cadre de confiance le plus complet pour l'IA en Afrique.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xl font-bold text-accent-600">{aiRegistry.length}</div>
                <div className="text-xs text-foreground-500">Agents Enregistrés</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xl font-bold text-emerald-600">{compliantCount}/{aiComplianceEngine.length}</div>
                <div className="text-xs text-foreground-500">Contrôles Conformes</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xl font-bold text-amber-600">{avgIso.toFixed(1)}/10</div>
                <div className="text-xs text-foreground-500">Alignement ISO 42001</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className={`text-xl font-bold ${avgHallucinationRate > 5 ? 'text-red-600' : avgHallucinationRate > 2 ? 'text-amber-600' : 'text-emerald-600'}`}>{avgHallucinationRate.toFixed(1)}%</div>
                <div className="text-xs text-foreground-500">Taux Hallucination</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
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
                {tab.badge && <span className="text-xs opacity-60">{tab.badge}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-8 h-8 border-2 border-accent-300 border-t-accent-600 rounded-full animate-spin"></div>
            <p className="text-sm text-foreground-500">Chargement des données AI Governance...</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600">
              <i className="ri-error-warning-line text-xl"></i>
            </div>
            <p className="text-sm text-foreground-600">{error}</p>
            <button onClick={refresh} className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-accent-100 text-accent-700 hover:bg-accent-200 transition-colors cursor-pointer">
              <i className="ri-refresh-line mr-1.5"></i>Réessayer
            </button>
          </div>
        )}

        {!loading && !error && (
        <>

        {/* ===== ONGLET 1 : REGISTRE IA ===== */}
        {activeTab === 'registry' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                  <i className="ri-archive-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS AI Registry™</h3>
                  <p className="text-xs text-foreground-500">{aiRegistry.length} agents — {prodCount} en production</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="p-2 rounded-lg bg-green-50/70 border border-green-100 text-center">
                  <div className="text-lg font-bold text-green-700">{aiRegistry.filter(a => a.risk_level === 'Faible').length}</div>
                  <div className="text-[10px] text-foreground-500">Faible</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-100 text-center">
                  <div className="text-lg font-bold text-amber-700">{aiRegistry.filter(a => a.risk_level === 'Moyen').length}</div>
                  <div className="text-[10px] text-foreground-500">Moyen</div>
                </div>
                <div className="p-2 rounded-lg bg-red-50/70 border border-red-100 text-center">
                  <div className="text-lg font-bold text-red-700">{aiRegistry.filter(a => a.risk_level === 'Élevé').length}</div>
                  <div className="text-[10px] text-foreground-500">Élevé</div>
                </div>
              </div>
              {aiRegistry.map((a) => (
                <div
                  key={a.id}
                  onClick={() => setSelectedAgent(a)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedAgent.id === a.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{a.model_provider.split('(')[0].trim()}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskLevelColor(a.risk_level)}`}>{a.risk_level}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{a.agent_name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-400">{a.version}</span>
                    <span className="text-xs text-foreground-500">{a.deployment_status}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedAgent.model_provider.split('(')[0].trim()}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskLevelColor(selectedAgent.risk_level)}`}>Risque {selectedAgent.risk_level}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedAgent.deployment_status === 'Production' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {selectedAgent.deployment_status}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-1">{selectedAgent.agent_name}</h2>
                <p className="text-sm text-foreground-500 mb-4">Version {selectedAgent.version} — Propriétaire : {selectedAgent.owner}</p>
                <div className="p-4 bg-accent-50/50 rounded-lg border border-accent-100 mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Description & Fonction</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedAgent.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-background-100 rounded-lg">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Dernier Audit</h4>
                    <p className="text-sm text-foreground-600">
                      {new Date(selectedAgent.last_audited).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-foreground-400 mt-1">Prochain audit : {new Date(new Date(selectedAgent.last_audited).getTime() + 90 * 86400000).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Gouvernance</h4>
                    <p className="text-sm text-foreground-600">Propriétaire : {selectedAgent.owner}</p>
                    <p className="text-xs text-foreground-400 mt-1">Enregistré le {new Date(selectedAgent.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 2 : CONFORMITÉ IA ===== */}
        {activeTab === 'compliance' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <i className="ri-check-double-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS AI Compliance Engine™</h3>
                  <p className="text-xs text-foreground-500">{compliantCount}/{aiComplianceEngine.length} contrôles conformes</p>
                </div>
              </div>
              {aiComplianceEngine.map((c) => {
                const agent = getAgentById(c.agent_id);
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCompliance(c)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedCompliance.id === c.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{c.standard.split('—')[0].trim()}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.is_compliant ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {c.is_compliant ? 'Conforme' : 'Non Conforme'}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950">{agent?.agent_name || `Agent #${c.agent_id}`}</h4>
                    <p className="text-xs text-foreground-500 mt-1 line-clamp-2">{c.compliance_check}</p>
                  </div>
                );
              })}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedCompliance.standard.split('—')[0].trim()}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedCompliance.is_compliant ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {selectedCompliance.is_compliant ? '✅ Conforme' : '❌ Non Conforme'}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">
                  {getAgentById(selectedCompliance.agent_id)?.agent_name || `Agent #${selectedCompliance.agent_id}`}
                </h2>
                <p className="text-sm text-foreground-500 mb-4">Contrôle : {selectedCompliance.compliance_check}</p>
                <div className="p-4 bg-primary-50/50 rounded-lg border border-primary-100 mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Standard Applicable</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedCompliance.standard}</p>
                </div>
                {!selectedCompliance.is_compliant && selectedCompliance.gap_description && (
                  <div className="p-4 bg-red-50/50 rounded-lg border border-red-100 mb-4">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Écart Détecté</h4>
                    <p className="text-sm text-foreground-600 leading-relaxed">{selectedCompliance.gap_description}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {!selectedCompliance.is_compliant && selectedCompliance.remediation_plan && (
                    <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                      <h4 className="text-sm font-semibold text-foreground-950 mb-2">Plan de Remédiation</h4>
                      <p className="text-sm text-foreground-600 leading-relaxed">{selectedCompliance.remediation_plan}</p>
                    </div>
                  )}
                  <div className="p-4 bg-background-100 rounded-lg">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Vérification</h4>
                    <p className="text-sm text-foreground-600">Vérifié par : <strong>{selectedCompliance.verified_by}</strong></p>
                    <p className="text-xs text-foreground-400 mt-1">
                      Le {new Date(selectedCompliance.verified_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 3 : RISQUES IA ===== */}
        {activeTab === 'risks' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-700">
                  <i className="ri-shield-flash-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS AI Risk Office™</h3>
                  <p className="text-xs text-foreground-500">{aiRiskOffice.length} risques — {highRiskCount} élevés</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="p-2 rounded-lg bg-green-50/70 border border-green-100 text-center">
                  <div className="text-lg font-bold text-green-700">{aiRiskOffice.filter(r => r.risk_level === 'Faible').length}</div>
                  <div className="text-[10px] text-foreground-500">Faible</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-100 text-center">
                  <div className="text-lg font-bold text-amber-700">{aiRiskOffice.filter(r => r.risk_level === 'Moyen').length}</div>
                  <div className="text-[10px] text-foreground-500">Moyen</div>
                </div>
                <div className="p-2 rounded-lg bg-red-50/70 border border-red-100 text-center">
                  <div className="text-lg font-bold text-red-700">{aiRiskOffice.filter(r => r.risk_level === 'Élevé').length}</div>
                  <div className="text-[10px] text-foreground-500">Élevé</div>
                </div>
              </div>
              {aiRiskOffice.map((r) => (
                <div
                  key={r.id}
                  onClick={() => setSelectedRisk(r)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedRisk.id === r.id ? 'border-red-300 bg-red-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{r.risk_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskLevelColor(r.risk_level)}`}>{r.risk_level}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{r.agent_name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">P={r.probability} × I={r.impact_score}</span>
                    <span className="text-xs font-bold text-foreground-950">{(r.probability * r.impact_score).toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedRisk.risk_type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskLevelColor(selectedRisk.risk_level)}`}>{selectedRisk.risk_level}</span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Évalué le {new Date(selectedRisk.last_assessed).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedRisk.agent_name}</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGaugeCircle(selectedRisk.probability * 10, 10, 44, selectedRisk.probability >= 0.15 ? '#ef4444' : selectedRisk.probability >= 0.10 ? '#f59e0b' : '#22c55e')}</div>
                    <div className="text-xs text-foreground-500 mt-1">Probabilité ({(selectedRisk.probability * 100).toFixed(0)}%)</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGaugeCircle(selectedRisk.impact_score, 10, 44, selectedRisk.impact_score >= 9 ? '#ef4444' : selectedRisk.impact_score >= 8 ? '#f59e0b' : '#22c55e')}</div>
                    <div className="text-xs text-foreground-500 mt-1">Impact ({selectedRisk.impact_score}/10)</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{(selectedRisk.probability * selectedRisk.impact_score).toFixed(1)}</div>
                    <div className="text-xs text-foreground-500">Score Risque</div>
                  </div>
                </div>
                <div className="p-4 bg-red-50/50 rounded-lg border border-red-100 mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Description du Risque</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedRisk.risk_description}</p>
                </div>
                <div className="p-4 bg-green-50/50 rounded-lg border border-green-100">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Mitigation</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedRisk.mitigation_status}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 4 : ÉTHIQUE IA ===== */}
        {activeTab === 'ethics' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <i className="ri-scales-3-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS AI Ethics Board™</h3>
                  <p className="text-xs text-foreground-500">{aiEthicsBoard.length} revues éthiques — {aiEthicsBoard.filter(e => e.decision.includes('Approuvé')).length} approuvées</p>
                </div>
              </div>
              {aiEthicsBoard.map((e) => (
                <div
                  key={e.id}
                  onClick={() => setSelectedEthics(e)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedEthics.id === e.id ? 'border-emerald-300 bg-emerald-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{e.ethical_dimension}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${e.bias_risk === 'Faible' || e.bias_risk === 'N/A' ? 'bg-green-100 text-green-700' : e.bias_risk === 'Moyen' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                      Biais {e.bias_risk}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{e.review_topic}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">Équité {e.fairness_score}/10</span>
                    <span className="text-xs text-foreground-400">{e.decision.split('—')[0].trim()}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedEthics.ethical_dimension}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(selectedEthics.decision)}`}>{selectedEthics.decision}</span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Revue le {new Date(selectedEthics.reviewed_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedEthics.review_topic}</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGaugeCircle(selectedEthics.fairness_score, 10, 44, selectedEthics.fairness_score >= 9 ? '#22c55e' : selectedEthics.fairness_score >= 8 ? '#f59e0b' : '#ef4444')}</div>
                    <div className="text-xs text-foreground-500 mt-1">Fairness</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGaugeCircle(selectedEthics.transparency_score, 10, 44, selectedEthics.transparency_score >= 9 ? '#22c55e' : selectedEthics.transparency_score >= 8 ? '#f59e0b' : '#ef4444')}</div>
                    <div className="text-xs text-foreground-500 mt-1">Transparence</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{selectedEthics.bias_risk}</div>
                    <div className="text-xs text-foreground-500">Risque Biais</div>
                  </div>
                </div>
                <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-100 mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Évaluation</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedEthics.assessment}</p>
                </div>
                <div className="p-4 bg-background-100 rounded-lg">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Décision</h4>
                  <p className="text-sm text-foreground-600">Par <strong>{selectedEthics.reviewed_by}</strong> — {selectedEthics.decision}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 5 : TRAÇABILITÉ IA ===== */}
        {activeTab === 'audit' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700">
                  <i className="ri-footprint-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS AI Audit Trail™</h3>
                  <p className="text-xs text-foreground-500">{aiAuditTrail.length} actions tracées — Traçabilité {avgTraceability.toFixed(1)}/10</p>
                </div>
              </div>
              {aiAuditTrail.map((a) => (
                <div
                  key={a.id}
                  onClick={() => setSelectedAudit(a)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedAudit.id === a.id ? 'border-secondary-300 bg-secondary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{a.action_type}</span>
                    <span className="text-sm font-bold text-foreground-950">{a.traceability_score.toFixed(1)}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{a.agent_name}</h4>
                  <p className="text-xs text-foreground-500 mt-1 line-clamp-1">
                    {new Date(a.timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedAudit.action_type}</span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    {new Date(selectedAudit.timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedAudit.agent_name}</h2>
                <p className="text-sm text-foreground-500 mb-4">Action : {selectedAudit.action_type}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Input</h4>
                    <p className="text-sm text-foreground-600 leading-relaxed">{selectedAudit.input_summary}</p>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Output</h4>
                    <p className="text-sm text-foreground-600 leading-relaxed">{selectedAudit.output_summary}</p>
                  </div>
                </div>
                <div className="p-4 bg-secondary-50/50 rounded-lg border border-secondary-100 mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Logique de Décision</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedAudit.decision_rationale}</p>
                </div>
                <div className="flex items-center justify-between p-4 bg-background-100 rounded-lg">
                  <span className="text-xs text-foreground-500">Score de Traçabilité</span>
                  <span className="text-lg font-bold text-secondary-600">{selectedAudit.traceability_score.toFixed(1)}/10</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 6 : CONSEIL GOUVERNANCE ===== */}
        {activeTab === 'council' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                  <i className="ri-government-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS AI Governance Council™</h3>
                  <p className="text-xs text-foreground-500">{aiGovernanceCouncil.length} agents — ISO 42001 {avgIso.toFixed(1)}/10</p>
                </div>
              </div>
              {aiGovernanceCouncil.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCouncil(c)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedCouncil.id === c.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap">{statusColor(c.compliance_status)}</span>
                    <span className="text-sm font-bold text-foreground-950">ISO {c.iso_42001_alignment.toFixed(1)}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{c.agent_name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">Qualité {c.quality_score.toFixed(1)}</span>
                    <span className="text-xs text-foreground-400">Transparence {c.transparency_score.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(selectedCouncil.compliance_status)}`}>{selectedCouncil.compliance_status}</span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Dernière revue : {new Date(selectedCouncil.last_review_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedCouncil.agent_name}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Qualité', val: selectedCouncil.quality_score },
                    { label: 'ISO 42001', val: selectedCouncil.iso_42001_alignment },
                    { label: 'Transparence', val: selectedCouncil.transparency_score },
                    { label: 'Sécurité', val: selectedCouncil.security_audit_result.includes('Aucune') ? 9.5 : selectedCouncil.security_audit_result.includes('mineure') ? 8.0 : 7.0 }
                  ].map((d) => (
                    <div key={d.label} className="p-3 bg-background-100 rounded-lg text-center">
                      <div className="flex justify-center">{renderGaugeCircle(d.val, 10, 40, d.val >= 9 ? '#22c55e' : d.val >= 8 ? '#06b6d4' : d.val >= 7 ? '#f59e0b' : '#ef4444')}</div>
                      <div className="text-xs text-foreground-500 mt-1">{d.label}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-background-100 rounded-lg mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Audit Sécurité</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedCouncil.security_audit_result}</p>
                </div>
                <div className="p-4 bg-accent-50/50 rounded-lg border border-accent-100 mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Cadre de Responsabilité</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedCouncil.accountability_framework}</p>
                </div>
                {selectedCouncil.required_actions.length > 0 && (
                  <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Actions Requises ({selectedCouncil.required_actions.length})</h4>
                    <ul className="space-y-1">
                      {selectedCouncil.required_actions.map((action, idx) => (
                        <li key={idx} className="text-sm text-foreground-600 flex items-start gap-2">
                          <i className="ri-arrow-right-line text-amber-500 mt-0.5 text-xs"></i>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 7 : PROMPT REGISTER (ENRICHED) ===== */}
        {activeTab === 'prompts' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <i className="ri-chat-quote-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Prompt Register™</h3>
                  <p className="text-xs text-foreground-500">{promptQualityOffice.length} prompts — {(promptQualityOffice.reduce((s, p) => s + p.clarity_score + p.specificity_score + p.safety_score + p.effectiveness_score, 0) / (promptQualityOffice.length * 4)).toFixed(1)}/10 qualité</p>
                </div>
              </div>
              <div className="relative mb-3">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
                <input type="text" placeholder="Rechercher un prompt..." className="w-full pl-9 pr-3 py-2 text-sm bg-background-50 border border-background-200/70 rounded-lg focus:outline-none focus:border-accent-300 text-foreground-950" />
              </div>
              {promptQualityOffice.map((p) => (
                <div
                  key={p.id}
                  onClick={() => { setSelectedPrompt(p); setExpandedChangeLog(null); }}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedPrompt.id === p.id ? 'border-amber-300 bg-amber-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">
                      {p.version}
                    </span>
                    <span className="text-sm font-bold text-foreground-950">{((p.clarity_score + p.specificity_score + p.safety_score + p.effectiveness_score) / 4).toFixed(1)}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-1">{p.prompt_name}</h4>
                  <p className="text-xs text-foreground-400 mt-1">{p.author}</p>
                  <div className="mt-2">{renderScoreBar((p.clarity_score + p.specificity_score + p.safety_score + p.effectiveness_score) / 4 * 10, 100, 'bg-amber-500')}</div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">
                    {getAgentById(selectedPrompt.agent_id)?.agent_name || `Agent #${selectedPrompt.agent_id}`}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-medium">{selectedPrompt.version}</span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Créé le {new Date(selectedPrompt.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-1">{selectedPrompt.prompt_name}</h2>
                <div className="flex items-center gap-3 text-xs text-foreground-500 mb-4 flex-wrap">
                  <span><i className="ri-user-line mr-1"></i><strong>Auteur :</strong> {selectedPrompt.author}</span>
                  <span><i className="ri-calendar-check-line mr-1"></i><strong>Dernière revue :</strong> {new Date(selectedPrompt.reviewed_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="p-4 bg-background-100 rounded-lg mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Objectif (Purpose)</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedPrompt.purpose}</p>
                </div>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Clarté', val: selectedPrompt.clarity_score },
                    { label: 'Spécificité', val: selectedPrompt.specificity_score },
                    { label: 'Safety', val: selectedPrompt.safety_score },
                    { label: 'Efficacité', val: selectedPrompt.effectiveness_score }
                  ].map((d) => (
                    <div key={d.label} className="p-3 bg-background-100 rounded-lg text-center">
                      <div className="flex justify-center">{renderGaugeCircle(d.val, 10, 40, d.val >= 9 ? '#22c55e' : d.val >= 8 ? '#f59e0b' : '#ef4444')}</div>
                      <div className="text-xs text-foreground-500 mt-1">{d.label}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100 mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Issues Détectées</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedPrompt.issues_found}</p>
                </div>
                {/* Change Log */}
                {selectedPrompt.change_log && selectedPrompt.change_log.length > 0 && (
                  <div className="border border-background-200/70 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedChangeLog(expandedChangeLog === selectedPrompt.id ? null : selectedPrompt.id)}
                      className="w-full flex items-center justify-between p-4 bg-background-100 hover:bg-background-200/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <i className="ri-git-branch-line text-accent-500"></i>
                        <span className="text-sm font-semibold text-foreground-950">Historique des versions ({selectedPrompt.change_log.length})</span>
                      </div>
                      {expandedChangeLog === selectedPrompt.id ? <i className="ri-arrow-up-s-line text-foreground-400"></i> : <i className="ri-arrow-down-s-line text-foreground-400"></i>}
                    </button>
                    {expandedChangeLog === selectedPrompt.id && (
                      <div className="p-4 space-y-3">
                        {[...selectedPrompt.change_log].reverse().map((cl, idx) => (
                          <div key={idx} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-accent-500 ring-2 ring-accent-200' : 'bg-background-300'}`}></div>
                              {idx < selectedPrompt.change_log.length - 1 && <div className="w-px flex-1 bg-background-200/70"></div>}
                            </div>
                            <div className="flex-1 pb-3">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs px-1.5 py-0.5 rounded bg-accent-100 text-accent-700 font-bold">{cl.version}</span>
                                <span className="text-xs text-foreground-400">{new Date(cl.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                <span className="text-xs text-foreground-500">— {cl.author}</span>
                              </div>
                              <p className="text-sm text-foreground-600">{cl.changes}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 8 : AI VALIDATION WORKFLOW ===== */}
        {activeTab === 'validation' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <i className="ri-task-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS AI Validation Workflow™</h3>
                  <p className="text-xs text-foreground-500">{approvedValidations}/{aiValidationWorkflow.length} workflows approuvés</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="p-2 rounded-lg bg-green-50/70 border border-green-100 text-center">
                  <div className="text-lg font-bold text-green-700">{aiValidationWorkflow.filter(v => v.overall_status === 'approved').length}</div>
                  <div className="text-[10px] text-foreground-500">Approuvés</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-100 text-center">
                  <div className="text-lg font-bold text-amber-700">{aiValidationWorkflow.filter(v => v.overall_status === 'in_review').length}</div>
                  <div className="text-[10px] text-foreground-500">En Cours</div>
                </div>
                <div className="p-2 rounded-lg bg-red-50/70 border border-red-100 text-center">
                  <div className="text-lg font-bold text-red-700">{aiValidationWorkflow.filter(v => v.overall_status === 'rejected').length}</div>
                  <div className="text-[10px] text-foreground-500">Rejetés</div>
                </div>
              </div>
              {aiValidationWorkflow.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedValidation(v)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedValidation.id === v.id ? 'border-emerald-300 bg-emerald-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">
                      {v.validation_type === 'pre_deployment' ? 'Pré-déploiement' : v.validation_type === 'post_update' ? 'Post-màj' : v.validation_type === 'periodic_review' ? 'Revue périodique' : 'Revue output'}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${
                      v.overall_status === 'approved' ? 'bg-green-500' : v.overall_status === 'in_review' ? 'bg-amber-500 animate-pulse' : 'bg-red-500'
                    }`}></span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{v.agent_name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      v.overall_status === 'approved' ? 'bg-green-100 text-green-700' : v.overall_status === 'in_review' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>{v.overall_status === 'approved' ? '✓ Approuvé' : v.overall_status === 'in_review' ? '⟳ En revue' : '✗ Rejeté'}</span>
                    <span className="text-xs text-foreground-400">{v.stage_results.filter(s => s.result === 'pass').length}/{v.stage_results.length} étapes</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">
                    {selectedValidation.validation_type === 'pre_deployment' ? 'Pré-déploiement' : selectedValidation.validation_type === 'post_update' ? 'Post-mise à jour' : selectedValidation.validation_type === 'periodic_review' ? 'Revue périodique' : 'Revue output'}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    selectedValidation.overall_status === 'approved' ? 'bg-green-100 text-green-700' : selectedValidation.overall_status === 'in_review' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>{selectedValidation.overall_status === 'approved' ? 'Approuvé' : selectedValidation.overall_status === 'in_review' ? 'En cours de revue' : 'Rejeté'}</span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Soumis le {new Date(selectedValidation.submission_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedValidation.agent_name}</h2>
                <p className="text-sm text-foreground-500 mb-4">Soumis par <strong>{selectedValidation.submitted_by}</strong></p>

                {/* Critères de validation */}
                <div className="p-4 bg-background-100 rounded-lg mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-3">Critères de Validation ({selectedValidation.validation_criteria.length})</h4>
                  <ul className="space-y-2">
                    {selectedValidation.validation_criteria.map((criterion, idx) => (
                      <li key={idx} className="text-sm text-foreground-600 flex items-start gap-2">
                        <i className="ri-checkbox-circle-line text-emerald-500 mt-0.5 text-xs"></i>
                        {criterion}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pipeline de validation */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-3">Pipeline de Validation — 5 Gates</h4>
                  <div className="space-y-3">
                    {selectedValidation.stage_results.map((stage, idx) => (
                      <div key={idx} className={`p-4 rounded-lg border ${
                        stage.result === 'pass' ? 'border-green-200 bg-green-50/30' : stage.result === 'fail' ? 'border-red-200 bg-red-50/30' : 'border-amber-200 bg-amber-50/30'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              stage.result === 'pass' ? 'bg-green-500 text-white' : stage.result === 'fail' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'
                            }`}>{idx + 1}</div>
                            <span className="text-sm font-semibold text-foreground-950">{stage.stage}</span>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            stage.result === 'pass' ? 'bg-green-100 text-green-700' : stage.result === 'fail' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                          }`}>{stage.result === 'pass' ? '✓ Pass' : stage.result === 'fail' ? '✗ Fail' : '⟳ Pending'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-foreground-500 mb-1">
                          <i className="ri-user-line"></i><span>{stage.reviewer}</span>
                          {stage.date && <><span>·</span><i className="ri-calendar-line"></i><span>{new Date(stage.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span></>}
                        </div>
                        <p className="text-sm text-foreground-600">{stage.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Artifacts */}
                <div className="p-4 bg-background-100 rounded-lg">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-3">Artifacts ({selectedValidation.artifacts.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedValidation.artifacts.map((artifact, idx) => (
                      <span key={idx} className="text-xs px-3 py-1.5 rounded-full bg-accent-100 text-accent-700 font-medium flex items-center gap-1.5">
                        <i className="ri-file-text-line text-xs"></i>
                        {artifact}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 9 : VALIDATION CONNAISSANCES ===== */}
        {activeTab === 'knowledge' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <i className="ri-brain-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Knowledge Validation Engine™</h3>
                  <p className="text-xs text-foreground-500">{knowledgeValidationEngine.length} items — {validKnowledge}/{knowledgeValidationEngine.length} validés</p>
                </div>
              </div>
              {knowledgeValidationEngine.map((k) => (
                <div
                  key={k.id}
                  onClick={() => setSelectedKnowledge(k)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedKnowledge.id === k.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{k.source.split('—')[0].trim()}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(k.validation_status)}`}>{k.validation_status}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{k.knowledge_item}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">Précision {k.accuracy_score}/10</span>
                    <span className="text-xs text-foreground-400">Pertinence {k.relevance_score}/10</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedKnowledge.source.split('—')[0].trim()}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(selectedKnowledge.validation_status)}`}>{selectedKnowledge.validation_status}</span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Validé le {new Date(selectedKnowledge.validated_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedKnowledge.knowledge_item}</h2>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Accuracy', val: selectedKnowledge.accuracy_score },
                    { label: 'Currency', val: selectedKnowledge.currency_score },
                    { label: 'Relevance', val: selectedKnowledge.relevance_score }
                  ].map((d) => (
                    <div key={d.label} className="p-3 bg-background-100 rounded-lg text-center">
                      <div className="flex justify-center">{renderGaugeCircle(d.val, 10, 40, d.val >= 9 ? '#22c55e' : d.val >= 8 ? '#f59e0b' : '#ef4444')}</div>
                      <div className="text-xs text-foreground-500 mt-1">{d.label}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-background-100 rounded-lg mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Source</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedKnowledge.source}</p>
                </div>
                <div className="p-4 bg-primary-50/50 rounded-lg border border-primary-100">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Notes du Validateur</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedKnowledge.validator_notes}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 10 : HALLUCINATION CONTROL FRAMEWORK ===== */}
        {activeTab === 'hallucination' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                  <i className="ri-mind-map text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Hallucination Control Framework™</h3>
                  <p className="text-xs text-foreground-500">{totalOutputsChecked} outputs — {totalHallucinations} hallucinations — {avgHallucinationRate.toFixed(1)}%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="p-2 rounded-lg bg-red-50/70 border border-red-100 text-center">
                  <div className="text-lg font-bold text-red-700">{avgHallucinationRate.toFixed(1)}%</div>
                  <div className="text-[10px] text-foreground-500">Taux moyen</div>
                </div>
                <div className="p-2 rounded-lg bg-green-50/70 border border-green-100 text-center">
                  <div className="text-lg font-bold text-green-700">{avgControlEffectiveness.toFixed(1)}/10</div>
                  <div className="text-[10px] text-foreground-500">Efficacité</div>
                </div>
              </div>
              {hallucinationControlFramework.map((h) => (
                <div
                  key={h.id}
                  onClick={() => setSelectedHallucination(h)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedHallucination.id === h.id ? 'border-purple-300 bg-purple-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">
                      {h.detection_method === 'source_verification' ? 'Vérif. Sources' : h.detection_method === 'cross_reference' ? 'Cross-ref' : h.detection_method === 'confidence_scoring' ? 'Score Confiance' : 'Cohérence'}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      h.hallucination_rate === 0 ? 'bg-green-100 text-green-700' : h.hallucination_rate < 3 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>{h.hallucination_rate}%</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{h.agent_name}</h4>
                  <div className="mt-2">{renderScoreBar(h.control_effectiveness_score * 10, 100, h.control_effectiveness_score >= 9 ? 'bg-green-500' : h.control_effectiveness_score >= 7 ? 'bg-amber-500' : 'bg-red-500')}</div>
                  <div className="flex items-center justify-between mt-2 text-xs text-foreground-500">
                    <span>{h.hallucinations_detected}/{h.total_outputs_checked} outputs</span>
                    <span>Seuil {h.confidence_threshold}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">
                    {selectedHallucination.detection_method === 'source_verification' ? 'Vérification Sources' : selectedHallucination.detection_method === 'cross_reference' ? 'Référencement Croisé' : selectedHallucination.detection_method === 'confidence_scoring' ? 'Scoring de Confiance' : 'Cohérence Factuelle'}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    selectedHallucination.hallucination_rate === 0 ? 'bg-green-100 text-green-700' : selectedHallucination.hallucination_rate < 3 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>{selectedHallucination.hallucination_rate}% hallucinations</span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Dernier scan : {new Date(selectedHallucination.last_scan_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedHallucination.agent_name}</h2>

                {/* KPIs grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-xl font-bold text-foreground-950">{selectedHallucination.total_outputs_checked}</div>
                    <div className="text-xs text-foreground-500">Outputs Vérifiés</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-xl font-bold text-red-600">{selectedHallucination.hallucinations_detected}</div>
                    <div className="text-xs text-foreground-500">Hallucinations</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-xl font-bold text-amber-600">{selectedHallucination.hallucination_rate}%</div>
                    <div className="text-xs text-foreground-500">Taux Hallucination</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-xl font-bold text-foreground-950">{selectedHallucination.false_positive_rate}%</div>
                    <div className="text-xs text-foreground-500">Faux Positifs</div>
                  </div>
                </div>

                {/* Severity distribution */}
                <div className="p-4 bg-background-100 rounded-lg mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-3">Distribution par Sévérité</h4>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { label: 'Critique', val: selectedHallucination.severity_distribution.critical, color: 'bg-red-500' },
                      { label: 'Majeure', val: selectedHallucination.severity_distribution.major, color: 'bg-orange-500' },
                      { label: 'Mineure', val: selectedHallucination.severity_distribution.minor, color: 'bg-amber-500' },
                      { label: 'Négligeable', val: selectedHallucination.severity_distribution.negligible, color: 'bg-secondary-400' }
                    ].map((d) => (
                      <div key={d.label} className="text-center">
                        <div className="text-lg font-bold text-foreground-950">{d.val}</div>
                        <div className="flex items-center gap-1.5 justify-center mt-1">
                          <div className={`w-2 h-2 rounded-full ${d.color}`}></div>
                          <span className="text-[10px] text-foreground-500">{d.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Control effectiveness */}
                <div className="p-4 bg-background-100 rounded-lg mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-3">Efficacité du Contrôle</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex justify-center">{renderGaugeCircle(selectedHallucination.control_effectiveness_score, 10, 56, selectedHallucination.control_effectiveness_score >= 9 ? '#22c55e' : selectedHallucination.control_effectiveness_score >= 7 ? '#f59e0b' : '#ef4444')}</div>
                    <div>
                      <div className="text-sm text-foreground-600 mb-1">Seuil de confiance : <strong>{selectedHallucination.confidence_threshold}</strong></div>
                      <div className="text-sm text-foreground-600">Méthode : <strong>{selectedHallucination.detection_method === 'source_verification' ? 'Vérification Sources' : selectedHallucination.detection_method === 'cross_reference' ? 'Référencement Croisé' : selectedHallucination.detection_method === 'confidence_scoring' ? 'Scoring de Confiance' : 'Cohérence Factuelle'}</strong></div>
                    </div>
                  </div>
                </div>

                {/* Mitigation */}
                <div className={`p-4 rounded-lg border ${selectedHallucination.hallucination_rate > 10 ? 'bg-red-50/50 border-red-200' : selectedHallucination.hallucination_rate > 3 ? 'bg-amber-50/50 border-amber-200' : 'bg-green-50/50 border-green-200'}`}>
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">
                    {selectedHallucination.hallucination_rate > 10 ? '⚠️ Statut Mitigation — ALERTE' : selectedHallucination.hallucination_rate > 3 ? 'Statut Mitigation — ACTIF' : 'Statut Mitigation — MAÎTRISÉ'}
                  </h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedHallucination.mitigation_status}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 11 : VÉRIFICATION SOURCES ===== */}
        {activeTab === 'sources' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700">
                  <i className="ri-links-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Source Verification Engine™</h3>
                  <p className="text-xs text-foreground-500">{sourceVerificationEngine.length} sources — {verifiedSources} vérifiées</p>
                </div>
              </div>
              {sourceVerificationEngine.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSource(s)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedSource.id === s.id ? 'border-secondary-300 bg-secondary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${authLevelColor(s.authority_level)}`}>{s.authority_level}</span>
                    <span className="text-sm font-bold text-foreground-950">{s.trust_score.toFixed(1)}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-1">{s.source_title}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(s.verification_status)}`}>{s.verification_status}</span>
                    <span className="text-xs text-foreground-400">{new Date(s.last_verified).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${authLevelColor(selectedSource.authority_level)}`}>{selectedSource.authority_level}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(selectedSource.verification_status)}`}>{selectedSource.verification_status}</span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Dernière vérification : {new Date(selectedSource.last_verified).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedSource.source_title}</h2>
                <p className="text-sm text-foreground-400 break-all mb-4">{selectedSource.source_url}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGaugeCircle(selectedSource.trust_score, 10, 44, selectedSource.trust_score >= 9.5 ? '#22c55e' : selectedSource.trust_score >= 8 ? '#06b6d4' : '#f59e0b')}</div>
                    <div className="text-xs text-foreground-500 mt-1">Score de Confiance</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedSource.authority_level}</div>
                    <div className="text-xs text-foreground-500">Niveau d'Autorité</div>
                  </div>
                </div>
                <div className="p-4 bg-secondary-50/50 rounded-lg border border-secondary-100">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Évaluation des Biais</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedSource.bias_assessment}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 12 : MODEL REGISTER ===== */}
        {activeTab === 'models' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                  <i className="ri-cpu-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Model Registry™</h3>
                  <p className="text-xs text-foreground-500">{modelRegistry.length} modèles — {internalModels} internes, {externalModels} externes</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100 text-center">
                  <div className="text-lg font-bold text-emerald-700">{internalModels}</div>
                  <div className="text-[10px] text-foreground-500">KHEPRA Internal</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-100 text-center">
                  <div className="text-lg font-bold text-amber-700">{externalModels}</div>
                  <div className="text-[10px] text-foreground-500">API Externes</div>
                </div>
              </div>
              {modelRegistry.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedModel(m)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedModel.id === m.id ? 'border-teal-300 bg-teal-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{m.model_type.split('—')[0].trim()}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${m.provider.includes('KHEPRA') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {m.provider.includes('KHEPRA') ? 'Interne' : 'Externe'}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-1">{m.model_name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-400">{m.version}</span>
                    <span className="text-xs font-bold text-foreground-950">{m.accuracy_score}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedModel.model_type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedModel.provider.includes('KHEPRA') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {selectedModel.provider}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedModel.risk_classification.includes('High') ? 'bg-red-100 text-red-700' : selectedModel.risk_classification.includes('Limited') ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                    {selectedModel.risk_classification}
                  </span>
                  <span className="text-xs text-foreground-400 ml-auto">{selectedModel.status}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-1">{selectedModel.model_name}</h2>
                <p className="text-sm text-foreground-500 mb-4">Version {selectedModel.version} — Déployé le {new Date(selectedModel.deployment_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <div className="p-4 bg-teal-50/50 rounded-lg border border-teal-100 mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Description</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedModel.description}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedModel.accuracy_score}%</div>
                    <div className="text-xs text-foreground-500">Exactitude</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedModel.latency_ms}ms</div>
                    <div className="text-xs text-foreground-500">Latence</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedModel.cost_per_1k_tokens === 0 ? 'Gratuit' : `$${selectedModel.cost_per_1k_tokens}`}</div>
                    <div className="text-xs text-foreground-500">Coût/1K tokens</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedModel.agent_ids.length || 'N/A'}</div>
                    <div className="text-xs text-foreground-500">Agents liés</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-background-100 rounded-lg">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Architecture</h4>
                    <p className="text-sm text-foreground-600">{selectedModel.architecture}</p>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Paramètres</h4>
                    <p className="text-sm text-foreground-600">{selectedModel.parameters_count}</p>
                  </div>
                </div>
                <div className="p-4 bg-background-100 rounded-lg mt-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Données d'Entraînement</h4>
                  <p className="text-sm text-foreground-600">{selectedModel.training_data}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 13 : STANDARDS ALIGNMENT (ISO 42001 × NIST AI RMF × OCDE IA) ===== */}
        {activeTab === 'standards' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-shield-check-line text-lg"></i></div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">ISO 42001</h3>
                    <p className="text-xs text-foreground-500">AI Management System</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-accent-600">{(standardsAlignment.reduce((s, a) => s + a.iso_42001_score, 0) / standardsAlignment.length).toFixed(1)}<span className="text-sm font-normal text-foreground-400">/10</span></div>
                <div className="text-xs text-foreground-500 mt-1">Score moyen — 8 agents</div>
              </div>
              <div className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className="ri-shield-user-line text-lg"></i></div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">NIST AI RMF</h3>
                    <p className="text-xs text-foreground-500">Govern · Map · Measure · Manage</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary-600">{avgNistScore.toFixed(1)}<span className="text-sm font-normal text-foreground-400">/10</span></div>
                <div className="text-xs text-foreground-500 mt-1">Score moyen — 4 fonctions NIST</div>
              </div>
              <div className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700"><i className="ri-earth-line text-lg"></i></div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">OCDE IA</h3>
                    <p className="text-xs text-foreground-500">5 Principes</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-emerald-600">{avgOecdScore.toFixed(1)}<span className="text-sm font-normal text-foreground-400">/10</span></div>
                <div className="text-xs text-foreground-500 mt-1">Score moyen — 5 principes</div>
              </div>
            </div>
            <div className="bg-background-50 rounded-lg border border-background-200/70 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left p-3 font-semibold text-foreground-950 text-xs">Agent</th>
                      <th className="text-center p-3 font-semibold text-foreground-950 text-xs">ISO 42001</th>
                      <th className="text-center p-3 font-semibold text-foreground-950 text-xs">NIST AI RMF</th>
                      <th className="text-center p-3 font-semibold text-foreground-950 text-xs">OCDE IA</th>
                      <th className="text-center p-3 font-semibold text-foreground-950 text-xs">Global</th>
                      <th className="text-left p-3 font-semibold text-foreground-950 text-xs">Gaps</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...standardsAlignment].sort((a, b) => b.overall_alignment - a.overall_alignment).map((s) => (
                      <tr
                        key={s.id}
                        onClick={() => setSelectedStandard(s)}
                        className={`border-t border-background-200/70 cursor-pointer transition-colors ${selectedStandard.id === s.id ? 'bg-accent-50/50' : 'hover:bg-background-100'}`}
                      >
                        <td className="p-3">
                          <div className="text-sm font-semibold text-foreground-950">{s.agent_name}</div>
                          <div className="text-xs text-foreground-400">{s.iso_42001_clause}</div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center">{renderGaugeCircle(s.iso_42001_score, 10, 32, s.iso_42001_score >= 9 ? '#22c55e' : s.iso_42001_score >= 8 ? '#f59e0b' : '#ef4444')}</div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center">{renderGaugeCircle(s.nist_rmf_score, 10, 32, s.nist_rmf_score >= 9 ? '#22c55e' : s.nist_rmf_score >= 8 ? '#f59e0b' : '#ef4444')}</div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center">{renderGaugeCircle(s.oecd_score, 10, 32, s.oecd_score >= 9 ? '#22c55e' : s.oecd_score >= 8 ? '#f59e0b' : '#ef4444')}</div>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`text-sm font-bold ${s.overall_alignment >= 9 ? 'text-emerald-600' : s.overall_alignment >= 8 ? 'text-amber-600' : 'text-red-600'}`}>{s.overall_alignment.toFixed(1)}</span>
                        </td>
                        <td className="p-3">
                          <p className="text-xs text-foreground-500 line-clamp-2">{s.gaps}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Detail du standard selectionne */}
            {selectedStandard && (
              <div className="bg-background-50 rounded-lg border border-accent-200 p-6">
                <h3 className="text-sm font-bold text-foreground-950 mb-4">Détail — {selectedStandard.agent_name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-accent-50/50 rounded-lg border border-accent-100">
                    <h4 className="text-xs font-bold text-foreground-950 mb-2">ISO 42001 — {selectedStandard.iso_42001_score}/10</h4>
                    <p className="text-xs text-foreground-600">{selectedStandard.iso_42001_clause}</p>
                  </div>
                  <div className="p-4 bg-primary-50/50 rounded-lg border border-primary-100">
                    <h4 className="text-xs font-bold text-foreground-950 mb-2">NIST AI RMF — {selectedStandard.nist_rmf_score}/10</h4>
                    <p className="text-xs text-foreground-600">{selectedStandard.nist_rmf_category}</p>
                    <p className="text-xs text-foreground-400 mt-1">{selectedStandard.nist_rmf_subcategory}</p>
                  </div>
                  <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-100">
                    <h4 className="text-xs font-bold text-foreground-950 mb-2">OCDE IA — {selectedStandard.oecd_score}/10</h4>
                    <p className="text-xs text-foreground-600">{selectedStandard.oecd_principle}</p>
                  </div>
                </div>
                <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100 mt-4">
                  <h4 className="text-xs font-bold text-foreground-950 mb-2">Gaps & Actions</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedStandard.gaps}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== ONGLET 14 : BIAS CONTROL FRAMEWORK ===== */}
        {activeTab === 'bias' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                  <i className="ri-scales-3-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Bias Control Framework™</h3>
                  <p className="text-xs text-foreground-500">{biasControlFramework.length} contrôles — {highBiasCount} élevés — Score moyen {avgBiasScore.toFixed(1)}/10</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="p-2 rounded-lg bg-green-50/70 border border-green-100 text-center">
                  <div className="text-lg font-bold text-green-700">{biasControlFramework.filter(b => b.severity === 'Faible' || b.severity === 'Négligeable').length}</div>
                  <div className="text-[10px] text-foreground-500">Faible</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-100 text-center">
                  <div className="text-lg font-bold text-amber-700">{biasControlFramework.filter(b => b.severity === 'Moyen').length}</div>
                  <div className="text-[10px] text-foreground-500">Moyen</div>
                </div>
                <div className="p-2 rounded-lg bg-red-50/70 border border-red-100 text-center">
                  <div className="text-lg font-bold text-red-700">{biasControlFramework.filter(b => b.severity === 'Élevé').length}</div>
                  <div className="text-[10px] text-foreground-500">Élevé</div>
                </div>
              </div>
              {biasControlFramework.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBias(b)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedBias.id === b.id ? 'border-orange-300 bg-orange-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{b.bias_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      b.severity === 'Élevé' ? 'bg-red-100 text-red-700' : b.severity === 'Moyen' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                    }`}>{b.severity}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{b.agent_name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-400">{b.audit_frequency}</span>
                    <span className="text-sm font-bold text-foreground-950">{b.bias_score.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedBias.bias_type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    selectedBias.severity === 'Élevé' ? 'bg-red-100 text-red-700' : selectedBias.severity === 'Moyen' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                  }`}>Sévérité {selectedBias.severity}</span>
                  <span className="text-xs text-foreground-400 ml-auto">Audit : {selectedBias.audit_frequency}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedBias.agent_name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Méthode de Détection</h4>
                    <p className="text-sm text-foreground-600">{selectedBias.detection_method}</p>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGaugeCircle(10 - selectedBias.bias_score, 10, 44, selectedBias.bias_score >= 6 ? '#ef4444' : selectedBias.bias_score >= 4 ? '#f59e0b' : '#22c55e')}</div>
                    <div className="text-xs text-foreground-500 mt-1">Score de Biais ({selectedBias.bias_score}/10)</div>
                  </div>
                </div>
                <div className="p-4 bg-red-50/50 rounded-lg border border-red-100 mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Groupes Affectés</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedBias.affected_groups}</p>
                </div>
                <div className={`p-4 rounded-lg border ${selectedBias.severity === 'Élevé' ? 'bg-orange-50/50 border-orange-200' : 'bg-green-50/50 border-green-200'}`}>
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">
                    {selectedBias.severity === 'Élevé' ? '⚠️ Statut Mitigation — URGENT' : 'Statut Mitigation — ACTIF'}
                  </h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedBias.mitigation_status}</p>
                </div>
                <div className="flex items-center justify-between mt-4 p-3 bg-background-100 rounded-lg">
                  <span className="text-xs text-foreground-500">Dernier audit : {new Date(selectedBias.last_audit).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span className="text-xs text-foreground-400">Fréquence : {selectedBias.audit_frequency}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 15 : KPI DASHBOARD ===== */}
        {activeTab === 'kpis' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700"><i className="ri-check-double-line text-lg"></i></div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">Exactitude</h3>
                    <p className="text-xs text-foreground-500">Moyenne agents</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-emerald-600">{kpiAccuracyAvg.toFixed(1)}<span className="text-sm font-normal text-foreground-400">%</span></div>
                <div className="text-xs text-foreground-500 mt-1">{governanceKPIs.filter(k => k.metric_category === 'accuracy').length} métriques</div>
              </div>
              <div className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-shield-check-line text-lg"></i></div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">Conformité</h3>
                    <p className="text-xs text-foreground-500">Moyenne normes</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-accent-600">{kpiComplianceAvg.toFixed(1)}<span className="text-sm font-normal text-foreground-400">%</span></div>
                <div className="text-xs text-foreground-500 mt-1">{governanceKPIs.filter(k => k.metric_category === 'compliance').length} métriques</div>
              </div>
              <div className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-100 text-red-700"><i className="ri-error-warning-line text-lg"></i></div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">Taux d'Erreur</h3>
                    <p className="text-xs text-foreground-500">Moyenne</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-red-600">{kpiErrorAvg.toFixed(1)}<span className="text-sm font-normal text-foreground-400">%</span></div>
                <div className="text-xs text-foreground-500 mt-1">{governanceKPIs.filter(k => k.metric_category === 'error_rate').length} métriques</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {governanceKPIs.map((k) => (
                <div
                  key={k.id}
                  onClick={() => setSelectedKPI(k)}
                  className={`p-5 rounded-lg border cursor-pointer transition-colors ${
                    selectedKPI.id === k.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      k.metric_category === 'accuracy' ? 'bg-emerald-100 text-emerald-700' : k.metric_category === 'compliance' ? 'bg-accent-100 text-accent-700' : 'bg-red-100 text-red-700'
                    }`}>{k.metric_category === 'accuracy' ? 'Exactitude' : k.metric_category === 'compliance' ? 'Conformité' : 'Erreur'}</span>
                    <span className={`text-xs flex items-center gap-1 font-medium ${
                      k.trend === 'up' && k.metric_category === 'error_rate' ? 'text-red-600' : k.trend === 'up' ? 'text-emerald-600' : k.trend === 'down' && k.metric_category !== 'error_rate' ? 'text-red-600' : 'text-emerald-600'
                    }`}>
                      <i className={`${k.trend === 'up' ? 'ri-arrow-up-line' : k.trend === 'down' ? 'ri-arrow-down-line' : 'ri-subtract-line'} text-xs`}></i>
                      {k.trend_pct > 0 ? '+' : ''}{k.trend_pct}{k.unit === '%' ? ' pt' : k.unit === 'ms' ? ' ms' : ''}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">{k.metric_name}</h4>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-2xl font-bold text-foreground-950">{k.current_value}</span>
                      <span className="text-sm text-foreground-400 ml-1">{k.unit}</span>
                    </div>
                    <span className="text-xs text-foreground-400">Cible : {k.target_value}{k.unit}</span>
                  </div>
                  {renderScoreBar(k.current_value, k.target_value * 1.2, k.metric_category === 'accuracy' ? 'bg-emerald-500' : k.metric_category === 'compliance' ? 'bg-accent-500' : 'bg-red-500')}
                  <p className="text-xs text-foreground-500 mt-2 line-clamp-2">{k.description}</p>
                </div>
              ))}
            </div>
            {/* KPI détaillé */}
            {selectedKPI && (
              <div className="bg-background-50 rounded-lg border border-accent-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    selectedKPI.metric_category === 'accuracy' ? 'bg-emerald-100 text-emerald-700' : selectedKPI.metric_category === 'compliance' ? 'bg-accent-100 text-accent-700' : 'bg-red-100 text-red-700'
                  }`}>{selectedKPI.metric_category === 'accuracy' ? 'Exactitude' : selectedKPI.metric_category === 'compliance' ? 'Conformité' : 'Taux d\'Erreur'}</span>
                  <span className="text-xs text-foreground-400">{selectedKPI.period}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground-950 mb-4">{selectedKPI.metric_name}</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-xl font-bold text-foreground-950">{selectedKPI.current_value}<span className="text-sm font-normal text-foreground-400"> {selectedKPI.unit}</span></div>
                    <div className="text-xs text-foreground-500">Actuel</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-xl font-bold text-foreground-400">{selectedKPI.target_value}<span className="text-sm font-normal text-foreground-400"> {selectedKPI.unit}</span></div>
                    <div className="text-xs text-foreground-500">Cible</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className={`text-xl font-bold ${selectedKPI.trend === 'up' && selectedKPI.metric_category === 'error_rate' ? 'text-red-600' : selectedKPI.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {selectedKPI.trend_pct > 0 ? '+' : ''}{selectedKPI.trend_pct} pt
                    </div>
                    <div className="text-xs text-foreground-500">Variation</div>
                  </div>
                </div>
                <div className="p-4 bg-accent-50/50 rounded-lg border border-accent-100">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Analyse</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedKPI.description}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== ONGLET 16 : ROYALTY ENGINE ==== */}
        {activeTab === 'royalty' && (
          <div className="space-y-6">
            {/* Switch Banner */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 mb-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span className="text-xs font-bold text-amber-300">SWITCH 2 ACTIVÉ — ROYALTY ENGINE</span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-white mb-2">
                    Creator Royalty Score™ — ISO 30401 §8.2
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {royaltyEngine.creator_royalty_score.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2 font-mono bg-white/5 rounded-lg p-2 inline-block">
                    {royaltyEngine.creator_royalty_score.calculation_formula}
                  </p>
                </div>
                <div className="flex-shrink-0 text-center px-8 py-5 rounded-2xl bg-amber-500/10 border border-amber-400/20">
                  <div className="text-4xl font-bold text-amber-400 font-heading">+{royaltyEngine.sme_contributions_growth}%</div>
                  <div className="text-xs text-amber-300 mt-1">Contributions SME</div>
                </div>
              </div>
            </div>

            {/* Top 10 Creators */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-vip-crown-line text-amber-500" />
                Top 10 Créateurs — {royaltyEngine.quarterly_dashboard.q2_2026.creators_active} actifs
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left p-3 font-semibold text-foreground-950 text-xs w-12">#</th>
                      <th className="text-left p-3 font-semibold text-foreground-950 text-xs">Créateur</th>
                      <th className="text-center p-3 font-semibold text-foreground-950 text-xs">Rôle</th>
                      <th className="text-center p-3 font-semibold text-foreground-950 text-xs">Atoms</th>
                      <th className="text-center p-3 font-semibold text-foreground-950 text-xs">Méthodo</th>
                      <th className="text-center p-3 font-semibold text-foreground-950 text-xs">Cas</th>
                      <th className="text-center p-3 font-semibold text-foreground-950 text-xs">Reviews</th>
                      <th className="text-center p-3 font-semibold text-foreground-950 text-xs">Score</th>
                      <th className="text-right p-3 font-semibold text-foreground-950 text-xs">Bonus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {royaltyEngine.top10_creators.map((c) => (
                      <tr key={c.rank} className={`border-t border-background-200/70 ${c.rank <= 3 ? 'bg-amber-50/30' : 'hover:bg-background-100'}`}>
                        <td className="p-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${c.rank === 1 ? 'bg-amber-500 text-white' : c.rank === 2 ? 'bg-gray-400 text-white' : c.rank === 3 ? 'bg-amber-700 text-white' : 'bg-background-200 text-foreground-500'}`}>
                            {c.rank}
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="text-sm font-semibold text-foreground-950">{c.name}</span>
                          <span className={`text-[10px] ml-2 ${c.trend === 'up' ? 'text-emerald-600' : 'text-foreground-400'}`}>
                            {c.trend === 'up' ? '▲' : '→'}
                          </span>
                        </td>
                        <td className="p-3 text-center"><span className="text-xs text-foreground-500">{c.role}</span></td>
                        <td className="p-3 text-center"><span className="text-xs font-bold text-foreground-950">{c.atoms}</span></td>
                        <td className="p-3 text-center"><span className="text-xs font-bold text-foreground-950">{c.methodologies}</span></td>
                        <td className="p-3 text-center"><span className="text-xs font-bold text-foreground-950">{c.cases}</span></td>
                        <td className="p-3 text-center"><span className="text-xs font-bold text-foreground-950">{c.reviews}</span></td>
                        <td className="p-3 text-center"><span className="text-xs font-bold text-amber-600">{c.royalty_score.toLocaleString()}</span></td>
                        <td className="p-3 text-right"><span className="text-xs font-bold text-emerald-600">{c.bonus_fcfa.toLocaleString()} FCFA</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quarterly Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Q1 2026', data: royaltyEngine.quarterly_dashboard.q1_2026, color: '#9CA3AF' },
                { label: 'Q2 2026', data: royaltyEngine.quarterly_dashboard.q2_2026, color: '#E8C547' },
                { label: 'Q3 2026 (Proj.)', data: royaltyEngine.quarterly_dashboard.q3_2026_projection, color: '#86BC25' },
              ].map((q) => (
                <div key={q.label} className="rounded-xl bg-background-50 border border-background-200/70 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: q.color }} />
                    <h4 className="text-sm font-bold text-foreground-950">{q.label}</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground-500">Royalty Total</span>
                      <span className="font-bold text-foreground-950">{q.data.total_royalty.toLocaleString()} pts</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground-500">Créateurs Actifs</span>
                      <span className="font-bold text-foreground-950">{q.data.creators_active}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground-500">Bonus Distribués</span>
                      <span className="font-bold text-emerald-600">{q.data.bonus_distributed_fcfa.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ISO 30401 Reference */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-file-check-line text-emerald-500" />
                Alignement ISO 30401 §8.2
              </h3>
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <p className="text-sm text-foreground-700 leading-relaxed">{royaltyEngine.creator_royalty_score.iso_reference}</p>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4 text-center">
                <div className="p-3 rounded-lg bg-background-100">
                  <span className="block text-xl font-bold text-foreground-950">{royaltyEngine.quarterly_dashboard.total_atoms_published}</span>
                  <span className="text-[10px] text-foreground-400">Atoms Publiés</span>
                </div>
                <div className="p-3 rounded-lg bg-background-100">
                  <span className="block text-xl font-bold text-foreground-950">{royaltyEngine.quarterly_dashboard.total_methodologies}</span>
                  <span className="text-[10px] text-foreground-400">Méthodologies</span>
                </div>
                <div className="p-3 rounded-lg bg-background-100">
                  <span className="block text-xl font-bold text-foreground-950">{royaltyEngine.quarterly_dashboard.total_case_studies}</span>
                  <span className="text-[10px] text-foreground-400">Cas Clients</span>
                </div>
                <div className="p-3 rounded-lg bg-background-100">
                  <span className="block text-xl font-bold text-foreground-950">{royaltyEngine.quarterly_dashboard.total_peer_reviews}</span>
                  <span className="text-[10px] text-foreground-400">Peer Reviews</span>
                </div>
              </div>
            </div>

            {/* Effect 90j */}
            <div className="rounded-2xl bg-amber-50/50 border border-amber-200 p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                <i className="ri-vip-crown-line text-3xl text-amber-600" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground-950 mb-2">SWITCH 2 — ACTIVÉ !</h3>
              <p className="text-sm text-foreground-600 max-w-lg mx-auto">
                {royaltyEngine.effect_90j}. Premier bonus trimestriel payé au J+60.
                Tables impactées : {royaltyEngine.tables_impacted.join(', ')}.
              </p>
            </div>
          </div>
        )}

        {/* ===== ONGLET 17 : BIG FOUR PARTNER PROMPTS ===== */}
        {activeTab === 'bigfour' && (
          <div className="space-y-6">
            {/* Switch Banner */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 border border-accent-400/30 mb-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                    </span>
                    <span className="text-xs font-bold text-accent-300">LIVRABLE 2 — MASTER PROMPTS POUR 75 AGENTS IA</span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-white mb-2">
                    {bigFourMasterPrompts.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {bigFourMasterPrompts.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Version: {bigFourMasterPrompts.version}</p>
                </div>
                <div className="flex-shrink-0 text-center px-8 py-5 rounded-2xl bg-accent-500/10 border border-accent-400/20">
                  <div className="text-4xl font-bold text-accent-400 font-heading">75</div>
                  <div className="text-xs text-accent-300 mt-1">Agents IA Couverts</div>
                </div>
              </div>
            </div>

            {/* Prompt Selector */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {bigFourMasterPrompts.prompts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedBigFour(p)}
                  className={`text-left p-5 rounded-xl border transition-colors cursor-pointer ${
                    selectedBigFour.id === p.id
                      ? 'border-accent-300 bg-accent-50/50'
                      : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-bold whitespace-nowrap">{p.agentRange}</span>
                    <span className="text-[10px] text-foreground-400">{p.targetAgents.length} agents</span>
                  </div>
                  <h4 className="text-sm font-heading font-bold text-foreground-950 mb-1.5">{p.id}</h4>
                  <p className="text-xs text-foreground-500 line-clamp-2">{p.mission}</p>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-background-200/70">
                    <span className="text-[10px] text-accent-600 font-semibold">{p.kpis.bigfour_checks_passed || p.kpis.mql_rate || p.kpis.assets_per_month}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Prompt Detail */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-bold">{selectedBigFour.agentRange}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedBigFour.role}</span>
                <span className="text-xs text-foreground-400 ml-auto">Trigger: {selectedBigFour.trigger}</span>
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground-950 mb-1">{selectedBigFour.id}</h3>
              <p className="text-sm text-foreground-600 mb-4">Mission: {selectedBigFour.mission}</p>

              {/* Target Agents */}
              <div className="p-4 bg-background-100 rounded-lg mb-4">
                <h4 className="text-xs font-bold text-foreground-950 mb-2">Agents Cibles ({selectedBigFour.targetAgents.length})</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedBigFour.targetAgents.map((agent: string) => (
                    <span key={agent} className="text-[10px] px-2 py-1 rounded-full bg-accent-100/70 text-accent-700 font-mono">{agent}</span>
                  ))}
                </div>
              </div>

              {/* Input Schema */}
              {selectedBigFour.inputSchema && (
                <div className="p-4 bg-background-100 rounded-lg mb-4">
                  <h4 className="text-xs font-bold text-foreground-950 mb-2">Input Schema</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedBigFour.inputSchema).map(([k, v]) => (
                      <code key={k} className="text-[10px] bg-foreground-950 text-emerald-300 px-2 py-1 rounded font-mono">{k}: {v as string}</code>
                    ))}
                  </div>
                </div>
              )}

              {/* Process Steps */}
              <div className="mb-4">
                <h4 className="text-xs font-bold text-foreground-950 mb-3">Pipeline Big Four — 0 Erreur ({selectedBigFour.processSteps.length} Gates)</h4>
                <div className="space-y-2">
                  {selectedBigFour.processSteps.map((step: { step: number; name: string; description: string; gate: string }) => (
                    <div key={step.step} className="flex gap-3 p-3 bg-background-100 rounded-lg">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-500 text-white flex items-center justify-center text-xs font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold text-foreground-950">{step.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-mono">{step.gate}</span>
                        </div>
                        <p className="text-xs text-foreground-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Forbidden / Rules */}
              {(selectedBigFour.forbidden || selectedBigFour.rules) && (
                <div className="p-4 bg-red-50/50 rounded-lg border border-red-100 mb-4">
                  <h4 className="text-xs font-bold text-red-700 mb-2">
                    <i className="ri-forbid-line mr-1"></i>
                    {selectedBigFour.forbidden ? 'INTERDIT' : 'RÈGLES'}
                  </h4>
                  <p className="text-xs text-red-800 leading-relaxed">{selectedBigFour.forbidden || selectedBigFour.rules}</p>
                </div>
              )}

              {/* KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {Object.entries(selectedBigFour.kpis).map(([k, v]) => (
                  <div key={k} className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100 text-center">
                    <div className="text-sm font-bold text-emerald-700">{String(v)}</div>
                    <div className="text-[10px] text-foreground-500 mt-0.5">KPI: {k.replace(/_/g, ' ')}</div>
                  </div>
                ))}
              </div>

              {/* Output Schema */}
              {selectedBigFour.outputSchema && (
                <div className="p-4 bg-background-100 rounded-lg mb-4">
                  <h4 className="text-xs font-bold text-foreground-950 mb-2">Output Schema</h4>
                  <div className="space-y-1">
                    {Object.entries(selectedBigFour.outputSchema).map(([k, v]) => (
                      <div key={k} className="flex gap-2 text-xs">
                        <code className="text-emerald-600 font-mono flex-shrink-0">{k}</code>
                        <span className="text-foreground-500">: {String(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Effect */}
              {selectedBigFour.effect && (
                <div className="p-4 bg-accent-50/50 rounded-lg border border-accent-200">
                  <h4 className="text-xs font-bold text-foreground-950 mb-1">
                    <i className="ri-flashlight-line mr-1 text-accent-500"></i>Effet 90j
                  </h4>
                  <p className="text-xs text-foreground-700 leading-relaxed">{selectedBigFour.effect}</p>
                </div>
              )}
            </div>

            {/* Deployment Schedule */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-calendar-schedule-line text-accent-500" />
                Plan de Déploiement 30-60-90J
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {Object.entries(bigFourMasterPrompts.deploymentSchedule).map(([jalon, desc], idx) => (
                  <div key={jalon} className="p-4 rounded-xl bg-background-100 border border-background-200/70">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-accent-500 text-white flex items-center justify-center text-[10px] font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-xs font-bold text-foreground-950 uppercase">{jalon}</span>
                    </div>
                    <p className="text-xs text-foreground-600 leading-relaxed">{desc as string}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Big Four Effect Banner */}
            <div className="rounded-2xl bg-accent-50/50 border border-accent-200 p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-100 flex items-center justify-center">
                <i className="ri-shield-star-line text-3xl text-accent-600" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground-950 mb-2">3 MASTER PROMPTS · 75 AGENTS · BIG FOUR PARTNER-GRADE</h3>
              <p className="text-sm text-foreground-600 max-w-2xl mx-auto">
                Ces 3 prompts couvrent l'intégralité du cycle : Simulation (Engine) → Conversion (Factory) → Auto-Développement (Filler).
                Niveau KPMG FRM + Deloitte Digital + McKinsey LEAP. Zéro humain. 100% ISO 30401 + EEAT.
              </p>
              <p className="text-xs text-foreground-400 mt-3">
                Injectés dans le Hub <strong className="text-foreground-600">kos-ai-governance-ethics</strong> — Mapping Agent → Prompt complet ci-dessus.
              </p>
            </div>
          </div>
        )}

        {/* ===== ONGLET 18 : DIGITAL TWIN ===== */}
        {activeTab === 'digitaltwin' && (
          <DigitalTwinChart />
        )}

        </>
        )}

      </div>

      {/* KPI Footer */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Indicateurs Clés — AI Governance & Ethics Command</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Agents Enregistrés</div>
              <div className="text-lg font-bold text-accent-600">{aiRegistry.length}</div>
              <div className="text-xs text-foreground-400 mt-2">{prodCount} en production, {highRiskCount} risque élevé</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Conformité ISO 42001</div>
              <div className="text-lg font-bold text-emerald-600">{compliantCount}/{aiComplianceEngine.length}</div>
              <div className="text-xs text-foreground-400 mt-2">{aiComplianceEngine.filter(c => !c.is_compliant).length} non-conformités</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Validation Workflow</div>
              <div className="text-lg font-bold text-emerald-600">{approvedValidations}/{aiValidationWorkflow.length}</div>
              <div className="text-xs text-foreground-400 mt-2">{aiValidationWorkflow.filter(v => v.overall_status === 'in_review').length} en cours de revue</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Hallucination Control</div>
              <div className="text-lg font-bold text-amber-600">{avgHallucinationRate.toFixed(1)}%</div>
              <div className="text-xs text-foreground-400 mt-2">{totalHallucinations} détectées / {totalOutputsChecked} outputs</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Prompt Register</div>
              <div className="text-lg font-bold text-accent-600">{promptQualityOffice.length}</div>
              <div className="text-xs text-foreground-400 mt-2">Qualité moyenne {(promptQualityOffice.reduce((s, p) => s + p.clarity_score + p.specificity_score + p.safety_score + p.effectiveness_score, 0) / (promptQualityOffice.length * 4)).toFixed(1)}/10</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Traçabilité Moy.</div>
              <div className="text-lg font-bold text-secondary-600">{avgTraceability.toFixed(1)}/10</div>
              <div className="text-xs text-foreground-400 mt-2">{aiAuditTrail.length} actions tracées</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Alignement ISO 42001</div>
              <div className="text-lg font-bold text-accent-600">{avgIso.toFixed(1)}/10</div>
              <div className="text-xs text-foreground-400 mt-2">{aiGovernanceCouncil.filter(c => c.iso_42001_alignment >= 9).length} agents ≥ 9.0</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Sources Vérifiées</div>
              <div className="text-lg font-bold text-secondary-600">{verifiedSources}/{sourceVerificationEngine.length}</div>
              <div className="text-xs text-foreground-400 mt-2">Score confiance {sourceVerificationEngine.filter(s => s.trust_score >= 9).length} ≥ 9.0</div>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}



