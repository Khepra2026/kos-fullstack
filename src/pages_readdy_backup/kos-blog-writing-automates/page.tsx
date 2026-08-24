import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useBlogWritingAutomates } from '@/hooks/useBlogWritingAutomates';
import { dailyPipeline, weeklyPipelineStats, pipelineKPIs, type DailyArticleEntry, type WeeklyPipelineStats } from '@/mocks/blogWritingAutomates';
import type { blogWritingAutomate } from '@/hooks/useBlogWritingAutomates';

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

export default function blogWritingAutomatesPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const { automates, categories, kpis, isLive, loading, error, refetch } = useBlogWritingAutomates();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'automates' | 'pipeline'>('automates');

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

  const coreCategories = ['recherche-discovery', 'redaction-bigfour', 'seo-optimisation', 'distribution-syndication'];

  return (
    <hubLayout hubId={56}>
      <SeoHead
        title="KOS Blog Writing Automates™ — Rédaction Niveau Big Four | KHEPRA EXPERTS"
        description="24 automates de rédaction blog niveau Big Four : recherche, stratégie éditoriale, rédaction, SEO, relecture, visuels, distribution, analytics. 87,430+ tâches, 8,970+ pages optimisées."
        keywords="KOS Blog Writing Automates, rédaction automatisée Big Four, content marketing IA, SEO automatisé, blog writing AI, KHEPRA EXPERTS"
        canonicalPath="/kos-blog-writing-automates"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20editorial%20content%20creation%20atmosphere%20with%20warm%20amber%20and%20crimson%20tones%2C%20elegant%20journalism%20and%20publishing%20visualization%20with%20flowing%20text%20and%20writing%20motifs%2C%20sophisticated%20newsroom%20aesthetic%20with%20rich%20textures%2C%20geometric%20typography-inspired%20patterns%20suggesting%20creativity%20and%20intellect%2C%20no%20text%20no%20human%20figures%2C%20premium%20content%20studio%20ambiance&width=1920&height=600&seq=kos-blog-hero&orientation=landscape"
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
                <i className="ri-quill-pen-line text-amber-400 text-sm" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                  KOS Blog Writing Automates™
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm animate-pulse">
                <i className="ri-file-code-line text-emerald-400 text-sm" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                  Master Prompt Active
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
              La rédaction augmentée.
              <span className="block text-amber-400 mt-2">25 automates niveau Big Four.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              <strong className="text-white">{kpis.total_agents} automates</strong> répartis sur <strong className="text-white">{kpis.categories} domaines</strong> de la chaîne éditoriale.{' '}
              De la recherche de sujets à l'analyse de performance.{' '}
              <strong className="text-white">{kpis.total_tasks.toLocaleString()}+ tâches</strong> complétées.{' '}
              <strong className="text-white">{kpis.articles_published.toLocaleString()}+ articles</strong> publiés.
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
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-400/30 backdrop-blur-sm">
                <i className="ri-robot-line text-teal-400" />
                <span className="text-sm text-teal-300 font-semibold">{kpis.auto_enabled} Auto</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <i className="ri-file-code-line text-emerald-400" />
                <span className="text-sm text-emerald-300 font-semibold">Master Prompt v1.0</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/20 border border-amber-400/30 backdrop-blur-sm">
                <span className="text-sm text-amber-300 font-semibold">{kpis.avg_success_rate}% succès</span>
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
      <section className="py-4 bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-10 gap-3">
            {[
              { label: 'Total', value: String(kpis.total_agents), icon: 'ri-quill-pen-line', color: '#BE123C' },
              { label: 'Déployés', value: String(kpis.deployed), icon: 'ri-checkbox-circle-line', color: '#86BC25' },
              { label: 'Partiels', value: String(kpis.partial), icon: 'ri-time-line', color: '#E8C547' },
              { label: 'Auto', value: String(kpis.auto_enabled), icon: 'ri-refresh-line', color: '#EA580C' },
              { label: 'Tâches', value: (kpis.total_tasks / 1000).toFixed(0) + 'K', icon: 'ri-task-line', color: '#BE123C' },
              { label: 'Critiques', value: String(kpis.critical_agents), icon: 'ri-error-warning-line', color: '#DC2626' },
              { label: 'Articles', value: (kpis.articles_published / 1000).toFixed(1) + 'K', icon: 'ri-article-line', color: '#BE123C' },
              { label: 'SEO Optim.', value: (kpis.seo_optimizations / 1000).toFixed(1) + 'K', icon: 'ri-search-line', color: '#86BC25' },
              { label: 'Visuels', value: (kpis.visual_assets / 1000).toFixed(1) + 'K', icon: 'ri-image-edit-line', color: '#0D7B5F' },
              { label: 'Catégories', value: String(kpis.categories), icon: 'ri-stack-line', color: '#9B7B2C' },
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

      {/* View Mode Toggle */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2">
          <button
            onClick={() => setViewMode('automates')}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold cursor-pointer transition-all flex items-center gap-2 ${
              viewMode === 'automates' ? 'bg-foreground-950 text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
            }`}
          >
            <i className="ri-quill-pen-line"></i>
            25 Automates
          </button>
          <button
            onClick={() => setViewMode('pipeline')}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold cursor-pointer transition-all flex items-center gap-2 ${
              viewMode === 'pipeline' ? 'bg-foreground-950 text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
            }`}
          >
            <i className="ri-road-map-line"></i>
            Pipeline Quotidien
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">{pipelineKPIs.articles_this_week}/{pipelineKPIs.target_weekly}</span>
          </button>
        </div>
      </div>

      {/* Category & Status Filters */}
      {viewMode === 'automates' && (
      <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
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
      )}

      {/* Category Overview Grid */}
      {viewMode === 'automates' && (
      <section className="py-8 sm:py-10 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              8 Domaines — Chaîne de Valeur Éditoriale Big Four
            </h2>
            <p className="text-foreground-600">De la recherche de sujets à l'analyse de performance, chaque maillon de la production éditoriale est automatisé.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryStats.map(cat => {
              const deployPct = cat.count > 0 ? Math.round((cat.deployed / cat.count) * 100) : 0;
              const isCore = coreCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => { setCategoryFilter(cat.id); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                  className="rounded-2xl bg-white border border-background-200 p-5 text-center hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
                >
                  {isCore && (
                    <div className="absolute top-3 right-3">
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold border border-amber-200">COEUR</span>
                    </div>
                  )}
                  <div className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                    <i className={`${cat.icon} text-2xl`} style={{ color: cat.color }} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-1 font-heading">{cat.name}</h3>
                  <p className="text-xs text-foreground-500 line-clamp-3 mb-3">{cat.description}</p>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span style={{ color: '#86BC25' }} className="font-bold">{cat.deployed} déployés</span>
                    {cat.partial > 0 && (
                      <>
                        <span className="text-foreground-300">·</span>
                        <span style={{ color: '#E8C547' }} className="font-bold">{cat.partial} partiels</span>
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
      )}

      {/* Pipeline View */}
      {viewMode === 'pipeline' && (
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Pipeline Header Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-foreground-950">{pipelineKPIs.articles_this_week}/{pipelineKPIs.target_weekly}</div>
                <div className="text-xs text-foreground-500">Cette Semaine</div>
                <div className="w-full h-1.5 bg-background-200/70 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${pipelineKPIs.completion_rate}%` }} />
                </div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-green-600">{pipelineKPIs.articles_last_week}</div>
                <div className="text-xs text-foreground-500">Sem. Passée</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-accent-500">{pipelineKPIs.articles_in_pipeline}</div>
                <div className="text-xs text-foreground-500">En Pipeline</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-foreground-950">{pipelineKPIs.drafts_ready}</div>
                <div className="text-xs text-foreground-500">Brouillons Prêts</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-blue-600">{pipelineKPIs.reviews_pending}</div>
                <div className="text-xs text-foreground-500">En Revue</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-amber-600">{pipelineKPIs.avg_daily_output}</div>
                <div className="text-xs text-foreground-500">Articles/Jour</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-foreground-950">{pipelineKPIs.streak_days}</div>
                <div className="text-xs text-foreground-500">Série Jours</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-green-600">{pipelineKPIs.estimated_weekly_traffic.toLocaleString()}</div>
                <div className="text-xs text-foreground-500">Trafic Est. /Sem.</div>
              </div>
            </div>

            {/* Weekly Progress Comparison */}
            <div className="mb-8">
              <h2 className="font-heading text-xl font-bold text-foreground-950 mb-4">Progression Hebdomadaire — Cible 10 Articles/Semaine</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {weeklyPipelineStats.map((week) => (
                  <div key={week.week_start} className={`p-5 rounded-lg border ${week.published >= week.target ? 'border-green-200 bg-green-50/30' : week.published > 0 ? 'border-amber-200 bg-amber-50/30' : 'border-background-200 bg-background-50'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-foreground-950">{week.week_label}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${week.published >= week.target ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {week.published >= week.target ? 'CIBLE ATTEINTE' : `${Math.round((week.published / week.target) * 100)}%`}
                      </span>
                    </div>
                    <div className="flex items-end justify-between mb-3">
                      <span className="text-3xl font-bold text-foreground-950">{week.published}<span className="text-lg text-foreground-400 font-normal">/{week.target}</span></span>
                      <div className="text-xs text-foreground-500 text-right">
                        {week.scheduled > 0 && <div><span className="text-blue-600 font-bold">{week.scheduled}</span> programmés</div>}
                        {week.in_review > 0 && <div><span className="text-amber-600 font-bold">{week.in_review}</span> en revue</div>}
                        {week.drafted > 0 && <div><span className="text-gray-500 font-bold">{week.drafted}</span> brouillons</div>}
                      </div>
                    </div>
                    <div className="w-full h-2 bg-background-200/70 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${week.published >= week.target ? 'bg-green-500' : week.published >= 5 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${Math.min((week.published / week.target) * 100, 100)}%` }} />
                    </div>
                    {week.avg_seo_score && (
                      <div className="flex items-center gap-3 mt-3 text-xs text-foreground-400">
                        <span>SEO: <strong className="text-foreground-700">{week.avg_seo_score}%</strong></span>
                        <span>Qualité: <strong className="text-foreground-700">{week.avg_quality_score}/10</strong></span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Pipeline Table */}
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground-950 mb-4">Pipeline Quotidien — 10 Prochains Articles</h2>
              <div className="bg-background-50 rounded-lg border border-background-200/70 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-background-200/70 bg-background-100">
                        <th className="text-left px-4 py-3 text-xs font-bold text-foreground-400 uppercase whitespace-nowrap">Date</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-foreground-400 uppercase whitespace-nowrap">Titre</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-foreground-400 uppercase whitespace-nowrap">Auteur</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-foreground-400 uppercase whitespace-nowrap">Catégorie</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-foreground-400 uppercase whitespace-nowrap">Statut</th>
                        <th className="text-right px-4 py-3 text-xs font-bold text-foreground-400 uppercase whitespace-nowrap">Mots</th>
                        <th className="text-right px-4 py-3 text-xs font-bold text-foreground-400 uppercase whitespace-nowrap">SEO</th>
                        <th className="text-right px-4 py-3 text-xs font-bold text-foreground-400 uppercase whitespace-nowrap">Qualité</th>
                        <th className="text-right px-4 py-3 text-xs font-bold text-foreground-400 uppercase whitespace-nowrap">Trafic Est.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dailyPipeline.map((article, i) => (
                        <tr key={i} className="border-b border-background-200/70 hover:bg-background-100/50 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-xs font-semibold text-foreground-950">{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</div>
                            <div className="text-[10px] text-foreground-400">{article.day}</div>
                          </td>
                          <td className="px-4 py-3 max-w-xs">
                            <div className="text-xs text-foreground-800 line-clamp-2 leading-snug">{article.title}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-xs text-foreground-600">{article.author}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700">{article.category}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {article.status === 'published' && <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Publié</span>}
                            {article.status === 'scheduled' && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">Programmé</span>}
                            {article.status === 'in_review' && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">En Revue</span>}
                            {article.status === 'draft' && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">Brouillon</span>}
                          </td>
                          <td className="px-4 py-3 text-right text-xs text-foreground-600 whitespace-nowrap">{article.word_count.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right whitespace-nowrap">
                            {article.seo_score ? <span className={`text-xs font-bold ${article.seo_score >= 90 ? 'text-green-600' : 'text-amber-600'}`}>{article.seo_score}%</span> : <span className="text-xs text-foreground-300">—</span>}
                          </td>
                          <td className="px-4 py-3 text-right whitespace-nowrap">
                            {article.quality_score ? <span className={`text-xs font-bold ${article.quality_score >= 9 ? 'text-green-600' : 'text-amber-600'}`}>{article.quality_score}/10</span> : <span className="text-xs text-foreground-300">—</span>}
                          </td>
                          <td className="px-4 py-3 text-right text-xs text-foreground-600 whitespace-nowrap">{article.estimated_traffic.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Auto-Generation Status */}
            <div className="mt-8 p-5 bg-background-50 rounded-lg border border-background-200/70">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <h3 className="text-sm font-bold text-foreground-950">Statut Génération Automatique</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">ACTIF</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-foreground-600">
                <div className="flex items-center gap-2">
                  <i className="ri-timer-line text-foreground-400"></i>
                  Prochaine génération : <strong className="text-foreground-950">Demain 06:00 UTC</strong>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-article-line text-foreground-400"></i>
                  Articles générés aujourd'hui : <strong className="text-foreground-950">2</strong>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-check-double-line text-foreground-400"></i>
                  Qualité moyenne cette semaine : <strong className="text-green-600">9.1/10</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Automates Grid */}
      {viewMode === 'automates' && (
      <section className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              8 Domaines — Chaîne de Valeur Éditoriale Big Four
            </h2>
            <p className="text-foreground-600">De la recherche de sujets à l'analyse de performance, chaque maillon de la production éditoriale est automatisé.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryStats.map(cat => {
              const deployPct = cat.count > 0 ? Math.round((cat.deployed / cat.count) * 100) : 0;
              const isCore = coreCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => { setCategoryFilter(cat.id); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                  className="rounded-2xl bg-white border border-background-200 p-5 text-center hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
                >
                  {isCore && (
                    <div className="absolute top-3 right-3">
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold border border-amber-200">COEUR</span>
                    </div>
                  )}
                  <div className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                    <i className={`${cat.icon} text-2xl`} style={{ color: cat.color }} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-1 font-heading">{cat.name}</h3>
                  <p className="text-xs text-foreground-500 line-clamp-3 mb-3">{cat.description}</p>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span style={{ color: '#86BC25' }} className="font-bold">{cat.deployed} déployés</span>
                    {cat.partial > 0 && (
                      <>
                        <span className="text-foreground-300">·</span>
                        <span style={{ color: '#E8C547' }} className="font-bold">{cat.partial} partiels</span>
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
      )}

      {/* Chaîne de Valeur Éditoriale */}
      {viewMode === 'automates' && (
      <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              Chaîne de Valeur Éditoriale — 8 Maillons Automatisés
            </h2>
            <p className="text-foreground-600">De l'idée à l'analyse de performance, une chaîne de production de contenu orchestrée par les automates KOS.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[
              { id: 'recherche-discovery', label: 'Recherche & Discovery', icon: 'ri-search-eye-line', color: '#059669', desc: 'Trends · Keywords · Concurrence' },
              { id: 'strategie-editoriale', label: 'Stratégie Éditoriale', icon: 'ri-calendar-check-line', color: '#EA580C', desc: 'Calendrier · Formats · Personas' },
              { id: 'redaction-bigfour', label: 'Rédaction Big Four', icon: 'ri-quill-pen-line', color: '#BE123C', desc: 'Long-form · Case Studies · Briefs' },
              { id: 'seo-optimisation', label: 'SEO & AEO', icon: 'ri-search-line', color: '#86BC25', desc: 'On-Page · Snippets · Sémantique' },
              { id: 'relecture-qualite', label: 'Relecture & Qualité', icon: 'ri-check-double-line', color: '#9B7B2C', desc: 'Fact-Check · Plagiat · Tone' },
              { id: 'enrichissement-visuel', label: 'Visuels & Data', icon: 'ri-image-edit-line', color: '#0D7B5F', desc: 'Infographies · Diagrammes · Images' },
              { id: 'distribution-syndication', label: 'Distribution', icon: 'ri-share-forward-line', color: '#DC2626', desc: 'LinkedIn · Newsletter · Cross-Canal' },
              { id: 'analytics-performance', label: 'Analytics & ROI', icon: 'ri-bar-chart-grouped-line', color: '#8B3040', desc: 'SEO · Attribution · Optimisation' },
            ].map(layer => {
              const count = automates.filter(a => a.category === layer.id).length;
              const deployed = automates.filter(a => a.category === layer.id && a.status === 'deployed').length;
              return (
                <div key={layer.id} className="rounded-2xl bg-white border border-background-200 p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: layer.color }} />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${layer.color}15` }}>
                    <i className={`${layer.icon} text-xl`} style={{ color: layer.color }} />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-foreground-950 mb-1">{layer.label}</h3>
                  <p className="text-xs text-foreground-500 mb-3">{layer.desc}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold" style={{ color: '#86BC25' }}>{deployed}/{count}</span>
                    <span className="text-foreground-400">déployés</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* Agent #25 — Master Prompt Template Highlight */}
      {viewMode === 'automates' && (
      <section className="py-12 sm:py-16 bg-gradient-to-r from-background-100 to-amber-50/30 border-t border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border-2 border-amber-300/60 p-6 sm:p-8 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-[#BE123C]" />
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Master Prompt Active
              </span>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-1" style={{ backgroundColor: '#BE123C15' }}>
                <i className="ri-file-code-line text-2xl" style={{ color: '#BE123C' }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#BE123C]/10 text-[#BE123C] font-bold border border-[#BE123C]/20">AGENT #25</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold border border-amber-200">CRITIQUE</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold border border-emerald-200">DÉPLOYÉ</span>
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground-950 mb-2">
                  Master Prompt Template — Structure Big Four
                </h2>
                <p className="text-sm text-foreground-600 leading-relaxed mb-4">
                  Template maître de génération d\'articles niveau McKinsey/Deloitte/PwC. Structure obligatoire en <strong>9 sections</strong> : Executive Insight (niveau COMEX), Contexte Macroéconomique & Réglementaire (BCEAO/OHADA/COBAC), Diagnostic du Problème, Analyse Experte Big Four, Solutions Stratégiques Khepra Experts, <strong>Framework Exclusif Propriétaire</strong> (lead magnet), Cas d\'Usage Afrique Réelle, Implications Stratégiques, Call-to-Action Premium. Optimisation <strong>SEO + GEO + EEAT</strong> intégrée.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                  {[
                    { label: 'Articles générés', value: '3,250', icon: 'ri-article-line' },
                    { label: 'Score SEO moyen', value: '90.8/100', icon: 'ri-search-line' },
                    { label: 'Frameworks KOS', value: '8', icon: 'ri-lightbulb-line' },
                    { label: 'Taux succès', value: '94.2%', icon: 'ri-check-double-line' },
                    { label: 'Sections struct.', value: '9', icon: 'ri-stack-line' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center py-2 px-3 rounded-lg bg-background-50 border border-background-200/70">
                      <i className={`${stat.icon} text-sm mb-1 block`} style={{ color: '#BE123C' }} />
                      <span className="block text-lg font-bold text-foreground-950 font-heading">{stat.value}</span>
                      <span className="text-[10px] text-foreground-400 whitespace-nowrap">{stat.label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] px-2 py-1 rounded-full bg-background-100 text-foreground-500 border border-background-200">9-Section Framework Engine</span>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-background-100 text-foreground-500 border border-background-200">Executive Insight Generator</span>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-background-100 text-foreground-500 border border-background-200">Framework Proprietary Builder</span>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-background-100 text-foreground-500 border border-background-200">SEO/GEO/EEAT Integrator</span>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-background-100 text-foreground-500 border border-background-200">Lead Magnet PDF Converter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Cross-link */}
      {viewMode === 'automates' && (
      <section className="py-12 sm:py-16 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              Écosystème KOS — Contenu & Éditorial
            </h2>
            <p className="text-foreground-600">Accès rapide aux modules connexes de production de contenu.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Blog Writing Automates', path: '/kos-blog-writing-automates', icon: 'ri-quill-pen-line', color: '#BE123C', current: true },
              { label: 'Blog KHEPRA', path: '/blog', icon: 'ri-article-line', color: '#EA580C' },
              { label: 'Think Tank Automates', path: '/kos-think-tank-automates', icon: 'ri-lightbulb-line', color: '#8B3040' },
              { label: 'SEO & AEO Command', path: '/kos-seo-aeo-command', icon: 'ri-search-line', color: '#86BC25' },
              { label: 'Social Media Command', path: '/kos-social-media-command', icon: 'ri-linkedin-line', color: '#DC2626' },
              { label: 'Content Correction Engine', path: '/kos-content-correction-engine', icon: 'ri-tools-line', color: '#9B7B2C' },
              { label: 'Research Institute', path: '/kos-research-institute', icon: 'ri-microscope-line', color: '#0D7B5F' },
              { label: 'KOS Dashboard', path: '/kos-dashboard', icon: 'ri-dashboard-line', color: '#059669' },
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
      )}
    </hubLayout>
  );
}



