import { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/feature/SeoHead';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { useKOSFullBlockExecution } from '@/hooks/useKOSFullBlockExecution';
import { AnimatedCounter } from '@/components/base/AnimatedCounter';

const TABS = [
  { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-3-line' },
  { id: 'conformite', label: 'Conformité', icon: 'ri-scales-3-line' },
  { id: 'editorial', label: 'Qualité Rédactionnelle', icon: 'ri-quill-pen-line' },
  { id: 'seo-geo', label: 'SEO & GEO', icon: 'ri-globe-line' },
  { id: 'pipeline', label: 'Pipeline Publications', icon: 'ri-file-add-line' },
];

export default function KOSFullBlockExecutionPage() {
  const {
    loading, error, isLive, activeTab, setActiveTab,
    selectedPillar, setSelectedPillar,
    expandedBlock, setExpandedBlock,
    pubFilter, setPubFilter,
    articleFilter, setArticleFilter,
    pillars, blocks, publications, articleAudits, kpis,
    filteredBlocks, filteredPubs, filteredArticles,
    pillarBlocks,
    getStatusColor, getStatusLabel, getPriorityColor, getScoreColor, getScoreBg,
    refresh,
  } = useKOSFullBlockExecution();

  const [executingBlock, setExecutingBlock] = useState<string | null>(null);

  const handleExecuteBlock = (blockId: string) => {
    setExecutingBlock(blockId);
    setTimeout(() => setExecutingBlock(null), 2500);
  };

  if (loading) {
    return (
      <>
        <SeoHead title="KOS Full Block Execution — KHEPRA EXPERTS" description="Exécution en bloc — Corrections conformité, révision éditoriale, publications SEO/GEO" canonicalPath="/kos-full-block-execution" noIndex={true} />
        <KOSHubLayout hubId={121} activeTab="Full Block Exec" tabLabel="Full Block Execution">
          <div className="min-h-screen bg-background-50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm text-foreground-700">Initialisation du moteur d&apos;exécution en bloc...</p>
            </div>
          </div>
        </KOSHubLayout>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SeoHead title="KOS Full Block Execution — KHEPRA EXPERTS" description="Exécution en bloc" canonicalPath="/kos-full-block-execution" noIndex={true} />
        <KOSHubLayout hubId={121} activeTab="Full Block Exec" tabLabel="Full Block Execution">
          <div className="min-h-screen bg-background-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 max-w-md text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-100 text-red-600">
                <i className="ri-error-warning-line text-2xl"></i>
              </div>
              <p className="text-sm text-foreground-700">{error}</p>
              <button type="button" onClick={refresh} className="px-4 py-2 rounded-lg bg-accent-500 text-background-50 text-sm font-semibold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-refresh-line mr-1.5"></i>Réessayer
              </button>
            </div>
          </div>
        </KOSHubLayout>
      </>
    );
  }

  return (
    <>
      <SeoHead title="KOS Full Block Execution Command Center — KHEPRA EXPERTS" description="Exécution en bloc : Corrections conformité réglementaire, révision éditoriale Big Four, publications SEO/GEO stratégiques. 3 piliers, 104 actions, cible 100% Big Four." canonicalPath="/kos-full-block-execution" noIndex={true} />
      <KOSHubLayout hubId={121} activeTab="Full Block Exec" tabLabel="Full Block Execution">
        <div className="bg-background-50 min-h-screen">

          {/* ================================ HERO HEADER ================================ */}
          <section className="bg-gradient-to-b from-background-100 to-background-50 border-b border-background-200/70">
            <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-accent-100 text-accent-700 shrink-0">
                    <i className="ri-rocket-2-line text-2xl"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-accent-100 text-accent-700">BLOCK EXECUTION</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-700">{kpis.criticalRemaining} CRITIQUES</span>
                      {isLive && <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 animate-pulse">LIVE DB</span>}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground-950">KOS Full Block Execution Command Center</h1>
                    <p className="text-sm text-foreground-600 mt-1.5 max-w-2xl">
                      Exécution en bloc des mises à jour : corrections conformité réglementaire, révision complète qualité rédactionnelle, création publications SEO/GEO. Cible : 100% Big Four sur les 3 piliers.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-5 shrink-0">
                  <div className="text-center">
                    <span className={`text-2xl font-bold ${getScoreColor(kpis.overallCurrent)}`}>{kpis.overallCurrent}%</span>
                    <span className="text-[10px] font-medium text-foreground-500 block">Score Global</span>
                  </div>
                  <div className="w-px h-10 bg-background-200/70"></div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-foreground-950">{kpis.completedActions}/{kpis.totalActions}</span>
                    <span className="text-[10px] font-medium text-foreground-500 block">Actions</span>
                  </div>
                  <div className="w-px h-10 bg-background-200/70"></div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-red-600">{kpis.criticalRemaining}</span>
                    <span className="text-[10px] font-medium text-foreground-500 block">Critiques</span>
                  </div>
                </div>
              </div>

              {/* KPIs Row */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mt-6">
                {[
                  { label: 'Conformité', value: kpis.bigFourComplianceCurrent, target: kpis.bigFourComplianceTarget },
                  { label: 'Éditorial', value: kpis.bigFourEditorialCurrent, target: kpis.bigFourEditorialTarget },
                  { label: 'SEO/GEO', value: kpis.bigFourSEOCurrent, target: kpis.bigFourSEOTarget },
                  { label: 'Articles Audit', value: kpis.articlesAuditedTotal, target: kpis.articlesAuditedTotal, suffix: '' },
                  { label: 'Nouvelles Pubs', value: kpis.newPublicationsPlanned, target: kpis.newPublicationsPlanned, suffix: '' },
                  { label: 'Effort Estimé', value: 135, target: 135, suffix: 'h', format: false },
                ].map((item, i) => (
                  <div key={item.label} className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
                    <div className={`text-2xl font-bold ${i < 3 ? getScoreColor(item.value as number) : 'text-foreground-950'}`}>
                      {typeof item.value === 'number' && item.format !== false
                        ? <><AnimatedCounter value={item.value} />%</>
                        : <>{item.value}{item.suffix}</>
                      }
                    </div>
                    <div className="text-xs text-foreground-600 mt-1">{item.label}</div>
                    {i < 3 && (
                      <div className="mt-2 h-1.5 bg-background-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${getScoreBg(item.value as number)}`} style={{ width: `${item.value}%` }}></div>
                      </div>
                    )}
                    {i >= 3 && (
                      <div className="text-[10px] text-foreground-500 mt-1">/ {item.target}{typeof item.target === 'number' && item.target > 20 ? '' : ''}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================================ TAB SWITCHER ================================ */}
          <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
            <div className="max-w-[1440px] mx-auto px-4 md:px-6">
              <div className="flex items-center gap-1 py-2 overflow-x-auto">
                {TABS.map(tab => (
                  <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSelectedPillar(null); }}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      activeTab === tab.id ? 'bg-accent-500 text-background-50' : 'text-foreground-600 hover:text-foreground-900 hover:bg-background-100'
                    }`} type="button">
                    <i className={`${tab.icon} text-sm`}></i>{tab.label}
                  </button>
                ))}
                <Link to="/kos-dashboard" className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-foreground-500 hover:text-foreground-900 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-apps-line text-sm"></i>Dashboard
                  <i className="ri-arrow-right-up-line text-xs"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* ================================ CONTENT AREA ================================ */}
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">
            {/* ==================== OVERVIEW TAB ==================== */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-lg font-semibold text-foreground-950 mb-6">Progression Globale — 3 Piliers</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {pillars.map(pillar => (
                    <button key={pillar.pillarId} onClick={() => { setActiveTab(pillar.pillarId); setSelectedPillar(null); }}
                      className="bg-background-50 rounded-2xl border border-background-200/70 p-6 text-left hover:border-background-300/60 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: pillar.color + '15' }}>
                          <i className={`${pillar.icon} text-xl`} style={{ color: pillar.color }}></i>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-foreground-950">{pillar.pillarName}</h3>
                          <p className="text-xs text-foreground-600 mt-0.5">{pillar.blocksCompleted}/{pillar.blocksTotal} blocs · {pillar.completedActions}/{pillar.totalActions} actions</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-1">
                          <div className="h-2.5 bg-background-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${pillar.currentScore}%`, backgroundColor: pillar.color }}></div>
                          </div>
                        </div>
                        <span className={`text-lg font-bold ${getScoreColor(pillar.currentScore)}`}>{pillar.currentScore}%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-foreground-600">
                        <span>Cible: {pillar.targetScore}%</span>
                        {pillar.criticalRemaining > 0 && <span className="text-red-600 font-medium">{pillar.criticalRemaining} critiques</span>}
                        {pillar.criticalRemaining === 0 && <span className="text-accent-500 font-medium">Aucun critique</span>}
                      </div>
                      <div className="text-xs text-foreground-500 mt-1">Fin estimée: {pillar.estimatedCompletion}</div>
                    </button>
                  ))}
                </div>

                {/* Block Summary Cards */}
                <h2 className="text-lg font-semibold text-foreground-950 mb-4">Blocs d&apos;Exécution Actifs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {blocks.filter(b => b.status === 'in_progress').slice(0, 8).map(block => (
                    <div key={block.blockId} className="bg-background-50 rounded-xl border border-background-200/70 p-4 hover:border-background-300/60 transition-colors cursor-pointer"
                      onClick={() => { setActiveTab(block.pillarId); setExpandedBlock(block.blockId); }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(block.priority)}`}>{block.priority}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(block.status)}`}>{getStatusLabel(block.status)}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <i className={`${block.icon} text-sm`} style={{ color: block.color }}></i>
                        <span className="text-sm font-medium text-foreground-950 line-clamp-2">{block.blockName}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-foreground-600">
                        <span>{block.completedActions}/{block.totalActions} actions</span>
                        {block.criticalActions > 0 && <span className="text-red-600">{block.criticalActions} critiques</span>}
                      </div>
                      <div className="mt-2 h-1.5 bg-background-200 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{
                          width: `${(block.completedActions / block.totalActions) * 100}%`,
                          backgroundColor: block.color,
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Article Compliance Quick View */}
                <h2 className="text-lg font-semibold text-foreground-950 mt-8 mb-4">Audit Conformité Articles — Top Issues</h2>
                <div className="bg-background-50 rounded-2xl border border-background-200/70 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-background-100/50 border-b border-background-200/70">
                        <tr>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-700">Article</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-700">Catégorie</th>
                          <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-700">Rég.</th>
                          <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-700">Édito.</th>
                          <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-700">SEO</th>
                          <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-700">GEO</th>
                          <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-700">Issues</th>
                          <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-700">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-background-200/50">
                        {articleAudits.filter(a => a.status !== 'compliant').slice(0, 6).map(article => (
                          <tr key={article.articleId} className="hover:bg-background-100/30 transition-colors">
                            <td className="px-4 py-3 text-xs text-foreground-950 max-w-[240px] truncate">{article.articleTitle}</td>
                            <td className="px-4 py-3 text-xs text-foreground-600">{article.category}</td>
                            <td className="px-4 py-3 text-center"><span className={`text-xs font-medium ${getScoreColor(article.regulatoryScore)}`}>{article.regulatoryScore}</span></td>
                            <td className="px-4 py-3 text-center"><span className={`text-xs font-medium ${getScoreColor(article.editorialScore)}`}>{article.editorialScore}</span></td>
                            <td className="px-4 py-3 text-center"><span className={`text-xs font-medium ${getScoreColor(article.seoScore)}`}>{article.seoScore}</span></td>
                            <td className="px-4 py-3 text-center"><span className={`text-xs font-medium ${getScoreColor(article.geoScore)}`}>{article.geoScore}</span></td>
                            <td className="px-4 py-3 text-center">
                              <span className="text-xs">{article.issuesFixed}/{article.issuesFound + article.issuesFixed}</span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(article.status)}`}>{getStatusLabel(article.status)}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== PILLAR TABS (CONFORMITE / EDITORIAL / SEO-GEO) ==================== */}
            {(activeTab === 'conformite' || activeTab === 'editorial' || activeTab === 'seo-geo') && (
              <div>
                {(() => {
                  const pillar = pillars.find(p => p.pillarId === activeTab)!;
                  const pBlocks = pillarBlocks(activeTab);
                  return (
                    <>
                      {/* Pillar Header */}
                      <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6 mb-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: pillar.color + '15' }}>
                              <i className={`${pillar.icon} text-xl`} style={{ color: pillar.color }}></i>
                            </div>
                            <div>
                              <h2 className="text-lg font-semibold text-foreground-950">{pillar.pillarName}</h2>
                              <p className="text-sm text-foreground-600 mt-0.5">{pillar.description}</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className={`text-3xl font-bold ${getScoreColor(pillar.currentScore)}`}>{pillar.currentScore}%</div>
                            <div className="text-xs text-foreground-500">Cible: {pillar.targetScore}%</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-foreground-600">
                          <span><span className="font-medium text-foreground-950">{pillar.blocksCompleted}/{pillar.blocksTotal}</span> blocs complétés</span>
                          <span>·</span>
                          <span><span className="font-medium text-foreground-950">{pillar.completedActions}/{pillar.totalActions}</span> actions</span>
                          <span>·</span>
                          {pillar.criticalRemaining > 0 && <span className="text-red-600 font-medium">{pillar.criticalRemaining} critiques restants</span>}
                          {pillar.criticalRemaining === 0 && <span className="text-accent-500 font-medium">Aucun critique</span>}
                          <span>·</span>
                          <span>Fin estimée: <span className="font-medium text-foreground-950">{pillar.estimatedCompletion}</span></span>
                        </div>
                      </div>

                      {/* Execution Blocks */}
                      <div className="space-y-4">
                        {pBlocks.map(block => (
                          <div key={block.blockId} className="bg-background-50 rounded-2xl border border-background-200/70 overflow-hidden">
                            <button onClick={() => setExpandedBlock(expandedBlock === block.blockId ? null : block.blockId)}
                              className="w-full flex items-center justify-between p-5 hover:bg-background-100/50 transition-colors cursor-pointer">
                              <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className="flex items-center gap-2 shrink-0">
                                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColor(block.priority)}`}>{block.priority}</span>
                                </div>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: block.color + '15' }}>
                                  <i className={`${block.icon} text-lg`} style={{ color: block.color }}></i>
                                </div>
                                <div className="text-left min-w-0 flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-semibold text-foreground-950">{block.blockName}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(block.status)}`}>{getStatusLabel(block.status)}</span>
                                  </div>
                                  <div className="flex items-center gap-3 mt-1 text-xs text-foreground-600">
                                    <span>{block.completedActions}/{block.totalActions} actions</span>
                                    {block.criticalActions > 0 && <span className="text-red-600">{block.criticalActions} critiques</span>}
                                    <span className="hidden sm:inline">·</span>
                                    <span className="hidden sm:inline">{block.estimatedEffort}</span>
                                    <span className="hidden sm:inline">·</span>
                                    <span className="hidden sm:inline">{block.assignedAgent}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 shrink-0 ml-4">
                                <div className="text-right hidden lg:block">
                                  <div className="text-xs text-foreground-500 max-w-[180px] truncate">{block.impactEstimate}</div>
                                </div>
                                <i className={`ri-${expandedBlock === block.blockId ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-600`}></i>
                              </div>
                            </button>
                            {expandedBlock === block.blockId && (
                              <div className="px-5 pb-5 border-t border-background-200/70 pt-4">
                                <p className="text-sm text-foreground-700 mb-4">{block.description}</p>
                                <div className="space-y-2">
                                  {block.actions.map(action => (
                                    <div key={action.actionId} className="flex items-start gap-3 p-3 rounded-xl bg-background-100/50">
                                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                        action.status === 'completed' ? 'bg-accent-100 text-accent-600' :
                                        action.status === 'in_progress' ? 'bg-secondary-100 text-secondary-600' : 'bg-background-200 text-foreground-400'
                                      }`}>
                                        <i className={`text-xs ${
                                          action.status === 'completed' ? 'ri-check-line' :
                                          action.status === 'in_progress' ? 'ri-loader-4-line animate-spin' : 'ri-time-line'
                                        }`}></i>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                          <span className={`text-xs px-1.5 py-0.5 rounded ${action.severity === 'critical' ? 'bg-red-100 text-red-700' : action.severity === 'major' ? 'bg-amber-100 text-amber-700' : 'bg-secondary-100 text-secondary-700'}`}>
                                            {action.severity === 'critical' ? 'CRITIQUE' : action.severity === 'major' ? 'MAJEUR' : 'MINEUR'}
                                          </span>
                                          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(action.status)}`}>{getStatusLabel(action.status)}</span>
                                        </div>
                                        <div className="text-sm font-medium text-foreground-950">{action.title}</div>
                                        <div className="text-xs text-foreground-600 mt-1">{action.description}</div>
                                        <div className="flex items-center gap-4 mt-2 text-xs">
                                          <span className="text-foreground-500">Avant: <span className="text-red-600">{action.kpiBefore}</span></span>
                                          <span className="text-foreground-300">→</span>
                                          <span className="text-foreground-500">Après: <span className="text-accent-500">{action.kpiAfter}</span></span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-background-200/70 text-xs text-foreground-600">
                                  <span>Agent: <span className="font-medium text-foreground-950">{block.assignedAgent}</span></span>
                                  <span>Deadline: <span className="font-medium text-foreground-950">{block.deadline}</span></span>
                                  {block.status === 'in_progress' && (
                                    <button type="button" onClick={(e) => { e.stopPropagation(); handleExecuteBlock(block.blockId); }}
                                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-500 text-background-50 text-xs font-semibold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap">
                                      {executingBlock === block.blockId ? (
                                        <><i className="ri-loader-4-line animate-spin"></i>Exécution...</>
                                      ) : (
                                        <><i className="ri-play-fill"></i>Exécuter le bloc</>
                                      )}
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {/* ==================== PIPELINE TAB ==================== */}
            {activeTab === 'pipeline' && (
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <h2 className="text-lg font-semibold text-foreground-950">Pipeline Publications SEO/GEO — {publications.length} articles</h2>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { id: 'all', label: 'Tous' },
                      { id: 'published', label: 'Publiés' },
                      { id: 'in_review', label: 'En revue' },
                      { id: 'draft', label: 'Brouillons' },
                      { id: 'planned', label: 'Planifiés' },
                    ].map(f => (
                      <button key={f.id} onClick={() => setPubFilter(f.id)}
                        className={`text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                          pubFilter === f.id ? 'bg-accent-500 text-background-50' : 'bg-background-100 text-foreground-700 hover:bg-background-200'
                        }`}>{f.label}</button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPubs.map(pub => (
                    <div key={pub.pubId} className="bg-background-50 rounded-xl border border-background-200/70 p-5 hover:border-background-300/60 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(pub.status)}`}>{getStatusLabel(pub.status)}</span>
                        <span className="text-xs text-foreground-500">{pub.deadline}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground-950 mb-2 line-clamp-2">{pub.title}</h3>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {pub.targetKeywords.slice(0, 3).map(kw => (
                          <span key={kw} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{kw}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-4 gap-2 mb-3 text-center">
                        <div>
                          <div className={`text-sm font-bold ${getScoreColor(pub.seoScore)}`}>{pub.seoScore}</div>
                          <div className="text-[10px] text-foreground-500">SEO</div>
                        </div>
                        <div>
                          <div className={`text-sm font-bold ${getScoreColor(pub.geoScore)}`}>{pub.geoScore}</div>
                          <div className="text-[10px] text-foreground-500">GEO</div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-foreground-950">{pub.estimatedTraffic.toLocaleString()}</div>
                          <div className="text-[10px] text-foreground-500">Trafic/mois</div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-foreground-950">{pub.articleType.includes('Guide') ? 'Guide' : 'Article'}</div>
                          <div className="text-[10px] text-foreground-500">Type</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-foreground-600">
                        <span>{pub.author}</span>
                        <span className="text-foreground-400">{pub.pillarAlignment}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Article Compliance Audit */}
                <h2 className="text-lg font-semibold text-foreground-950 mt-10 mb-4">Audit Conformité Articles Existants</h2>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {[
                    { id: 'all', label: 'Tous' },
                    { id: 'compliant', label: 'Conformes' },
                    { id: 'needs_fix', label: 'À corriger' },
                    { id: 'critical', label: 'Critiques' },
                  ].map(f => (
                    <button key={f.id} onClick={() => setArticleFilter(f.id)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                        articleFilter === f.id ? 'bg-accent-500 text-background-50' : 'bg-background-100 text-foreground-700 hover:bg-background-200'
                      }`}>{f.label}</button>
                  ))}
                </div>
                <div className="space-y-3">
                  {filteredArticles.map(article => (
                    <div key={article.articleId} className="bg-background-50 rounded-xl border border-background-200/70 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(article.status)}`}>{getStatusLabel(article.status)}</span>
                          <span className="text-xs text-foreground-500">{article.category}</span>
                        </div>
                        <div className="text-sm font-medium text-foreground-950 truncate">{article.articleTitle}</div>
                        <div className="text-xs text-foreground-500 mt-1">
                          Audit: {article.lastAuditDate} · {article.citationsVerified}/{article.citationsTotal} citations vérifiées · {article.issuesFound} issues
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-center">
                          <div className={`text-sm font-bold ${getScoreColor(article.regulatoryScore)}`}>{article.regulatoryScore}</div>
                          <div className="text-[10px] text-foreground-500">Rég.</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-sm font-bold ${getScoreColor(article.editorialScore)}`}>{article.editorialScore}</div>
                          <div className="text-[10px] text-foreground-500">Édito.</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-sm font-bold ${getScoreColor(article.seoScore)}`}>{article.seoScore}</div>
                          <div className="text-[10px] text-foreground-500">SEO</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-sm font-bold ${getScoreColor(article.geoScore)}`}>{article.geoScore}</div>
                          <div className="text-[10px] text-foreground-500">GEO</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ================================ FOOTER BAR ================================ */}
          <footer className="border-t border-background-200/70 bg-background-100 mt-8">
            <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-foreground-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>{kpis.criticalRemaining} critiques</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>{kpis.majorRemaining} majeurs</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>{kpis.completedActions}/{kpis.totalActions} actions</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>Progression: {kpis.globalProgress}%</span>
                  <span>·</span>
                  <span>Prochaine exécution: {kpis.nextScheduledScan}</span>
                  <span>·</span>
                  <span>Fin estimée: {kpis.estimatedCompletionDate}</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </KOSHubLayout>
    </>
  );
}