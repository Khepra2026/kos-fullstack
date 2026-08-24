import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { Link } from 'react-router-dom';
import { useKOSYoutubeSystemScan } from '@/hooks/useKOSYoutubeSystemScan';
import type { ScanComponent, AutoProductionJob } from '@/mocks/youtubeSystemScan';

const STATUS_COLORS: Record<string, string> = {
  optimal: '#059669',
  healthy: '#86BC25',
  warning: '#CA8A04',
  degraded: '#C2410C',
  offline: '#DC2626',
  error: '#DC2626',
  flowing: '#059669',
  partial: '#CA8A04',
  blocked: '#DC2626',
  empty: '#6B7280',
};

const STATUS_ICONS: Record<string, string> = {
  optimal: 'ri-check-double-line',
  healthy: 'ri-check-line',
  warning: 'ri-error-warning-line',
  degraded: 'ri-close-circle-line',
  offline: 'ri-close-circle-fill',
  error: 'ri-close-circle-fill',
};

const STAGE_COLORS: Record<string, string> = {
  queued: '#6B7280',
  script_generating: '#86BC25',
  script_complete: '#059669',
  voice_generating: '#CA8A04',
  voice_complete: '#059669',
  video_assembling: '#C2410C',
  video_complete: '#059669',
  seo_applying: '#0A66C2',
  seo_complete: '#059669',
  publishing: '#FF0000',
  published: '#059669',
  failed: '#DC2626',
};

function stageIcon(stage: AutoProductionJob['stage']): string {
  const map: Record<string, string> = {
    queued: 'ri-time-line',
    script_generating: 'ri-file-text-line',
    script_complete: 'ri-check-line',
    voice_generating: 'ri-mic-line',
    voice_complete: 'ri-check-line',
    video_assembling: 'ri-movie-line',
    video_complete: 'ri-check-line',
    seo_applying: 'ri-search-eye-line',
    seo_complete: 'ri-check-line',
    publishing: 'ri-upload-cloud-line',
    published: 'ri-check-double-line',
    failed: 'ri-close-circle-line',
  };
  return map[stage] || 'ri-time-line';
}

function stageLabel(stage: AutoProductionJob['stage']): string {
  const map: Record<string, string> = {
    queued: 'En file d\'attente',
    script_generating: 'Génération Script',
    script_complete: 'Script OK',
    voice_generating: 'Génération Voix',
    voice_complete: 'Voix OK',
    video_assembling: 'Assemblage Vidéo',
    video_complete: 'Vidéo OK',
    seo_applying: 'SEO YouTube',
    seo_complete: 'SEO OK',
    publishing: 'Publication',
    published: 'Publié',
    failed: 'Échec',
  };
  return map[stage] || stage;
}

export default function youtubeSystemScannerPage() {
  const data = useKOSYoutubeSystemScan();
  const [activeTab, setActiveTab] = useState<string>('scan');
  const [expandedLayer, setExpandedLayer] = useState<string | null>('orchestration');
  const [expandedJob, setExpandedJob] = useState<string | null>('JOB-003');
  const [autoScanDone, setAutoScanDone] = useState(false);

  const handleLaunchProduction = () => {
    data.launchProduction();
    setActiveTab('production');
  };

  const handleRescan = () => {
    data.scanStart();
  };

  return (
    <hubLayout hubId={78}>
      <SeoHead
        title="KOS YouTube System Scanner™ — Scanner Complet & Lancement Automatique Production | KHEPRA EXPERTS"
        description="Scanner exhaustif de l'écosystème YouTube KOS : 7 couches, 27 composants, 8 workflows. Lancement automatique de la production réelle en un clic. Score santé 97.2%."
        keywords="KOS YouTube Scanner, scan système YouTube, production YouTube automatique, KHEPRA EXPERTS, lancement production vidéo"
        canonicalPath="/kos-youtube-system-scanner"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #FF0000 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-4 backdrop-blur-sm">
              <i className="ri-qr-scan-line" />KOS YouTube System Scanner™ — Hub 78
            </div>
            <h1 className="font-heading text-2xl md:text-4xl font-bold text-white tracking-tight">
              Scanner & Lanceur Automatique — Production YouTube Réelle
            </h1>
            <p className="text-sm md:text-base text-gray-400 mt-3 max-w-3xl">
              Scan complet des 7 couches + 8 workflows. Lancement automatique de la production en un clic. Temps réel, monitoring continu, logs détaillés.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <button
                onClick={handleLaunchProduction}
                disabled={data.isLaunching}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all whitespace-nowrap"
                style={{ backgroundColor: '#FF0000', color: '#fff' }}
              >
                {data.isLaunching ? (
                  <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Lancement en cours...</>
                ) : (
                  <><i className="ri-rocket-2-line text-lg" />Lancer Production Automatique</>
                )}
              </button>
              <button
                onClick={handleRescan}
                disabled={data.isScanning}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer transition-all whitespace-nowrap"
              >
                {data.isScanning ? (
                  <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Scan en cours...</>
                ) : (
                  <><i className="ri-refresh-line" />Rescanner le Système</>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Health Bar */}
      <section className="bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#D1FAE5' }}>
                <i className="ri-heart-pulse-line text-xl text-emerald-600" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Santé Globale Système</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-emerald-600">{data.scanResult.overallHealth}%</span>
                  <span className="text-xs text-emerald-600 font-bold">READY FOR PRODUCTION</span>
                </div>
              </div>
            </div>
            <div className="flex-1" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Composants OK', value: `${data.scanResult.healthyComponents}/${data.scanResult.totalComponents}`, color: '#059669' },
                { label: 'Warnings', value: data.scanResult.warningComponents, color: '#CA8A04' },
                { label: 'Erreurs', value: data.scanResult.errorComponents, color: '#DC2626' },
                { label: 'Bloqueurs', value: data.scanResult.blockersFound, color: data.scanResult.blockersFound > 0 ? '#DC2626' : '#059669' },
              ].map((s, i) => (
                <div key={i} className="text-center px-3 py-2 rounded-lg bg-background-50 border border-background-200/70">
                  <span className="block text-lg font-bold" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          {data.isScanning && (
            <div className="mt-3">
              <div className="flex items-center gap-2 text-xs text-foreground-500 mb-1">
                <span className="w-3 h-3 border-2 border-foreground-400 border-t-transparent rounded-full animate-spin" />
                Scan en cours — {data.scanProgress}%
              </div>
              <div className="w-full h-1.5 rounded-full bg-background-200">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${data.scanProgress}%`, backgroundColor: '#86BC25' }} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {[
              { id: 'scan', label: 'Scan Détaillé', icon: 'ri-qr-scan-line', count: `${data.scanResult.totalComponents}` },
              { id: 'layers', label: 'Par Couche', icon: 'ri-stack-line', count: '7' },
              { id: 'pipeline', label: 'Pipeline Santé', icon: 'ri-git-branch-line', count: '8' },
              { id: 'production', label: 'Production Live', icon: 'ri-rocket-2-line', count: `${data.productionJobs.filter(j => j.stage !== 'published' && j.stage !== 'failed').length}` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                }`}
              >
                <i className={`${tab.icon} text-sm`} />{tab.label}
                {tab.count && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-200 text-foreground-500">{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRODUCTION LIVE TAB ═══════════════ */}
      {activeTab === 'production' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Production Live — Jobs en Cours & Terminés</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Pipeline de production en temps réel. Chaque job traverse les 8 étapes du pipeline automatiquement. Les jobs publiés déclenchent automatiquement shorts, articles et posts LinkedIn.
              </p>
            </div>

            {data.lastLaunchResult && (
              <div className="rounded-xl p-4 mb-4 border" style={{ backgroundColor: '#FEF3C7', borderColor: '#CA8A04' }}>
                <div className="flex items-start gap-2">
                  <i className="ri-information-line text-amber-600" />
                  <span className="text-xs text-amber-800">{data.lastLaunchResult}</span>
                </div>
              </div>
            )}

            {data.productionJobs.length === 0 && (
              <div className="rounded-2xl bg-background-50 border border-dashed border-background-300 p-12 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-background-200 flex items-center justify-center mb-4">
                  <i className="ri-rocket-2-line text-3xl text-foreground-400" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-2">Aucun job en production</h3>
                <p className="text-sm text-foreground-500 mb-4">Lancez une production automatique pour démarrer le pipeline</p>
                <button onClick={handleLaunchProduction} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white cursor-pointer whitespace-nowrap" style={{ backgroundColor: '#FF0000' }}>
                  <i className="ri-rocket-2-line" />Lancer Production
                </button>
              </div>
            )}

            <div className="space-y-3">
              {data.productionJobs.map((job) => {
                const isExpanded = expandedJob === job.jobId;
                const active = job.stage !== 'published' && job.stage !== 'failed';
                const stageIdx = ['queued', 'script_generating', 'script_complete', 'voice_generating', 'voice_complete', 'video_assembling', 'video_complete', 'seo_applying', 'seo_complete', 'publishing', 'published'].indexOf(job.stage);
                const totalStages = 10;
                const progressPct = job.stage === 'published' ? 100 : job.stage === 'failed' ? 0 : Math.round((stageIdx / totalStages) * 100);

                return (
                  <div key={job.jobId} className={`rounded-xl border transition-all bg-background-50 ${isExpanded ? 'border-foreground-300' : 'border-background-200/70 hover:border-foreground-200'}`}>
                    <button
                      onClick={() => setExpandedJob(isExpanded ? null : job.jobId)}
                      className="w-full p-4 text-left flex items-start gap-4 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${STAGE_COLORS[job.stage]}20` }}>
                        <i className={`${stageIcon(job.stage)} text-xl`} style={{ color: STAGE_COLORS[job.stage] }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${STAGE_COLORS[job.stage]}15`, color: STAGE_COLORS[job.stage] }}>
                            {stageLabel(job.stage).toUpperCase()}
                          </span>
                          {active && <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />}
                        </div>
                        <h3 className="text-sm font-bold text-foreground-950 line-clamp-1">{job.topic}</h3>
                        <div className="flex items-center gap-3 mt-1 text-[10px] text-foreground-400">
                          <span><i className="ri-time-line mr-1" />Début : {new Date(job.startedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                          {job.estimatedCompletion && <span>· Fin estimée : {new Date(job.estimatedCompletion).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>}
                        </div>
                        {/* Progress Bar */}
                        <div className="mt-2 w-full h-1.5 rounded-full bg-background-200">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${progressPct}%`, backgroundColor: STAGE_COLORS[job.stage] }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-sm font-bold" style={{ color: STAGE_COLORS[job.stage] }}>{progressPct}%</span>
                        <i className={`${isExpanded ? 'ri-subtract-line' : 'ri-add-line'} text-foreground-400`} />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4 animate-fade-in">
                        <h4 className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider mb-2">Logs d&apos;Exécution</h4>
                        <div className="space-y-1.5 max-h-64 overflow-y-auto">
                          {job.logs.map((log, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs py-1 px-2 rounded-lg" style={{ backgroundColor: log.level === 'error' ? '#FEE2E2' : log.level === 'warning' ? '#FEF3C7' : log.level === 'success' ? '#D1FAE5' : 'transparent' }}>
                              <span className="text-foreground-400 font-mono flex-shrink-0 text-[10px] pt-0.5">
                                {new Date(log.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                              </span>
                              <span
                                className="text-foreground-600 leading-relaxed"
                                style={{ color: log.level === 'error' ? '#DC2626' : log.level === 'success' ? '#059669' : log.level === 'warning' ? '#CA8A04' : undefined }}
                              >{log.message}</span>
                            </div>
                          ))}
                        </div>

                        {/* Pipeline Stage Visual */}
                        <div className="mt-4">
                          <h4 className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider mb-2">Pipeline — Étapes</h4>
                          <div className="flex flex-wrap items-center gap-1.5">
                            {[
                              { s: 'queued', icon: 'ri-time-line', label: 'Queue' },
                              { s: 'script_generating', icon: 'ri-file-text-line', label: 'Script' },
                              { s: 'voice_generating', icon: 'ri-mic-line', label: 'Voix' },
                              { s: 'video_assembling', icon: 'ri-movie-line', label: 'Vidéo' },
                              { s: 'seo_applying', icon: 'ri-search-eye-line', label: 'SEO' },
                              { s: 'publishing', icon: 'ri-upload-cloud-line', label: 'Publier' },
                            ].map((step, idx) => {
                              const stepIdx = ['queued', 'script_generating', 'script_complete', 'voice_generating', 'voice_complete', 'video_assembling', 'video_complete', 'seo_applying', 'seo_complete', 'publishing', 'published'].indexOf(job.stage);
                              const currentStepMap: Record<string, number> = { queued: 0, script_generating: 1, script_complete: 1, voice_generating: 2, voice_complete: 2, video_assembling: 3, video_complete: 3, seo_applying: 4, seo_complete: 4, publishing: 5, published: 5 };
                              const currentStep = currentStepMap[job.stage] ?? 0;
                              const done = idx < currentStep;
                              const active2 = idx === currentStep;
                              return (
                                <div key={step.s} className="flex items-center gap-1.5">
                                  <div
                                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                                      done ? 'bg-emerald-100 text-emerald-700' : active2 ? 'text-white' : 'bg-background-100 text-foreground-400'
                                    }`}
                                    style={active2 ? { backgroundColor: STAGE_COLORS[job.stage] } : undefined}
                                  >
                                    <i className={`${step.icon} text-xs`} />
                                    <span>{step.label}</span>
                                    {done && <i className="ri-check-line text-[10px]" />}
                                  </div>
                                  {idx < 5 && <i className="ri-arrow-right-s-line text-foreground-300 text-[10px]" />}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ SCAN DÉTAILLÉ TAB ═══════════════ */}
      {activeTab === 'scan' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Scan Détaillé — 27 Composants</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Résultat du scan du {new Date(data.scanResult.scanTimestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })} — Durée : {data.scanResult.duration}. {data.scanResult.healthyComponents} composants sains, {data.scanResult.warningComponents} en warning.
              </p>
            </div>

            {data.scanResult.recommendations.length > 0 && (
              <div className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: '#FFFBEB', borderColor: '#FCD34D' }}>
                <h4 className="text-xs font-bold text-foreground-950 mb-2">
                  <i className="ri-lightbulb-line text-amber-600 mr-1" />Recommandations ({data.scanResult.recommendations.length})
                </h4>
                <div className="space-y-1">
                  {data.scanResult.recommendations.map((rec, i) => (
                    <div key={i} className="text-xs text-foreground-600 flex items-start gap-1.5">
                      <span className="text-amber-600 flex-shrink-0 mt-0.5">•</span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.scanResult.layers.map((layer) => (
              <div key={layer.layerId} className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${STATUS_COLORS[layer.status]}15` }}>
                    <i className={`${layer.icon} text-sm`} style={{ color: STATUS_COLORS[layer.status] }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-foreground-950">{layer.name}</h3>
                    <span className="text-[10px] text-foreground-400">
                      {layer.healthyCount + (layer.componentCount - layer.healthyCount - layer.warningCount - layer.errorCount)}/{layer.componentCount} OK · {layer.avgHealthScore.toFixed(1)}% santé
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {layer.warningCount > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">{layer.warningCount} W</span>}
                    {layer.errorCount > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700">{layer.errorCount} E</span>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  {layer.components.map((comp: ScanComponent) => (
                    <div key={comp.componentId} className="rounded-lg bg-background-50 border border-background-200/70 p-3 flex items-start gap-3 hover:border-foreground-200 transition-colors">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${STATUS_COLORS[comp.status]}15` }}>
                        <i className={`${comp.icon} text-xs`} style={{ color: STATUS_COLORS[comp.status] }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold text-foreground-950">{comp.name}</span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${STATUS_COLORS[comp.status]}15`, color: STATUS_COLORS[comp.status] }}>
                            {STATUS_ICONS[comp.status] ? <i className={`${STATUS_ICONS[comp.status]} text-[9px] mr-0.5`} /> : null}{comp.status.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-foreground-400">{comp.healthScore}%</span>
                        </div>
                        <p className="text-[11px] text-foreground-500 mb-1.5">{comp.details}</p>
                        <div className="flex flex-wrap gap-2">
                          {comp.metrics.map((m, i) => (
                            <div key={i} className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md bg-background-100">
                              <span className="text-foreground-400">{m.label}:</span>
                              <span className="font-bold" style={{ color: m.status === 'warning' ? '#CA8A04' : m.status === 'alert' ? '#DC2626' : '#059669' }}>{m.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════ PAR COUCHE TAB ═══════════════ */}
      {activeTab === 'layers' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Architecture — Santé par Couche</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Vue stratifiée des 7 couches de l&apos;infrastructure KOS YouTube avec score de santé agrégé par couche.
              </p>
            </div>

            <div className="space-y-3">
              {data.scanResult.layers.map((layer, layerIdx) => {
                const isLayerExpanded = expandedLayer === layer.layerId;
                return (
                  <div key={layer.layerId}>
                    <button
                      onClick={() => setExpandedLayer(isLayerExpanded ? null : layer.layerId)}
                      className="w-full rounded-xl bg-background-50 border border-background-200/70 p-4 flex items-center gap-4 cursor-pointer hover:border-foreground-200 transition-colors text-left"
                    >
                      <div className="w-9 h-9 rounded-full bg-foreground-950 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{layerIdx + 1}</div>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${STATUS_COLORS[layer.status]}15` }}>
                        <i className={`${layer.icon} text-lg`} style={{ color: STATUS_COLORS[layer.status] }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-sm font-bold text-foreground-950">{layer.name}</h3>
                          <span className={`w-2 h-2 rounded-full ${layer.status === 'optimal' ? 'bg-emerald-500' : layer.status === 'healthy' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
                        </div>
                        <span className="text-xs text-foreground-500">{layer.componentCount} composants · Score {layer.avgHealthScore.toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Mini bars */}
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: layer.componentCount }).map((_, i) => {
                            const comp = layer.components[i];
                            return (
                              <div key={i} className="w-1.5 h-4 rounded-full" style={{
                                backgroundColor: comp.status === 'optimal' || comp.status === 'healthy' ? '#059669' : comp.status === 'warning' ? '#CA8A04' : '#DC2626',
                                opacity: comp.status === 'warning' ? 0.8 : 1,
                              }} />
                            );
                          })}
                        </div>
                        <span className="text-lg font-bold" style={{ color: STATUS_COLORS[layer.status] }}>{layer.avgHealthScore.toFixed(0)}%</span>
                        <i className={`${isLayerExpanded ? 'ri-arrow-up-circle-line' : 'ri-arrow-down-circle-line'} text-foreground-400`} />
                      </div>
                    </button>

                    {isLayerExpanded && (
                      <div className="mt-2 space-y-1.5 pl-4 border-l-2 border-background-200 ml-6 animate-fade-in">
                        {layer.components.map((comp) => (
                          <div key={comp.componentId} className="rounded-lg bg-background-50 border border-background-200/70 p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLORS[comp.status] }} />
                              <span className="text-xs font-bold text-foreground-950">{comp.name}</span>
                              <span className="text-[10px] font-bold" style={{ color: STATUS_COLORS[comp.status] }}>{comp.healthScore}%</span>
                            </div>
                            <p className="text-[11px] text-foreground-500">{comp.details}</p>
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
      )}

      {/* ═══════════════ PIPELINE SANTÉ TAB ═══════════════ */}
      {activeTab === 'pipeline' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Pipeline de Production — Santé par Étape</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Les 8 étapes du pipeline de production. Chaque étape montre le nombre d&apos;items, leur statut et les blocages éventuels.
              </p>
            </div>

            {/* Pipeline Flow */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                {data.pipeline.map((stage, i) => (
                  <div key={stage.pipelineId} className="flex items-center gap-2">
                    <div className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl border text-center min-w-[100px]" style={{ borderColor: `${STATUS_COLORS[stage.status]}30`, backgroundColor: `${STATUS_COLORS[stage.status]}08` }}>
                      <i className={`${stage.icon} text-lg`} style={{ color: STATUS_COLORS[stage.status] }} />
                      <span className="text-xs font-bold text-foreground-950">{stage.stage}</span>
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="font-bold" style={{ color: STATUS_COLORS[stage.status] }}>{stage.readyCount}/{stage.itemsCount}</span>
                        {stage.blockedCount > 0 && (
                          <span className="text-amber-600 font-bold">{stage.blockedCount} ⚠</span>
                        )}
                        {stage.errorCount > 0 && (
                          <span className="text-red-600 font-bold">{stage.errorCount} ✕</span>
                        )}
                      </div>
                    </div>
                    {i < data.pipeline.length - 1 && (
                      <i className={`ri-arrow-right-line text-lg ${stage.status === 'flowing' ? 'text-emerald-500' : stage.status === 'partial' ? 'text-amber-500' : 'text-red-500'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Per-stage detail */}
            <div className="space-y-3">
              {data.pipeline.map((stage) => (
                <div key={stage.pipelineId} className="rounded-xl bg-background-50 border border-background-200/70 p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${STATUS_COLORS[stage.status]}15` }}>
                    <i className={`${stage.icon} text-lg`} style={{ color: STATUS_COLORS[stage.status] }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-foreground-950">{stage.stage}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${STATUS_COLORS[stage.status]}15`, color: STATUS_COLORS[stage.status] }}>
                        {stage.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                      <span className="text-emerald-600 font-bold">{stage.readyCount} prêts</span>
                      {stage.blockedCount > 0 && <span className="text-amber-600 font-bold">{stage.blockedCount} bloqués</span>}
                      {stage.errorCount > 0 && <span className="text-red-600 font-bold">{stage.errorCount} erreurs</span>}
                      <span>Total : {stage.itemsCount}</span>
                    </div>
                  </div>
                  {/* Health bar */}
                  <div className="w-24">
                    <div className="w-full h-2 rounded-full bg-background-200">
                      <div className="h-full rounded-full" style={{
                        width: `${stage.itemsCount > 0 ? Math.round((stage.readyCount / stage.itemsCount) * 100) : 0}%`,
                        backgroundColor: STATUS_COLORS[stage.status],
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-12 bg-foreground-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-2">KOS YouTube — Écosystème Complet</h2>
              <p className="text-gray-400 text-sm">
                Scanner (Hub 78) → Infrastructure (Hub 75) → Production Pipeline (Hub 76). Surveillance continue, production autonome, optimisation automatique.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/kos-youtube-autonomous-infrastructure" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                <i className="ri-server-line" />Infrastructure
              </Link>
              <Link to="/kos-youtube-production-pipeline" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                <i className="ri-rocket-2-line" />Production Pipeline
              </Link>
              <Link to="/youtube-connect" className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-sm cursor-pointer whitespace-nowrap" style={{ backgroundColor: '#FF0000' }}>
                <i className="ri-youtube-fill" />YouTube Connect
              </Link>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}



