import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useLlmExcellenceEngine } from '@/hooks/useLlmExcellenceEngine';
import type { LlmExcellenceBlock, MaturityKPI } from '@/hooks/useLlmExcellenceEngine';

function formatFCFA(value: number): string {
  if (value >= 1000000000) return (value / 1000000000).toFixed(1) + ' Md';
  if (value >= 1000000) return (value / 1000000).toFixed(0) + ' M';
  if (value >= 1000) return (value / 1000).toFixed(0) + ' K';
  return String(value);
}

function formatNumber(value: number): string {
  if (value >= 1000000000) return (value / 1000000000).toFixed(1) + 'B';
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
  if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
  return String(value);
}

function getStatusColor(status: string) {
  switch (status) {
    case 'deployed': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Déployé' };
    case 'in_progress': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'En cours' };
    case 'planned': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', dot: 'bg-slate-400', label: 'Planifié' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', dot: 'bg-gray-500', label: 'N/A' };
  }
}

export default function llmExcellenceEnginePage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const {
    blocks,
    llmCapabilities,
    taskMatrix,
    promptTechniques,
    ragSources,
    factVerificationSteps,
    seoGeoSkills,
    learningLoops,
    benchmarkInstitutions,
    maturityKPIs,
    globalMetrics,
    isLive,
    loading,
    error,
    refetch,
  } = useLlmExcellenceEngine();

  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const [kpiView, setKpiView] = useState<'performance' | 'business'>('performance');

  const deployedBlocks = blocks.filter(b => b.status === 'deployed').length;
  const inProgressBlocks = blocks.filter(b => b.status === 'in_progress').length;
  const avgMaturity = Math.round(blocks.reduce((sum, b) => sum + b.maturity, 0) / blocks.length);

  const ragInternalSources = ragSources.filter(s => s.type === 'interne');
  const ragExternalSources = ragSources.filter(s => s.type === 'externe');
  const ragConnected = ragSources.filter(s => s.status === 'connected').length;

  const performanceKPIs = useMemo(() => maturityKPIs.filter(k => k.category === 'performance'), [maturityKPIs]);
  const businessKPIs = useMemo(() => maturityKPIs.filter(k => k.category === 'business'), [maturityKPIs]);
  const activeKPIs = kpiView === 'performance' ? performanceKPIs : businessKPIs;

  const seoSkills = seoGeoSkills.filter(s => s.type === 'SEO');
  const geoSkills = seoGeoSkills.filter(s => s.type === 'GEO');

  const scrollToBlock = (blockId: number) => {
    setActiveBlock(blockId);
    const el = document.getElementById(`block-${blockId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <hubLayout hubId={63}>
      <SeoHead
        title="KOS LLM Excellence Engine™ — Master Prompt Big Four | KHEPRA EXPERTS"
        description="Programme de renforcement des compétences LLM des 75 agents KOS. 9 blocs de formation : cartographie LLM, prompt engineering avancé, RAG, vérification factuelle, SEO/GEO, benchmark mondial Harvard-MIT-INSEAD-Oxford."
        keywords="KOS LLM excellence, master prompt Big Four, prompt engineering, RAG, ChatGPT, Gemini, Claude, formation agents IA, KHEPRA EXPERTS"
        canonicalPath="/kos-llm-excellence-engine"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-18 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20knowledge%20architecture%20visualization%20with%20interconnected%20geometric%20nodes%20representing%20multiple%20AI%20language%20models%20collaborating%20together%2C%20warm%20amber%20gold%20and%20deep%20emerald%20green%20gradients%2C%20elegant%20neural%20network%20patterns%20with%20data%20flow%20streams%20between%20ChatGPT%20Gemini%20and%20Claude%20model%20icons%2C%20sophisticated%20enterprise%20training%20academy%20aesthetic%2C%20clean%20minimalist%20composition%20with%20abstract%20knowledge%20transfer%20visualization%2C%20no%20text%20no%20human%20figures&width=1920&height=600&seq=kos-llm-excellence-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-15"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/50 via-foreground-950/75 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <i className="ri-award-line text-amber-400 text-sm" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                  Master Prompt Big Four™
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
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Chaque agent KOS formé à ChatGPT, Gemini et Claude.
              <span className="block text-amber-400 mt-2">Niveau d'excellence Big Four.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              Programme de renforcement des compétences LLM. <strong className="text-white">{globalMetrics.totalAgents} agents</strong> déployés,{' '}
              <strong className="text-white">9 blocs</strong> de formation intensive,{' '}
              <strong className="text-white">{globalMetrics.certificationsDelivered} certifications</strong> délivrées.{' '}
              Validation croisée multi-modèles, réduction des hallucinations de <strong className="text-white">{globalMetrics.hallucinationReduction}%</strong>,{' '}
              livrables conformes aux standards internationaux.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="text-sm text-emerald-300 font-semibold">{deployedBlocks}/9 blocs déployés</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <span className="text-sm text-amber-300 font-semibold">{inProgressBlocks} en cours</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="text-sm text-emerald-300 font-semibold">Maturité {avgMaturity}%</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="text-sm text-emerald-300 font-semibold">{globalMetrics.agentsFormed}/{globalMetrics.totalAgents} agents formés</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Metrics Bar */}
      <section className="py-3 bg-foreground-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { label: 'Agents Formés', value: `${globalMetrics.agentsFormed}/${globalMetrics.totalAgents}`, icon: 'ri-team-line', color: '#10B981' },
              { label: 'Certifications', value: String(globalMetrics.certificationsDelivered), icon: 'ri-award-line', color: '#F59E0B' },
              { label: 'Validation Croisée', value: `${globalMetrics.crossValidationRate}%`, icon: 'ri-arrow-left-right-line', color: '#8B5CF6' },
              { label: 'Hallucinations', value: `-${globalMetrics.hallucinationReduction}%`, icon: 'ri-alert-line', color: '#EF4444' },
              { label: 'Temps Production', value: `-${globalMetrics.productionTimeReduction}%`, icon: 'ri-timer-line', color: '#0EA5E9' },
              { label: 'Maturité Moy.', value: `${globalMetrics.avgMaturity}/100`, icon: 'ri-medal-line', color: '#EC4899' },
              { label: 'Sources RAG', value: `${ragConnected}/${ragSources.length}`, icon: 'ri-database-2-line', color: '#14B8A6' },
              { label: 'Dernière Cohorte', value: new Date(globalMetrics.lastCohort).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }), icon: 'ri-calendar-check-line', color: '#F97316' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-2 rounded-lg bg-white/5 border border-white/5">
                <i className={`${stat.icon} text-sm mb-1 block`} style={{ color: stat.color }} />
                <span className="block text-base font-bold text-white font-heading">{stat.value}</span>
                <span className="text-[10px] text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block Navigation — Quick Jump */}
      <section className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider whitespace-nowrap mr-1">Blocs</span>
            {blocks.map(block => {
              const badge = getStatusColor(block.status);
              return (
                <button
                  key={block.id}
                  onClick={() => scrollToBlock(block.id)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                    activeBlock === block.id
                      ? 'bg-foreground-950 text-white'
                      : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
                  }`}
                >
                  <span>{block.number}</span>
                  <span className="hidden sm:inline">{block.title.split(' — ')[0]}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-background-200 border-t-amber-500 rounded-full animate-spin" />
            <p className="text-sm text-foreground-500">Chargement du programme LLM Excellence Engine...</p>
          </div>
        </section>
      )}

      {/* Error State */}
      {!loading && error && (
        <section className="py-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100">
              <i className="ri-error-warning-line text-red-600 text-2xl" />
            </div>
            <p className="text-sm text-foreground-700 font-medium">Erreur de chargement</p>
            <p className="text-xs text-foreground-500">{error}</p>
            <button onClick={refetch} className="px-5 py-2.5 rounded-full bg-foreground-950 text-background-50 text-sm font-medium hover:bg-foreground-800 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-refresh-line mr-2" />Réessayer
            </button>
          </div>
        </section>
      )}

      {!loading && !error && (
        <>
          {/* BLOC 1 — Cartographie des Capacités LLM */}
          <section id="block-1" className="py-10 sm:py-14 bg-background-50 scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#F59E0B' }}>01</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Cartographie des Capacités LLM</h2>
                  <p className="text-foreground-500 text-sm">ChatGPT · Gemini · Claude — Forces, faiblesses et cas d'usage optimaux</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Déployé
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {llmCapabilities.map(model => (
                  <div key={model.model} className="rounded-2xl bg-white border border-background-200 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-3xl opacity-5" style={{ backgroundColor: model.color }} />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${model.color}15` }}>
                        <i className={`${model.icon} text-2xl`} style={{ color: model.color }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground-950 font-heading">{model.model}</h3>
                        <p className="text-xs text-foreground-400">{model.provider}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Capacités</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {model.capabilities.map(cap => (
                          <span key={cap} className="text-[10px] px-2 py-1 rounded-full border" style={{ borderColor: `${model.color}40`, color: model.color, backgroundColor: `${model.color}08` }}>{cap}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Cas d'usage KHEPRA</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {model.useCases.map(uc => (
                          <span key={uc} className="text-[10px] px-2 py-1 rounded-full bg-background-100 text-foreground-600 border border-background-200">{uc}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BLOC 2 — Matrice d'Affectation */}
          <section id="block-2" className="py-10 sm:py-14 bg-white scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#8B5CF6' }}>02</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Matrice d'Affectation des Tâches</h2>
                  <p className="text-foreground-500 text-sm">Modèle Principal · Modèle Vérificateur — Validation croisée systématique</p>
                </div>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-background-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-background-200 bg-background-50">
                      <th className="text-left py-3.5 px-5 font-bold text-foreground-500 uppercase text-xs tracking-wider">Tâche</th>
                      <th className="text-left py-3.5 px-5 font-bold text-foreground-500 uppercase text-xs tracking-wider">Modèle Principal</th>
                      <th className="text-left py-3.5 px-5 font-bold text-foreground-500 uppercase text-xs tracking-wider">Modèle Vérificateur</th>
                      <th className="text-center py-3.5 px-5 font-bold text-foreground-500 uppercase text-xs tracking-wider">Priorité</th>
                      <th className="text-center py-3.5 px-5 font-bold text-foreground-500 uppercase text-xs tracking-wider">Agents</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taskMatrix.map((row, i) => {
                      const primaryModel = llmCapabilities.find(m => m.model === row.primaryModel);
                      const verifierModel = llmCapabilities.find(m => m.model === row.verifierModel);
                      const priorityColors: Record<string, string> = { critical: 'text-red-700 bg-red-50 border-red-200', high: 'text-amber-700 bg-amber-50 border-amber-200', medium: 'text-teal-700 bg-teal-50 border-teal-200' };
                      return (
                        <tr key={i} className="border-b border-background-100 hover:bg-background-50/50 transition-colors">
                          <td className="py-3.5 px-5 font-bold text-foreground-900">{row.task}</td>
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${primaryModel?.color || '#888'}15` }}>
                                <i className={`${primaryModel?.icon || 'ri-cpu-line'} text-sm`} style={{ color: primaryModel?.color }} />
                              </div>
                              <span className="font-bold" style={{ color: primaryModel?.color }}>{row.primaryModel}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${verifierModel?.color || '#888'}15` }}>
                                <i className={`${verifierModel?.icon || 'ri-cpu-line'} text-sm`} style={{ color: verifierModel?.color }} />
                              </div>
                              <span className="font-bold" style={{ color: verifierModel?.color }}>{row.verifierModel}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-5 text-center">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold border ${priorityColors[row.priority] || ''}`}>
                              {row.priority === 'critical' ? 'Critique' : row.priority === 'high' ? 'Haute' : 'Moyenne'}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-center font-bold text-foreground-900">{row.agentCount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* BLOC 3 — Prompt Engineering Avancé */}
          <section id="block-3" className="py-10 sm:py-14 bg-background-50 scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#10B981' }}>03</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Prompt Engineering Avancé</h2>
                  <p className="text-foreground-500 text-sm">Chain of Thought · Tree of Thoughts · Self Reflection · Multi-Agent Debate</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {promptTechniques.map(tech => (
                  <div key={tech.id} className="rounded-2xl bg-white border border-background-200 p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${tech.color}15` }}>
                        <i className={`${tech.icon} text-xl`} style={{ color: tech.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-foreground-950 mb-1">{tech.name}</h3>
                        <p className="text-xs text-foreground-500 leading-relaxed">{tech.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {tech.methodology.map((step, j) => (
                        <span key={j} className="flex items-center gap-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-full border font-bold" style={{ borderColor: `${tech.color}40`, color: tech.color, backgroundColor: `${tech.color}08` }}>{step}</span>
                          {j < tech.methodology.length - 1 && <i className="ri-arrow-right-s-line text-foreground-300 text-xs" />}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-foreground-500">
                        <i className="ri-team-line" style={{ color: tech.color }} />
                        <span className="font-bold text-foreground-900">{tech.agentsFormed}/75</span> agents formés
                      </span>
                      <span className="flex items-center gap-1 font-bold" style={{ color: tech.successRate >= 90 ? '#10B981' : tech.successRate >= 80 ? '#F59E0B' : '#EF4444' }}>
                        <i className="ri-check-double-line text-xs" />
                        {tech.successRate}% succès
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BLOC 4 — RAG */}
          <section id="block-4" className="py-10 sm:py-14 bg-white scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#0EA5E9' }}>04</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">RAG — Retrieval Augmented Generation</h2>
                  <p className="text-foreground-500 text-sm">Sources Internes · Sources Externes — 12 bases connectées, 2.8M documents</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 border border-amber-200 text-amber-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />En cours
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="rounded-2xl bg-background-50 border border-background-200 p-5">
                  <h4 className="text-sm font-bold text-foreground-900 mb-3 flex items-center gap-2">
                    <i className="ri-folder-2-line" style={{ color: '#0EA5E9' }} />
                    Sources Internes ({ragInternalSources.length})
                  </h4>
                  <div className="space-y-2.5">
                    {ragInternalSources.map(src => (
                      <div key={src.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white border border-background-100">
                        <div className="flex items-center gap-2.5">
                          <i className={`${src.icon} text-sm`} style={{ color: '#0EA5E9' }} />
                          <div>
                            <span className="text-xs font-bold text-foreground-900 block">{src.name}</span>
                            <span className="text-[10px] text-foreground-400">{formatNumber(src.documents)} docs · {formatNumber(src.embeddings)} embeddings</span>
                          </div>
                        </div>
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          src.status === 'connected' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          src.status === 'partial' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-slate-50 text-slate-500 border border-slate-200'
                        }`}>
                          {src.status === 'connected' ? 'Connecté' : src.status === 'partial' ? 'Partiel' : 'En attente'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-background-50 border border-background-200 p-5">
                  <h4 className="text-sm font-bold text-foreground-900 mb-3 flex items-center gap-2">
                    <i className="ri-global-line" style={{ color: '#8B5CF6' }} />
                    Sources Externes ({ragExternalSources.length})
                  </h4>
                  <div className="space-y-2.5">
                    {ragExternalSources.map(src => (
                      <div key={src.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white border border-background-100">
                        <div className="flex items-center gap-2.5">
                          <i className={`${src.icon} text-sm`} style={{ color: '#8B5CF6' }} />
                          <div>
                            <span className="text-xs font-bold text-foreground-900 block">{src.name}</span>
                            <span className="text-[10px] text-foreground-400">{formatNumber(src.documents)} docs · {formatNumber(src.embeddings)} embeddings</span>
                          </div>
                        </div>
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          src.status === 'connected' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          src.status === 'partial' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-slate-50 text-slate-500 border border-slate-200'
                        }`}>
                          {src.status === 'connected' ? 'Connecté' : src.status === 'partial' ? 'Partiel' : 'En attente'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BLOC 5 — Vérification Factuelle */}
          <section id="block-5" className="py-10 sm:py-14 bg-background-50 scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#EF4444' }}>05</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Vérification Factuelle</h2>
                  <p className="text-foreground-500 text-sm">Zéro affirmation sans source · référence · date · lien</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Déployé
                </span>
              </div>
              <div className="relative">
                <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-background-200" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {factVerificationSteps.map((step, idx) => (
                    <div key={step.step} className="relative rounded-2xl bg-white border border-background-200 p-5 text-center">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: step.color }}>
                        {step.step}
                      </div>
                      <div className="w-14 h-14 mx-auto mt-2 mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${step.color}10` }}>
                        <i className={`${step.icon} text-2xl`} style={{ color: step.color }} />
                      </div>
                      <h3 className="text-sm font-bold text-foreground-950 mb-1.5">{step.name}</h3>
                      <p className="text-xs text-foreground-500 leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* BLOC 6 — SEO/GEO Intelligence */}
          <section id="block-6" className="py-10 sm:py-14 bg-white scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#EC4899' }}>06</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">SEO/GEO Intelligence</h2>
                  <p className="text-foreground-500 text-sm">Search Engine Optimization · Generative Engine Optimization — 11 compétences</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 border border-amber-200 text-amber-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />En cours
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div>
                  <h4 className="text-sm font-bold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <i className="ri-google-line" style={{ color: '#10B981' }} />SEO ({seoSkills.length} compétences)
                  </h4>
                  <div className="space-y-2.5">
                    {seoSkills.map(skill => (
                      <div key={skill.id} className="flex items-center justify-between p-3 rounded-xl bg-background-50 border border-background-200">
                        <div className="flex items-center gap-2.5">
                          <i className={`${skill.icon} text-sm`} style={{ color: skill.color }} />
                          <div>
                            <span className="text-xs font-bold text-foreground-900">{skill.name}</span>
                            <span className="text-[10px] text-foreground-400 block">{skill.agentsFormed} agents</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full bg-background-200 overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${skill.maturity}%`, backgroundColor: skill.maturity >= 80 ? '#10B981' : skill.maturity >= 60 ? '#F59E0B' : '#EF4444' }} />
                          </div>
                          <span className="text-xs font-bold text-foreground-600 w-8 text-right">{skill.maturity}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <i className="ri-robot-2-line" style={{ color: '#EC4899' }} />GEO ({geoSkills.length} compétences)
                  </h4>
                  <div className="space-y-2.5">
                    {geoSkills.map(skill => (
                      <div key={skill.id} className="flex items-center justify-between p-3 rounded-xl bg-background-50 border border-background-200">
                        <div className="flex items-center gap-2.5">
                          <i className={`${skill.icon} text-sm`} style={{ color: skill.color }} />
                          <div>
                            <span className="text-xs font-bold text-foreground-900">{skill.name}</span>
                            <span className="text-[10px] text-foreground-400 block">{skill.agentsFormed} agents</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full bg-background-200 overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${skill.maturity}%`, backgroundColor: skill.maturity >= 80 ? '#10B981' : skill.maturity >= 60 ? '#F59E0B' : '#EF4444' }} />
                          </div>
                          <span className="text-xs font-bold text-foreground-600 w-8 text-right">{skill.maturity}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BLOC 7 — Apprentissage Continu */}
          <section id="block-7" className="py-10 sm:py-14 bg-background-50 scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#14B8A6' }}>07</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Apprentissage Continu</h2>
                  <p className="text-foreground-500 text-sm">Identifier · Documenter · Corriger · Améliorer — Boucle fermée après chaque mission</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Déployé
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {learningLoops.map((loop, i) => (
                  <div key={loop.phase} className="rounded-2xl bg-white border border-background-200 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#14B8A6' + '15' }}>
                        <i className={`${loop.icon} text-sm`} style={{ color: '#14B8A6' }} />
                      </div>
                      <h3 className="text-sm font-bold text-foreground-950">{i + 1}. {loop.phase}</h3>
                    </div>
                    <ul className="space-y-1.5 mb-3">
                      {loop.actions.map((action, j) => (
                        <li key={j} className="flex items-start gap-1.5 text-xs text-foreground-600">
                          <i className="ri-check-line text-emerald-500 flex-shrink-0 mt-0.5" />
                          {action}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-3 border-t border-background-100 flex items-center gap-1.5 text-[10px] text-foreground-400">
                      <i className="ri-timer-line" />
                      {loop.frequency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BLOC 8 — Benchmark Mondial */}
          <section id="block-8" className="py-10 sm:py-14 bg-white scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#6366F1' }}>08</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Benchmark Mondial</h2>
                  <p className="text-foreground-500 text-sm">Harvard Business School · HEC Paris · MIT Sloan · INSEAD · University of Oxford</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 border border-amber-200 text-amber-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />En cours
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {benchmarkInstitutions.map(inst => (
                  <div key={inst.name} className="rounded-2xl bg-background-50 border border-background-200 p-5 text-center hover:shadow-md transition-all cursor-default">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${inst.color}12` }}>
                      <i className={`${inst.icon} text-2xl`} style={{ color: inst.color }} />
                    </div>
                    <h3 className="text-sm font-bold text-foreground-950 mb-1">{inst.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200">{inst.country}</span>
                    <p className="text-[11px] text-foreground-400 mt-2">{inst.domain}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BLOC 9 — KPI de Maturité LLM */}
          <section id="block-9" className="py-10 sm:py-14 bg-background-50 scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold font-heading" style={{ color: '#F97316' }}>09</span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">KPI de Maturité LLM</h2>
                  <p className="text-foreground-500 text-sm">Performance · Valeur Métier — Dashboard temps réel avec projections</p>
                </div>
              </div>

              {/* KPI View Toggle */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-full bg-background-200 p-1">
                  <button onClick={() => setKpiView('performance')} className={`px-5 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${kpiView === 'performance' ? 'bg-white text-foreground-950 shadow-sm' : 'text-foreground-500 hover:text-foreground-700'}`}>
                    <i className="ri-speed-up-line mr-1.5" />Performance (5)
                  </button>
                  <button onClick={() => setKpiView('business')} className={`px-5 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${kpiView === 'business' ? 'bg-white text-foreground-950 shadow-sm' : 'text-foreground-500 hover:text-foreground-700'}`}>
                    <i className="ri-money-dollar-circle-line mr-1.5" />Valeur Métier (5)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {activeKPIs.map((kpi: MaturityKPI) => {
                  const pct = Math.round((kpi.current / kpi.target) * 100);
                  const isInverse = kpi.id === 'hallucination';
                  const barColor = isInverse
                    ? (kpi.current <= kpi.target * 3 ? '#10B981' : kpi.current <= kpi.target * 6 ? '#F59E0B' : '#EF4444')
                    : (pct >= 90 ? '#10B981' : pct >= 70 ? '#F59E0B' : '#EF4444');

                  return (
                    <div key={kpi.id} className="rounded-2xl bg-white border border-background-200 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}12` }}>
                          <i className={`${kpi.icon} text-sm`} style={{ color: kpi.color }} />
                        </div>
                        <h3 className="text-xs font-bold text-foreground-900 leading-tight">{kpi.name}</h3>
                      </div>
                      <div className="text-2xl font-bold font-heading mb-1" style={{ color: barColor }}>
                        {kpi.id === 'revenue' ? formatFCFA(kpi.current) : kpi.current}
                        <span className="text-xs text-foreground-400 ml-1">{kpi.unit}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-foreground-400 mb-2">
                        <span>Cible : {kpi.id === 'revenue' ? formatFCFA(kpi.target) : kpi.target} {kpi.unit}</span>
                        <span className={kpi.trend > 0 ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>
                          {kpi.trend > 0 ? '+' : ''}{kpi.id === 'revenue' ? formatFCFA(kpi.trend) : kpi.trend}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-background-100 overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: barColor }} />
                      </div>
                      {kpi.subMetrics && (
                        <div className="mt-3 pt-3 border-t border-background-100 space-y-1">
                          {kpi.subMetrics.map(sub => (
                            <div key={sub.label} className="flex items-center justify-between text-[10px]">
                              <span className="text-foreground-500">{sub.label}</span>
                              <span className="font-bold text-foreground-700">
                                {sub.value}
                                <span className="text-foreground-400 font-normal"> / {sub.target}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Livrable Final Attendu */}
          <section className="py-12 sm:py-16 bg-white border-t border-background-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
                  <i className="ri-star-line text-amber-600 text-sm" />
                  <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">Livrable Final Attendu</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-3">
                  Chaque agent KOS produit désormais
                </h2>
                <p className="text-foreground-600 max-w-3xl mx-auto">
                  Le standard de qualité Big Four appliqué à l'IA générative. Validation croisée, traçabilité complète, amélioration continue.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { icon: 'ri-bar-chart-box-line', label: 'Analyse experte niveau Big Four', color: '#F59E0B' },
                  { icon: 'ri-git-branch-line', label: 'Validation croisée multi-LLM', color: '#8B5CF6' },
                  { icon: 'ri-bookmark-line', label: 'Références vérifiables', color: '#10B981' },
                  { icon: 'ri-lightbulb-line', label: 'Raisonnement explicite', color: '#0EA5E9' },
                  { icon: 'ri-rocket-2-line', label: 'Recommandations actionnables', color: '#EF4444' },
                  { icon: 'ri-file-text-line', label: 'Livrables prêts clients & régulateurs', color: '#14B8A6' },
                  { icon: 'ri-globe-line', label: 'Contenus optimisés SEO + GEO', color: '#EC4899' },
                  { icon: 'ri-database-2-line', label: 'Capitalisation automatique', color: '#6366F1' },
                  { icon: 'ri-refresh-line', label: 'Amélioration continue', color: '#F97316' },
                  { icon: 'ri-footprint-line', label: 'Traçabilité complète', color: '#78716C' },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl bg-background-50 border border-background-200 p-4 text-center hover:shadow-md transition-all cursor-default">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}12` }}>
                      <i className={`${item.icon} text-lg`} style={{ color: item.color }} />
                    </div>
                    <p className="text-xs font-bold text-foreground-900 leading-tight">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Cross-link Ecosystem */}
          <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                  Écosystème KOS — Formation & Intelligence LLM
                </h2>
                <p className="text-foreground-600">Accès rapide aux hubs connexes de l'écosystème IA KOS.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'LLM Excellence Engine', path: '/kos-llm-excellence-engine', icon: 'ri-award-line', color: '#F59E0B', current: true },
                  { label: 'Experts LLM Automates', path: '/kos-llm-experts-automates', icon: 'ri-cpu-line', color: '#F59E0B' },
                  { label: 'AI Governance & Ethics', path: '/kos-ai-governance-ethics', icon: 'ri-scales-3-line', color: '#8B5CF6' },
                  { label: 'AI Visibility Command', path: '/kos-ai-visibility-command', icon: 'ri-eye-2-line', color: '#0EA5E9' },
                  { label: 'Enterprise Brain OS', path: '/kos-enterprise-brain-os', icon: 'ri-brain-2-line', color: '#10B981' },
                  { label: 'Strategic Intelligence', path: '/kos-strategic-intelligence', icon: 'ri-mind-map', color: '#6366F1' },
                  { label: 'Knowledge Innovation', path: '/kos-knowledge-innovation-command', icon: 'ri-lightbulb-line', color: '#EC4899' },
                  { label: 'Research Institute', path: '/kos-research-institute', icon: 'ri-flask-line', color: '#14B8A6' },
                ].map(link => (
                  <a key={link.path} href={link.path} className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${
                    link.current ? 'border-amber-300 bg-amber-50/40 ring-2 ring-amber-400' : 'border-background-200 bg-white hover:border-foreground-200'
                  }`}>
                    <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}12` }}>
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
        </>
      )}
    </hubLayout>
  );
}





