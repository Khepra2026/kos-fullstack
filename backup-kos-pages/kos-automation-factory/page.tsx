import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { WORKFLOWS, SOPS, AUDITS, FACTORY_STATS } from '@/mocks/automationFactory';

type Tab = 'workflows' | 'sops' | 'audits';

export default function automationFactoryPage() {
  const [activeTab, setActiveTab] = useState<Tab>('workflows');
  const [selectedWorkflow, setSelectedWorkflow] = useState(WORKFLOWS[0]);
  const [selectedSOP, setSelectedSOP] = useState(SOPS[0]);
  const [selectedAudit, setSelectedAudit] = useState(AUDITS[0]);
  const [wfFilter, setWfFilter] = useState<string>('all');
  const [auditFilter, setAuditFilter] = useState<string>('all');

  const filteredWorkflows = useMemo(() => {
    if (wfFilter === 'all') return WORKFLOWS;
    if (wfFilter === 'active') return WORKFLOWS.filter(w => w.status === 'running' || w.status === 'deploying');
    if (wfFilter === 'high') return WORKFLOWS.filter(w => w.criticality === 'high');
    return WORKFLOWS;
  }, [wfFilter]);

  const filteredAudits = useMemo(() => {
    if (auditFilter === 'all') return AUDITS;
    return AUDITS.filter(a => a.audit_type === auditFilter);
  }, [auditFilter]);

  const getStatusChip = (status: string) => {
    if (status === 'running') return 'bg-green-100 text-green-700';
    if (status === 'deploying') return 'bg-amber-100 text-amber-700';
    if (status === 'idle') return 'bg-background-200/70 text-foreground-600';
    if (status === 'error') return 'bg-red-100 text-red-700';
    return 'bg-background-100 text-foreground-600';
  };

  const getStatusLabel = (status: string) => {
    if (status === 'running') return 'En exécution';
    if (status === 'deploying') return 'En déploiement';
    if (status === 'idle') return 'En attente';
    if (status === 'error') return 'Erreur';
    return status;
  };

  const getSOPStatusChip = (status: string) => {
    if (status === 'published') return 'bg-green-100 text-green-700';
    if (status === 'draft') return 'bg-amber-100 text-amber-700';
    if (status === 'under_review') return 'bg-accent-100 text-accent-700';
    if (status === 'archived') return 'bg-background-200/70 text-foreground-500';
    return 'bg-background-100 text-foreground-600';
  };

  const getSOPStatusLabel = (status: string) => {
    if (status === 'published') return 'Publiée';
    if (status === 'draft') return 'Brouillon';
    if (status === 'under_review') return 'En revue';
    if (status === 'archived') return 'Archivée';
    return status;
  };

  const getAuditStatusChip = (status: string) => {
    if (status === 'passed') return 'bg-green-100 text-green-700';
    if (status === 'passed_with_observations') return 'bg-amber-100 text-amber-700';
    if (status === 'failed') return 'bg-red-100 text-red-700';
    if (status === 'in_progress') return 'bg-accent-100 text-accent-700';
    return 'bg-background-100 text-foreground-600';
  };

  const getAuditStatusLabel = (status: string) => {
    if (status === 'passed') return 'Réussi';
    if (status === 'passed_with_observations') return 'Réussi + Observations';
    if (status === 'failed') return 'Échoué';
    if (status === 'in_progress') return 'En cours';
    return status;
  };

  const getAuditTypeLabel = (type: string) => {
    if (type === 'compliance') return 'Conformité';
    if (type === 'performance') return 'Performance';
    if (type === 'security') return 'Sécurité';
    if (type === 'code_quality') return 'Qualité Code';
    if (type === 'dependency') return 'Dépendances';
    return type;
  };

  const renderGauge = (score: number, maxScore: number, size: number = 48, colorOverride?: string) => {
    const pct = Math.min((score / maxScore) * 100, 100);
    const r = (size - 8) / 2;
    const circ = 2 * Math.PI * r;
    const color = colorOverride || (score >= 90 ? '#22c55e' : score >= 75 ? '#f59e0b' : '#ef4444');
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="-rotate-90" style={{ width: size, height: size }} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="4"
            strokeDasharray={`${(pct / 100) * circ} ${circ}`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-foreground-950">{score}</span>
        </div>
      </div>
    );
  };

  const renderScoreBar = (score: number, max: number = 100, color?: string) => (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color || 'bg-accent-500'}`} style={{ width: `${Math.min((score / max) * 100, 100)}%` }}></div>
      </div>
      <span className="text-xs font-bold text-foreground-950">{score}%</span>
    </div>
  );

  const formatFCFA = (val: number) => {
    const abs = Math.abs(val);
    if (abs >= 1000000000) return `${(abs / 1000000000).toFixed(1)} Md`;
    if (abs >= 1000000) return `${(abs / 1000000).toFixed(0)} M`;
    return `${abs.toLocaleString('fr-FR')}`;
  };

  const tabList = [
    { id: 'workflows' as Tab, label: 'Orchestrateur Workflows', icon: 'ri-git-branch-line', count: FACTORY_STATS.active_workflows, accent: 'border-secondary-300 bg-secondary-50/50' },
    { id: 'sops' as Tab, label: 'Générateur SOP', icon: 'ri-file-list-3-line', count: FACTORY_STATS.sops_under_review, accent: 'border-accent-300 bg-accent-50/50' },
    { id: 'audits' as Tab, label: 'Audit Automatisé', icon: 'ri-shield-check-line', count: FACTORY_STATS.audits_failed, accent: 'border-rose-300 bg-rose-50/50' },
  ];

  return (
    <hubLayout hubId={10}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-100 text-secondary-700 text-xs font-semibold mb-4">
                <i className="ri-settings-5-line"></i>KOS BLOC 10 — Enterprise Automation Factory™
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">Automation Factory™</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Usine d'automatisation industrielle KOS — Orchestrez 12 workflows autonomes, générez 12 SOP certifiées Big Four,
                auditez automatiquement vos automatisations avec 5 moteurs de contrôle. Conforme ISO 42001, ITIL, et COBIT 2019.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xl font-bold text-secondary-600">{FACTORY_STATS.total_workflows}</div>
                <div className="text-xs text-foreground-500">Workflows</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xl font-bold text-accent-600">{FACTORY_STATS.total_sops}</div>
                <div className="text-xs text-foreground-500">SOPs</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="flex justify-center">{renderGauge(FACTORY_STATS.avg_efficiency, 100, 42)}</div>
                <div className="text-xs text-foreground-500">Efficience</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xl font-bold text-foreground-950">{FACTORY_STATS.total_executions_month}</div>
                <div className="text-xs text-foreground-500">Exécutions/mois</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabList.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
                {tab.count > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab.id === 'audits' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ===== ONGLET 1 : WORKFLOW ORCHESTRATOR ===== */}
        {activeTab === 'workflows' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700">
                  <i className="ri-git-branch-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Workflow Orchestrator™</h3>
                  <p className="text-xs text-foreground-500">{WORKFLOWS.length} workflows — {FACTORY_STATS.active_workflows} actifs</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3 flex-wrap">
                {['all', 'active', 'high'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setWfFilter(f)}
                    className={`whitespace-nowrap text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                      wfFilter === f ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 bg-background-100 hover:bg-background-200/70'
                    }`}
                  >
                    {f === 'all' ? 'Tous' : f === 'active' ? 'Actifs' : 'Critiques'}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="p-2 rounded-lg bg-green-50/70 border border-green-100 text-center">
                  <div className="text-lg font-bold text-green-700">{WORKFLOWS.filter(w => w.status === 'running').length}</div>
                  <div className="text-[10px] text-foreground-500">Running</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-100 text-center">
                  <div className="text-lg font-bold text-amber-700">{WORKFLOWS.filter(w => w.status === 'deploying').length}</div>
                  <div className="text-[10px] text-foreground-500">Deploying</div>
                </div>
                <div className="p-2 rounded-lg bg-red-50/70 border border-red-100 text-center">
                  <div className="text-lg font-bold text-red-700">{WORKFLOWS.filter(w => w.status === 'error').length}</div>
                  <div className="text-[10px] text-foreground-500">Errors</div>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-secondary-200 bg-secondary-50/50 mb-3">
                <div className="text-xs text-foreground-500 mb-1">Optimisations potentielles</div>
                <div className="text-lg font-bold text-secondary-700">{formatFCFA(FACTORY_STATS.optimization_savings_fcfa)} FCFA/mois</div>
                <div className="text-xs text-foreground-400 mt-1">{FACTORY_STATS.incident_rate_pct}% taux incident</div>
              </div>
              <div className="max-h-[600px] overflow-y-auto space-y-2">
                {filteredWorkflows.map((w) => (
                  <div
                    key={w.id}
                    onClick={() => setSelectedWorkflow(w)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedWorkflow.id === w.id ? 'border-secondary-300 bg-secondary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-medium whitespace-nowrap">{w.domain}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getStatusChip(w.status)}`}>{getStatusLabel(w.status)}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{w.workflow_name}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-foreground-500">{w.steps_count} étapes</span>
                      <span className="text-xs font-bold text-green-600">{w.efficiency_pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-medium">{selectedWorkflow.domain}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusChip(selectedWorkflow.status)}`}>{getStatusLabel(selectedWorkflow.status)}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedWorkflow.criticality === 'high' ? 'bg-red-100 text-red-700' : selectedWorkflow.criticality === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-background-100 text-foreground-600'}`}>
                    {selectedWorkflow.criticality === 'high' ? 'Critique' : selectedWorkflow.criticality === 'medium' ? 'Standard' : 'Faible'}
                  </span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Créé le {new Date(selectedWorkflow.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedWorkflow.workflow_name}</h2>
                <p className="text-sm text-foreground-600 mb-4 leading-relaxed">{selectedWorkflow.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGauge(selectedWorkflow.efficiency_pct, 100, 56)}</div>
                    <div className="text-xs text-foreground-500 mt-1">Efficience</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{selectedWorkflow.steps_count}</div>
                    <div className="text-xs text-foreground-500">Étapes</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{selectedWorkflow.monthly_executions}</div>
                    <div className="text-xs text-foreground-500">Exécutions/mois</div>
                  </div>
                  <div className={`p-4 rounded-lg text-center ${selectedWorkflow.error_rate_pct > 2 ? 'bg-red-50/50 border border-red-100' : 'bg-green-50/50 border border-green-100'}`}>
                    <div className={`text-2xl font-bold ${selectedWorkflow.error_rate_pct > 2 ? 'text-red-600' : 'text-green-600'}`}>{selectedWorkflow.error_rate_pct}%</div>
                    <div className="text-xs text-foreground-500">Taux d'erreur</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-1">Durée moyenne</h4>
                    <p className="text-sm text-foreground-600">{selectedWorkflow.avg_duration_min} min</p>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-1">Coût par exécution</h4>
                    <p className="text-sm text-foreground-600">{formatFCFA(selectedWorkflow.cost_per_execution_fcfa)} FCFA</p>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-1">Type de déclencheur</h4>
                    <p className="text-sm text-foreground-600 capitalize">{selectedWorkflow.trigger_type}</p>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-1">Dernière exécution</h4>
                    <p className="text-sm text-foreground-600">{new Date(selectedWorkflow.last_execution).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-500">Efficience du workflow</span>
                    <span className="text-xs font-bold text-foreground-950">{selectedWorkflow.efficiency_pct}%</span>
                  </div>
                  {renderScoreBar(selectedWorkflow.efficiency_pct, 100, 'bg-secondary-500')}
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-4 bg-secondary-50/50 rounded-lg border border-secondary-100">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Dépendances</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedWorkflow.dependencies.map((d) => (
                        <span key={d} className="text-xs px-2 py-1 rounded-full bg-background-100 text-foreground-600 border border-background-200/70">{d}</span>
                      ))}
                    </div>
                  </div>
                  {selectedWorkflow.optimization_potential_pct > 10 && (
                    <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                      <h4 className="text-sm font-semibold text-foreground-950 mb-1">Potentiel d'optimisation</h4>
                      <p className="text-sm text-foreground-600">+{selectedWorkflow.optimization_potential_pct}% de gain d'efficience possible — revue recommandée</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 2 : SOP GENERATOR ===== */}
        {activeTab === 'sops' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                  <i className="ri-file-list-3-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS SOP Generator™</h3>
                  <p className="text-xs text-foreground-500">{SOPS.length} procédures — Couverture {FACTORY_STATS.sop_coverage_pct}%</p>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-accent-200 bg-accent-50/50 mb-3">
                <div className="text-xs text-foreground-500 mb-1">Taux de couverture SOP</div>
                <div className="text-lg font-bold text-accent-700">{FACTORY_STATS.sop_coverage_pct}%</div>
                <div className="text-xs text-foreground-400 mt-1">{SOPS.filter(s => s.status === 'published').length} publiées · {SOPS.filter(s => s.status === 'under_review').length} en revue</div>
              </div>
              <div className="max-h-[600px] overflow-y-auto space-y-2">
                {SOPS.map((sop) => (
                  <div
                    key={sop.id}
                    onClick={() => setSelectedSOP(sop)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedSOP.id === sop.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-medium whitespace-nowrap">{sop.category}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getSOPStatusChip(sop.status)}`}>{getSOPStatusLabel(sop.status)}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{sop.sop_name}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-foreground-500">{sop.version} · {sop.pages}p</span>
                      <span className="text-xs text-foreground-400">{sop.usage_count} usages</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-medium">{selectedSOP.category}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getSOPStatusChip(selectedSOP.status)}`}>{getSOPStatusLabel(selectedSOP.status)}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-600 font-medium uppercase">{selectedSOP.format}</span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    MàJ : {new Date(selectedSOP.last_updated).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedSOP.sop_name}</h2>
                <p className="text-sm text-foreground-600 mb-4 leading-relaxed">{selectedSOP.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{selectedSOP.version}</div>
                    <div className="text-xs text-foreground-500">Version</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{selectedSOP.sections_count}</div>
                    <div className="text-xs text-foreground-500">Sections</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{selectedSOP.pages}</div>
                    <div className="text-xs text-foreground-500">Pages</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-accent-600">{selectedSOP.usage_count}</div>
                    <div className="text-xs text-foreground-500">Utilisations</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-1">Auteur</h4>
                    <p className="text-sm text-foreground-600">{selectedSOP.author}</p>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-1">Standard de conformité</h4>
                    <p className="text-sm text-foreground-600">{selectedSOP.compliance_standard}</p>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-1">Fréquence de revue</h4>
                    <p className="text-sm text-foreground-600">Tous les {selectedSOP.review_frequency_days} jours</p>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-1">Prochaine revue</h4>
                    <p className="text-sm text-foreground-600">{new Date(selectedSOP.next_review_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Chaîne d'approbation</h4>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {selectedSOP.approval_chain.map((approver, idx) => (
                        <span key={idx} className="flex items-center gap-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${approver === selectedSOP.current_approver ? 'bg-amber-100 text-amber-700 font-semibold' : 'bg-background-200/70 text-foreground-600'}`}>
                            {approver}
                            {approver === selectedSOP.current_approver && ' (Actuel)'}
                          </span>
                          {idx < selectedSOP.approval_chain.length - 1 && (
                            <i className="ri-arrow-right-s-line text-foreground-400 text-xs"></i>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedSOP.linked_workflows.length > 0 && (
                    <div className="p-4 bg-accent-50/50 rounded-lg border border-accent-100">
                      <h4 className="text-sm font-semibold text-foreground-950 mb-2">Workflows liés</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSOP.linked_workflows.map((wf) => (
                          <span key={wf} className="text-xs px-2 py-1 rounded-full bg-background-100 text-foreground-600 border border-background-200/70">{wf}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 3 : AUTOMATED AUDITOR ===== */}
        {activeTab === 'audits' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                  <i className="ri-shield-check-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Automated Auditor™</h3>
                  <p className="text-xs text-foreground-500">{AUDITS.length} audits — {FACTORY_STATS.audit_pass_rate_pct}% succès</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3 flex-wrap">
                {['all', 'compliance', 'performance', 'security', 'code_quality'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setAuditFilter(f)}
                    className={`whitespace-nowrap text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                      auditFilter === f ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 bg-background-100 hover:bg-background-200/70'
                    }`}
                  >
                    {f === 'all' ? 'Tous' : getAuditTypeLabel(f)}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="p-2 rounded-lg bg-green-50/70 border border-green-100 text-center">
                  <div className="text-lg font-bold text-green-700">{AUDITS.filter(a => a.status === 'passed').length}</div>
                  <div className="text-[10px] text-foreground-500">Réussis</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-100 text-center">
                  <div className="text-lg font-bold text-amber-700">{AUDITS.filter(a => a.status === 'passed_with_observations').length}</div>
                  <div className="text-[10px] text-foreground-500">Observations</div>
                </div>
                <div className="p-2 rounded-lg bg-red-50/70 border border-red-100 text-center">
                  <div className="text-lg font-bold text-red-700">{AUDITS.filter(a => a.status === 'failed').length}</div>
                  <div className="text-[10px] text-foreground-500">Échoués</div>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-rose-200 bg-rose-50/50 mb-3">
                <div className="text-xs text-foreground-500 mb-1">Score conformité moyen</div>
                <div className="flex justify-center">{renderGauge(FACTORY_STATS.avg_compliance_score, 100, 52)}</div>
                <div className="text-xs text-foreground-400 mt-1 text-center">{FACTORY_STATS.avg_compliance_score}% — cible 95%</div>
              </div>
              <div className="max-h-[550px] overflow-y-auto space-y-2">
                {filteredAudits.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => setSelectedAudit(a)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedAudit.id === a.id ? 'border-rose-300 bg-rose-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-medium whitespace-nowrap">{getAuditTypeLabel(a.audit_type)}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getAuditStatusChip(a.status)}`}>{getAuditStatusLabel(a.status)}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{a.automation_name}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-foreground-500">{a.findings_count} findings</span>
                      <span className="text-xs font-bold text-foreground-950">{a.overall_score}/100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-medium">{getAuditTypeLabel(selectedAudit.audit_type)}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getAuditStatusChip(selectedAudit.status)}`}>{getAuditStatusLabel(selectedAudit.status)}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    selectedAudit.risk_level === 'critical' ? 'bg-red-100 text-red-700' : selectedAudit.risk_level === 'high' ? 'bg-orange-100 text-orange-700' : selectedAudit.risk_level === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                  }`}>
                    Risque: {selectedAudit.risk_level === 'critical' ? 'Critique' : selectedAudit.risk_level === 'high' ? 'Élevé' : selectedAudit.risk_level === 'medium' ? 'Moyen' : 'Faible'}
                  </span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Audit du {new Date(selectedAudit.audit_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedAudit.automation_name}</h2>
                <p className="text-sm text-foreground-500 mb-4">Auditeur : {selectedAudit.auditor_agent}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGauge(selectedAudit.overall_score, 100, 56)}</div>
                    <div className="text-xs text-foreground-500 mt-1">Score Global</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{selectedAudit.findings_count}</div>
                    <div className="text-xs text-foreground-500">Findings</div>
                  </div>
                  <div className={`p-4 rounded-lg text-center ${selectedAudit.critical_findings > 0 ? 'bg-red-50/50 border border-red-100' : 'bg-green-50/50 border border-green-100'}`}>
                    <div className={`text-2xl font-bold ${selectedAudit.critical_findings > 0 ? 'text-red-600' : 'text-green-600'}`}>{selectedAudit.critical_findings}</div>
                    <div className="text-xs text-foreground-500">Critiques</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{selectedAudit.evidence_count}</div>
                    <div className="text-xs text-foreground-500">Preuves</div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[
                    { label: 'Critiques', count: selectedAudit.critical_findings, color: 'bg-red-500' },
                    { label: 'Élevés', count: selectedAudit.high_findings, color: 'bg-orange-500' },
                    { label: 'Moyens', count: selectedAudit.medium_findings, color: 'bg-amber-500' },
                    { label: 'Faibles', count: selectedAudit.low_findings, color: 'bg-green-500' },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className={`h-2 rounded-full ${item.color} mb-1`} style={{ width: '100%', opacity: item.count > 0 ? 1 : 0.2 }}></div>
                      <div className="text-[10px] text-foreground-500">{item.label}</div>
                      <div className="text-xs font-bold text-foreground-950">{item.count}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-1">Prochain audit</h4>
                    <p className="text-sm text-foreground-600">{new Date(selectedAudit.next_scheduled_audit).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-1">Deadline remédiation</h4>
                    <p className={`text-sm ${new Date(selectedAudit.remediation_deadline) < new Date('2026-06-30') ? 'text-red-600 font-semibold' : 'text-foreground-600'}`}>
                      {new Date(selectedAudit.remediation_deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-rose-50/50 rounded-lg border border-rose-100 mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Recommandations ({selectedAudit.recommendations.length})</h4>
                  <ul className="space-y-2">
                    {selectedAudit.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-foreground-600">
                        <i className={`${rec.startsWith('URGENT') ? 'ri-alert-fill text-red-500' : 'ri-arrow-right-s-line text-foreground-400'} mt-0.5 flex-shrink-0`}></i>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Frameworks de conformité</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAudit.compliance_frameworks.map((fw) => (
                      <span key={fw} className="text-xs px-2 py-1 rounded-full bg-secondary-100 text-secondary-700 font-medium">{fw}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">KPI Globaux — Automation Factory™</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Workflows Actifs</div>
              <div className="text-lg font-bold text-secondary-600">{FACTORY_STATS.active_workflows}/{FACTORY_STATS.total_workflows}</div>
              <div className="h-1.5 mt-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-secondary-500 rounded-full" style={{ width: `${(FACTORY_STATS.active_workflows / FACTORY_STATS.total_workflows) * 100}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Efficience Moyenne</div>
              <div className="text-lg font-bold text-accent-600">{FACTORY_STATS.avg_efficiency}%</div>
              <div className="text-xs text-foreground-400 mt-2">{FACTORY_STATS.incident_rate_pct}% taux incident</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Couverture SOP</div>
              <div className="text-lg font-bold text-green-600">{FACTORY_STATS.sop_coverage_pct}%</div>
              <div className="text-xs text-foreground-400 mt-2">{SOPS.filter(s => s.status === 'published').length} publiées</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Taux Succès Audit</div>
              <div className="text-lg font-bold text-rose-600">{FACTORY_STATS.audit_pass_rate_pct}%</div>
              <div className="text-xs text-foreground-400 mt-2">{FACTORY_STATS.audits_failed} échoués</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Exécutions / Mois</div>
              <div className="text-lg font-bold text-foreground-950">{FACTORY_STATS.total_executions_month}</div>
              <div className="text-xs text-foreground-400 mt-2">{FACTORY_STATS.deployments_this_month} déploiements</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Score Conformité</div>
              <div className="text-lg font-bold text-primary-600">{FACTORY_STATS.avg_compliance_score}%</div>
              <div className="text-xs text-foreground-400 mt-2">Cible ISO 42001: 95%</div>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





