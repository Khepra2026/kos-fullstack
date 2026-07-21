import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useLlmExpertsAutomates } from '@/hooks/useLlmExpertsAutomates';
import type { llmExpertsAutomate } from '@/hooks/useLlmExpertsAutomates';

function getStatusBadge(status: string) {
  switch (status) {
    case 'deployed': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Déployé', dot: 'bg-emerald-500' };
    case 'partial': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Partiel', dot: 'bg-amber-500' };
    case 'mock': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', label: 'Mock', dot: 'bg-slate-400' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Critique', dot: 'bg-red-500' };
    case 'high': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Haute', dot: 'bg-amber-500' };
    case 'medium': return { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', label: 'Moyenne', dot: 'bg-teal-500' };
    case 'low': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-500', label: 'Basse', dot: 'bg-slate-400' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function formatNumber(value: number) {
  if (value >= 1000000000) return (value / 1000000000).toFixed(1) + 'B';
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
  if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
  return String(value);
}

function formatTokens(value: number) {
  if (value >= 1000000000000) return (value / 1000000000000).toFixed(1) + 'T';
  if (value >= 1000000000) return (value / 1000000000).toFixed(1) + 'B';
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
  return formatNumber(value);
}

export default function llmExpertsAutomatesPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const { automates, categories, kpis, isLive, loading, error, refetch } = useLlmExpertsAutomates();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredAutomates = useMemo(() => {
    let list = automates;
    if (categoryFilter !== 'all') list = list.filter(a => a.category === categoryFilter);
    if (statusFilter !== 'all') list = list.filter(a => a.status === statusFilter);
    return list;
  }, [automates, categoryFilter, statusFilter]);

  const categoryStats = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      count: automates.filter(a => a.category === cat.id).length,
      deployed: automates.filter(a => a.category === cat.id && a.status === 'deployed').length,
      partial: automates.filter(a => a.category === cat.id && a.status === 'partial').length,
    }));
  }, [automates, categories]);

  const totalDeployed = automates.filter(a => a.status === 'deployed').length;
  const totalPartial = automates.filter(a => a.status === 'partial').length;

  const expertChain = [
    { id: 'prompt-engineering-optimization', label: 'Prompts', icon: 'ri-chat-3-line', color: '#F59E0B', desc: 'Ingénierie et optimisation des prompts' },
    { id: 'llm-fine-tuning-alignment', label: 'Fine-tuning', icon: 'ri-cpu-line', color: '#8B5CF6', desc: 'Fine-tuning et alignement des modèles' },
    { id: 'rag-knowledge-retrieval', label: 'RAG', icon: 'ri-search-line', color: '#10B981', desc: 'Retrieval-Augmented Generation' },
    { id: 'model-evaluation-quality', label: 'Évaluation', icon: 'ri-bar-chart-2-line', color: '#0EA5E9', desc: 'Évaluation et qualité des modèles' },
    { id: 'llm-security-guardrails', label: 'Sécurité', icon: 'ri-shield-keyhole-line', color: '#EF4444', desc: 'Sécurité et guardrails LLM' },
    { id: 'multi-agent-orchestration', label: 'Orchestration', icon: 'ri-git-branch-line', color: '#6366F1', desc: 'Orchestration multi-agent' },
    { id: 'llm-observability-monitoring', label: 'Monitoring', icon: 'ri-radar-line', color: '#14B8A6', desc: 'Observabilité et monitoring' },
    { id: 'llm-cost-optimization-efficiency', label: 'Coûts', icon: 'ri-money-dollar-circle-line', color: '#EC4899', desc: 'Optimisation des coûts LLM' },
  ];

  return (
    <hubLayout hubId={62}>
      <SeoHead
        title="KOS Experts LLM™ — Automates Intelligence Artificielle Générative | KHEPRA EXPERTS"
        description="24 automates experts LLM KOS : prompt engineering, fine-tuning, RAG, évaluation modèles, sécurité LLM, orchestration multi-agent, observabilité, optimisation coûts. 3.17T tokens traités, score 91.2/100."
        keywords="KOS experts LLM, intelligence artificielle, prompt engineering, fine-tuning, RAG, LLM sécurité, KHEPRA EXPERTS"
        canonicalPath="/kos-llm-experts-automates"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20artificial%20intelligence%20neural%20network%20visualization%20with%20amber%20and%20violet%20tones%20representing%20large%20language%20models%2C%20elegant%20geometric%20patterns%20suggesting%20neural%20pathways%20and%20transformer%20architectures%2C%20sophisticated%20AI%20research%20aesthetic%20with%20interconnected%20glowing%20nodes%20and%20data%20flow%20streams%2C%20premium%20AI%20laboratory%20ambiance%20with%20warm%20golden%20and%20deep%20purple%20gradients%2C%20no%20text%20no%20human%20figures%2C%20modern%20machine%20learning%20aesthetic&width=1920&height=600&seq=kos-llm-experts-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-18"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/60 via-foreground-950/80 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <i className="ri-cpu-line text-amber-400 text-sm" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                  KOS Experts LLM™
                </span>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm ${
                isLive ? 'bg-emerald-500/20 border border-emerald-400/30' : 'bg-amber-500/20 border border-amber-400/30'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span className={`text-sm font-semibold uppercase tracking-wider ${isLive ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {isLive ? 'DONNÉES LIVE — SUPABASE' : 'DONNÉES MOCK — DÉMO'}
                </span>
              </div>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              L'IA ne pense pas. Les LLMs ne raisonnent pas.
              <span className="block text-amber-400 mt-2">Nos experts les font travailler ensemble.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              <strong className="text-white">{kpis.total_agents} automates</strong> spécialistes des grands modèles de langage sur <strong className="text-white">{kpis.categories} domaines</strong>.{' '}
              <strong className="text-white">{formatTokens(kpis.total_tokens_processed)} tokens</strong> traités,{' '}
              <strong className="text-white">{kpis.total_models_managed} modèles</strong> gérés pour un{' '}
              <strong className="text-white">score d'évaluation de {kpis.overall_evaluation_score}/100</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm text-emerald-300 font-semibold">{totalDeployed} Déployés</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-sm text-amber-300 font-semibold">{totalPartial} Partiels</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <i className="ri-bar-chart-2-line text-amber-400" />
                <span className="text-sm text-amber-300 font-semibold">Score {kpis.overall_evaluation_score}/100</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="text-sm text-emerald-300 font-semibold">{kpis.avg_accuracy_rate}% précision</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                <i className="ri-error-warning-line text-red-400" />
                <span className="text-sm text-red-300 font-semibold">{kpis.critical_agents} Critiques</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-4 bg-foreground-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-10 gap-3">
            {[
              { label: 'Total', value: String(kpis.total_agents), icon: 'ri-robot-line', color: '#F59E0B' },
              { label: 'Déployés', value: String(kpis.deployed), icon: 'ri-checkbox-circle-line', color: '#10B981' },
              { label: 'Partiels', value: String(kpis.partial), icon: 'ri-time-line', color: '#F59E0B' },
              { label: 'Auto', value: String(kpis.auto_enabled), icon: 'ri-refresh-line', color: '#F59E0B' },
              { label: 'Modèles gérés', value: String(kpis.total_models_managed), icon: 'ri-cpu-line', color: '#8B5CF6' },
              { label: 'Tokens traités', value: formatTokens(kpis.total_tokens_processed), icon: 'ri-stack-line', color: '#10B981' },
              { label: 'Score éval.', value: kpis.overall_evaluation_score + '/100', icon: 'ri-bar-chart-2-line', color: '#0EA5E9' },
              { label: 'Précision', value: kpis.avg_accuracy_rate + '%', icon: 'ri-focus-line', color: '#14B8A6' },
              { label: 'Latence', value: kpis.avg_latency_ms + 'ms', icon: 'ri-timer-line', color: '#EF4444' },
              { label: 'Tâches', value: formatNumber(kpis.total_tasks), icon: 'ri-stack-line', color: '#EC4899' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-2 rounded-lg bg-white/5 border border-white/5">
                <i className={`${stat.icon} text-sm mb-1 block`} style={{ color: stat.color }} />
                <span className="block text-lg font-bold text-white font-heading">{stat.value}</span>
                <span className="text-[10px] text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Chain */}
      <section className="py-10 sm:py-14 bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              Chaîne d'Expertise LLM — Du Prompt au Déploiement
            </h2>
            <p className="text-foreground-600">Un pipeline intégré en 8 étapes qui transforme les LLMs bruts en systèmes agentiques de niveau Big Four.</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-[8%] right-[8%] h-0.5 bg-background-200" />
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {expertChain.map((step, idx) => {
                const count = automates.filter(a => a.category === step.id).length;
                const deployed = automates.filter(a => a.category === step.id && a.status === 'deployed').length;
                return (
                  <button
                    key={step.id}
                    onClick={() => { setCategoryFilter(step.id); window.scrollTo({ top: 600, behavior: 'smooth' }); }}
                    className="relative rounded-xl bg-white border border-background-200 p-3 text-center hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: step.color }}>
                      {idx + 1}
                    </div>
                    <div className="w-9 h-9 mx-auto mb-2 mt-1 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${step.color}15` }}>
                      <i className={`${step.icon} text-base`} style={{ color: step.color }} />
                    </div>
                    <h3 className="text-xs font-bold text-foreground-950 mb-0.5">{step.label}</h3>
                    <p className="text-[10px] text-foreground-500 line-clamp-2 mb-1.5">{step.desc}</p>
                    <div className="flex items-center justify-center gap-1 text-[10px]">
                      <span className="font-bold" style={{ color: '#10B981' }}>{deployed}/{count}</span>
                      <span className="text-foreground-400">déployés</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Category & Status Filters */}
      <section className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider whitespace-nowrap">Domaine</span>
            <div className="flex gap-1 overflow-x-auto w-full flex-wrap">
              <button onClick={() => setCategoryFilter('all')} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${categoryFilter === 'all' ? 'bg-foreground-950 text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'}`}>
                Tout ({kpis.total_agents})
              </button>
              {categoryStats.map(cat => (
                <button key={cat.id} onClick={() => setCategoryFilter(cat.id)} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${categoryFilter === cat.id ? 'text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'}`} style={categoryFilter === cat.id ? { backgroundColor: cat.color } : {}}>
                  <i className={`${cat.icon} mr-1`} />{cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider whitespace-nowrap self-center">Statut</span>
            <button onClick={() => setStatusFilter('all')} className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${statusFilter === 'all' ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600'}`}>Tous</button>
            <button onClick={() => setStatusFilter('deployed')} className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${statusFilter === 'deployed' ? 'bg-emerald-600 text-white' : 'bg-white border border-background-200 text-foreground-600'}`}>Déployés ({totalDeployed})</button>
            <button onClick={() => setStatusFilter('partial')} className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${statusFilter === 'partial' ? 'bg-amber-600 text-white' : 'bg-white border border-background-200 text-foreground-600'}`}>Partiels ({totalPartial})</button>
          </div>
        </div>
      </section>

      {/* Category Overview Grid */}
      <section className="py-8 sm:py-10 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              8 Domaines — L'Intelligence LLM au Service du Conseil
            </h2>
            <p className="text-foreground-600">Du prompt engineering à l'optimisation des coûts, chaque domaine élève la qualité des livrables KOS.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryStats.map(cat => {
              const deployPct = cat.count > 0 ? Math.round((cat.deployed / cat.count) * 100) : 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setCategoryFilter(cat.id); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                  className="rounded-2xl bg-white border border-background-200 p-5 text-center hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                    <i className={`${cat.icon} text-2xl`} style={{ color: cat.color }} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-1 font-heading">{cat.name}</h3>
                  <p className="text-xs text-foreground-500 line-clamp-3 mb-3">{cat.description}</p>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span style={{ color: '#10B981' }} className="font-bold">{cat.deployed} déployés</span>
                    {cat.partial > 0 && (
                      <>
                        <span className="text-foreground-300">·</span>
                        <span style={{ color: '#F59E0B' }} className="font-bold">{cat.partial} partiels</span>
                      </>
                    )}
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-background-100 mt-2 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${deployPct}%` }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Automates Grid */}
      <section className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-background-200 border-t-amber-500 rounded-full animate-spin" />
              <p className="text-sm text-foreground-500">Chargement des 24 automates experts LLM KOS...</p>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100">
                <i className="ri-error-warning-line text-red-600 text-2xl" />
              </div>
              <p className="text-sm text-foreground-700 font-medium">Erreur de chargement</p>
              <p className="text-xs text-foreground-500 max-w-md text-center">{error}</p>
              <button onClick={refetch} className="px-5 py-2.5 rounded-full bg-foreground-950 text-background-50 text-sm font-medium hover:bg-foreground-800 transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-refresh-line mr-2" />Réessayer
              </button>
              <p className="text-xs text-foreground-400 mt-2">Affichage des données mock en secours</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold text-foreground-950">
                  {filteredAutomates.length} Automate{filteredAutomates.length > 1 ? 's' : ''}
                  {categoryFilter !== 'all' && <span className="text-foreground-400 font-normal"> — {categories.find(c => c.id === categoryFilter)?.name}</span>}
                </h2>
                <span className="text-xs text-foreground-400">{formatTokens(kpis.total_tokens_processed)} tokens</span>
              </div>

              {filteredAutomates.length === 0 ? (
                <div className="text-center py-16">
                  <i className="ri-inbox-line text-5xl text-foreground-200 mb-4 block" />
                  <p className="text-foreground-400">Aucun automate ne correspond aux filtres.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredAutomates.map((automate: llmExpertsAutomate) => {
                    const badge = getStatusBadge(automate.status);
                    const priorityB = getPriorityBadge(automate.priority);
                    const isExpanded = expandedId === automate.id;
                    const scoreColor = automate.success_rate >= 90 ? '#10B981' : automate.success_rate >= 75 ? '#F59E0B' : '#EF4444';

                    return (
                      <div key={automate.id} className={`rounded-2xl border transition-all duration-300 ${
                        isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200 hover:shadow-md'
                      }`}>
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : automate.id)}
                          className="w-full p-5 text-left cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${automate.color}15` }}>
                              <i className={`${automate.icon} text-lg`} style={{ color: automate.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="text-sm font-bold text-foreground-950">{automate.name}</h3>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${badge.bg} ${badge.border} ${badge.text}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                                  {badge.label}
                                </span>
                                {automate.priority === 'critical' && (
                                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold flex-shrink-0 ${priorityB.bg} ${priorityB.border} ${priorityB.text}`}>
                                    <span className={`w-1 h-1 rounded-full ${priorityB.dot}`} />
                                    {priorityB.label}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-foreground-600 line-clamp-2">{automate.description}</p>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {automate.tech_stack.slice(0, 4).map(tech => (
                                  <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{tech}</span>
                                ))}
                                {automate.tech_stack.length > 4 && (
                                  <span className="text-[10px] text-foreground-400">+{automate.tech_stack.length - 4}</span>
                                )}
                              </div>
                              <div className="flex items-center justify-between mt-3 text-xs">
                                <div className="flex items-center gap-3">
                                  <span className="flex items-center gap-1">
                                    <span className="font-bold font-heading" style={{ color: scoreColor }}>{automate.success_rate}%</span>
                                    <span className="text-foreground-400">succès</span>
                                  </span>
                                  <span className="text-foreground-400">{formatNumber(automate.tasks_completed)} tâches</span>
                                </div>
                                <span className={`flex items-center gap-1 ${automate.auto_enabled ? 'text-emerald-600' : 'text-foreground-300'}`}>
                                  <i className={`text-xs ${automate.auto_enabled ? 'ri-refresh-fill' : 'ri-refresh-line'}`} />
                                  {automate.auto_enabled ? 'Auto' : 'Manuel'}
                                </span>
                              </div>
                              {(automate.models_managed > 0 || automate.prompts_optimized > 0 || automate.evaluation_score > 0 || automate.latency_ms > 0) && (
                                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                                  {automate.models_managed > 0 && (
                                    <span className="text-violet-700 font-bold">{automate.models_managed} modèles</span>
                                  )}
                                  {automate.prompts_optimized > 0 && (
                                    <>
                                      {automate.models_managed > 0 && <span className="text-foreground-300">·</span>}
                                      <span className="text-amber-700 font-bold">{formatNumber(automate.prompts_optimized)} prompts</span>
                                    </>
                                  )}
                                  {automate.evaluation_score > 0 && (
                                    <>
                                      {(automate.models_managed > 0 || automate.prompts_optimized > 0) && <span className="text-foreground-300">·</span>}
                                      <span className="text-emerald-700 font-bold">Score {automate.evaluation_score}</span>
                                    </>
                                  )}
                                  {automate.latency_ms > 0 && (
                                    <>
                                      {(automate.models_managed > 0 || automate.prompts_optimized > 0 || automate.evaluation_score > 0) && <span className="text-foreground-300">·</span>}
                                      <span className="text-rose-600 font-bold">{automate.latency_ms}ms</span>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex-shrink-0 pt-2">
                              <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                            </div>
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-5 pb-5 border-t border-background-200 pt-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Capacités</h5>
                                <div className="flex flex-wrap gap-1.5">
                                  {automate.capabilities.map(cap => (
                                    <span key={cap} className="text-[10px] px-2 py-1 rounded-full bg-background-100 text-foreground-600 border border-background-200">{cap}</span>
                                  ))}
                                </div>
                                {automate.tokens_processed > 0 && (
                                  <div className="mt-3 flex items-center gap-1.5">
                                    <i className="ri-stack-line text-xs" style={{ color: '#10B981' }} />
                                    <span className="text-xs font-bold text-foreground-950">{formatTokens(automate.tokens_processed)} tokens traités</span>
                                  </div>
                                )}
                                {automate.accuracy_rate > 0 && (
                                  <div className="mt-1 flex items-center gap-1.5">
                                    <i className="ri-focus-line text-xs" style={{ color: '#0EA5E9' }} />
                                    <span className="text-xs font-bold text-foreground-950">{automate.accuracy_rate}% précision</span>
                                  </div>
                                )}
                              </div>
                              {automate.kpis.length > 0 && (
                                <div>
                                  <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">KPIs</h5>
                                  <div className="space-y-1.5">
                                    {automate.kpis.map((kpi, j) => (
                                      <div key={j} className="flex items-center justify-between p-2 rounded-lg bg-background-50 border border-background-100">
                                        <div className="flex items-center gap-1.5">
                                          <i className={`${kpi.icon} text-[10px]`} style={{ color: automate.color }} />
                                          <span className="text-[10px] text-foreground-600">{kpi.label}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-foreground-950">{kpi.current}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="mt-3 flex items-center gap-4 text-[10px] text-foreground-400 pt-3 border-t border-background-100">
                              <span><i className="ri-git-branch-line mr-1" />{automate.version}</span>
                              {automate.last_execution && (
                                <span><i className="ri-time-line mr-1" />{new Date(automate.last_execution).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Cross-link */}
      <section className="py-12 sm:py-16 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              Écosystème KOS — Experts LLM & Intelligence
            </h2>
            <p className="text-foreground-600">Accès rapide aux modules connexes de l'écosystème IA et intelligence KOS.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Experts LLM', path: '/kos-llm-experts-automates', icon: 'ri-cpu-line', color: '#F59E0B', current: true },
              { label: 'AI Governance & Ethics', path: '/kos-ai-governance-ethics', icon: 'ri-scales-3-line', color: '#8B5CF6' },
              { label: 'Knowledge Innovation', path: '/kos-knowledge-innovation-command', icon: 'ri-lightbulb-line', color: '#0EA5E9' },
              { label: 'Think Tank Automates', path: '/kos-think-tank-automates', icon: 'ri-brain-line', color: '#10B981' },
              { label: 'Strategic Intelligence', path: '/kos-strategic-intelligence', icon: 'ri-eye-line', color: '#6366F1' },
              { label: 'Research Institute', path: '/kos-research-institute', icon: 'ri-flask-line', color: '#14B8A6' },
              { label: 'Enterprise Brain OS', path: '/kos-enterprise-brain-os', icon: 'ri-mind-map', color: '#EC4899' },
              { label: 'Commandement Unifié', path: '/kos-commandement-operationnel-unifie', icon: 'ri-dashboard-line', color: '#EF4444' },
            ].map(link => (
              <a key={link.path} href={link.path} className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${
                link.current ? 'border-amber-300 bg-amber-50/40 ring-2 ring-amber-400' : 'border-background-200 bg-background-50 hover:border-foreground-200'
              }`}>
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                {link.current && (
                  <span className="block text-[10px] text-amber-700 font-bold mt-1">Vous êtes ici</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





