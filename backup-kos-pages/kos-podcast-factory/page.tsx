import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { useKOSPodcastFactory } from '@/hooks/useKOSPodcastFactory';
import type { PodcastScript, ProductionVariant } from '@/mocks/podcastFactory';

type TabId = 'subjects' | 'scripts' | 'production' | 'quality' | 'kpis';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'subjects', label: 'Sujets & Synopsis', icon: 'ri-lightbulb-flash-line' },
  { id: 'scripts', label: 'Scripts Complets', icon: 'ri-quill-pen-line' },
  { id: 'production', label: 'Production Multi-Format', icon: 'ri-stack-line' },
  { id: 'quality', label: 'Qualité Standard', icon: 'ri-medal-line' },
  { id: 'kpis', label: 'KPIs Factory', icon: 'ri-line-chart-line' },
];

const FORMAT_LABELS: Record<string, string> = { '5min': '5 minutes', '15min': '15 minutes', '30min': '30 minutes', '60min': '60 minutes' };
const FORMAT_COLORS: Record<string, string> = { '5min': 'bg-emerald-100 text-emerald-700', '15min': 'bg-accent-100 text-accent-700', '30min': 'bg-primary-100 text-primary-700', '60min': 'bg-secondary-100 text-secondary-700' };

export default function podcastFactoryPage() {
  const [activeTab, setActiveTab] = useState<TabId>('subjects');
  const engine = useKOSPodcastFactory();
  const stats = engine.getStats();

  return (
    <hubLayout hubId={93} activeTab="Podcast-Factory" tabLabel="KOS Podcast Factory">
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 font-body tracking-wide">
                      {stats.productionEngineVersion}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700 font-body">
                      <i className="ri-mic-line text-xs"></i>
                      {stats.totalSubjects} sujets · {stats.totalScripts} scripts
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 font-body">
                      <i className="ri-check-double-line text-xs"></i>
                      {stats.standardLevel}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-2 font-heading">
                    KOS Podcast Factory
                  </h1>
                  <p className="text-sm text-foreground-600 max-w-2xl font-body">
                    Chaîne industrielle de podcasts institutionnels KHEPRA. Synopsis, scripts complets 4 formats (5/15/30/60 min), production automatique audio/vidéo/blog/LinkedIn. Qualité cabinet international — standard Big Four.
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-3 flex-shrink-0">
                  {[
                    { label: 'Sujets', value: stats.totalSubjects, icon: 'ri-lightbulb-flash-line', color: 'text-primary-500' },
                    { label: 'Scripts', value: stats.totalScripts, icon: 'ri-quill-pen-line', color: 'text-accent-500' },
                    { label: 'Formats', value: stats.totalFormats, icon: 'ri-stack-line', color: 'text-secondary-500' },
                    { label: 'Qualité', value: `${stats.qualityScore}%`, icon: 'ri-medal-line', color: 'text-emerald-500' },
                  ].map(s => (
                    <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-xl p-3 text-center min-w-[80px]">
                      <i className={`${s.icon} ${s.color} text-lg`}></i>
                      <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
                      <p className="text-xs text-foreground-500">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Tabs */}
        <div className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-md border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-1 overflow-x-auto py-2">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white'
                      : 'text-foreground-600 hover:bg-background-100'
                  }`}
                >
                  <i className={`${tab.icon} text-sm`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          {activeTab === 'subjects' && <SubjectsTab engine={engine} />}
          {activeTab === 'scripts' && <ScriptsTab engine={engine} />}
          {activeTab === 'production' && <ProductionTab engine={engine} />}
          {activeTab === 'quality' && <QualityTab engine={engine} />}
          {activeTab === 'kpis' && <KPIsTab engine={engine} />}
        </div>
      </main>
    </hubLayout>
  );
}

// ============================================================================
// TAB 1: SUBJECTS & SYNOPSIS
// ============================================================================
function SubjectsTab({ engine }: { engine: ReturnType<typeof useKOSPodcastFactory> }) {
  const [searchQ, setSearchQ] = useState('');
  const [domainF, setDomainF] = useState('all');
  const filtered = searchQ ? engine.searchSubjects(searchQ) : engine.getSubjectsByDomain(domainF);

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="bg-primary-50 border border-primary-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-lightbulb-flash-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Chaîne Industrielle de Podcasts KHEPRA</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Pour chaque sujet : synopsis → script complet → introduction → transitions → conclusion → call to action. 4 formats (5/15/30/60 min). Production automatique audio, vidéo, blog, LinkedIn. Standard cabinet international.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Rechercher un sujet, thème..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 focus:outline-none focus:border-primary-300" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setDomainF('all')} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${domainF === 'all' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>
            Tous
          </button>
          {engine.availableDomains.map(d => (
            <button key={d} onClick={() => setDomainF(d)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${domainF === d ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(subj => (
          <ScrollReveal key={subj.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 h-full">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  subj.domainColor === 'primary' ? 'bg-primary-100 text-primary-700' :
                  subj.domainColor === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                }`}>
                  <i className={`${subj.domainIcon} text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      subj.domainColor === 'primary' ? 'bg-primary-100 text-primary-700' :
                      subj.domainColor === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                    }`}>{subj.domain}</span>
                    <span className="text-xs text-foreground-400">{subj.duration}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground-950">{subj.title}</h3>
                </div>
              </div>
              <p className="text-xs text-foreground-600 leading-relaxed mb-3">{subj.synopsis}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {subj.keyTopics.map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{t}</span>
                ))}
              </div>
              <div className="pt-3 border-t border-background-200/40 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-foreground-400">Audience :</span>
                  <p className="text-foreground-600 mt-0.5 line-clamp-1">{subj.targetAudience}</p>
                </div>
                <div>
                  <span className="text-foreground-400">Invité :</span>
                  <p className="text-foreground-600 mt-0.5 line-clamp-1">{subj.guestProfile}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 2: SCRIPTS
// ============================================================================
function ScriptsTab({ engine }: { engine: ReturnType<typeof useKOSPodcastFactory> }) {
  const [formatF, setFormatF] = useState('all');
  const scripts = engine.getScriptsByFormat(formatF);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-1.5">
        <button onClick={() => setFormatF('all')} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${formatF === 'all' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>
          Tous les formats
        </button>
        {engine.availableFormats.map(f => (
          <button key={f} onClick={() => setFormatF(f)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${formatF === f ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>
            {FORMAT_LABELS[f] || f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {scripts.map(script => {
          const subject = engine.getSubjectById(script.subjectId);
          return (
            <ScrollReveal key={script.id}>
              <details className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden group">
                <summary className="p-5 cursor-pointer list-none flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    subject?.domainColor === 'primary' ? 'bg-primary-100 text-primary-700' :
                    subject?.domainColor === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                  }`}>
                    <i className="ri-quill-pen-line text-lg"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${FORMAT_COLORS[script.format] || 'bg-background-100 text-foreground-500'}`}>
                        {FORMAT_LABELS[script.format] || script.format}
                      </span>
                      <span className="text-xs text-foreground-400">{(script.durationSec / 60).toFixed(0)} min</span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground-950">{subject?.title || script.subjectId}</h3>
                  </div>
                  <i className="ri-arrow-down-s-line text-foreground-400 mt-1 group-open:rotate-180 transition-transform"></i>
                </summary>
                <div className="px-5 pb-5 border-t border-background-200/40 space-y-4">
                  {/* Intro */}
                  <div>
                    <h4 className="text-xs font-semibold text-accent-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <i className="ri-mic-line"></i>Introduction
                    </h4>
                    <p className="text-sm text-foreground-700 leading-relaxed bg-background-100 p-3 rounded-lg italic">{script.intro}</p>
                  </div>
                  {/* Segments */}
                  <div>
                    <h4 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <i className="ri-stack-line"></i>Segments ({script.segments.length})
                    </h4>
                    <div className="space-y-2">
                      {script.segments.map((seg, i) => (
                        <div key={i} className="bg-background-100 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-foreground-950">{seg.title}</span>
                            <span className="text-xs text-foreground-400">{Math.round(seg.durationSec / 60)} min</span>
                          </div>
                          <p className="text-xs text-foreground-600 leading-relaxed">{seg.narration}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Transitions */}
                  <div>
                    <h4 className="text-xs font-semibold text-secondary-600 uppercase tracking-wider mb-1.5">Transitions</h4>
                    <ul className="space-y-1">
                      {script.transitions.map((t, i) => (
                        <li key={i} className="text-xs text-foreground-500 flex items-start gap-1.5">
                          <i className="ri-arrow-right-line text-secondary-400 mt-0.5"></i>{t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Conclusion + CTA */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-background-100 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-foreground-950 mb-1.5 flex items-center gap-1.5">
                        <i className="ri-check-double-line text-emerald-500"></i>Conclusion
                      </h4>
                      <p className="text-xs text-foreground-600 leading-relaxed">{script.conclusion}</p>
                    </div>
                    <div className="bg-primary-50 border border-primary-200/50 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-primary-700 mb-1.5 flex items-center gap-1.5">
                        <i className="ri-user-voice-line"></i>Call to Action
                      </h4>
                      <p className="text-xs text-foreground-700 leading-relaxed">{script.callToAction}</p>
                    </div>
                  </div>
                  {/* Production Notes */}
                  <div className="bg-amber-50 border border-amber-200/50 rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-amber-700 mb-1 flex items-center gap-1.5">
                      <i className="ri-tools-line"></i>Notes de Production
                    </h4>
                    <p className="text-xs text-amber-800">{script.productionNotes}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {script.keywords.map(k => (
                        <span key={k} className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{k}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </details>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 3: PRODUCTION MULTI-FORMAT
// ============================================================================
function ProductionTab({ engine }: { engine: ReturnType<typeof useKOSPodcastFactory> }) {
  const variants = engine.getProductionVariants();
  const formatLabels: Record<string, string> = { audio: 'Version Audio', video: 'Version Vidéo', blog: 'Version Blog', linkedin: 'Version LinkedIn' };
  const formatIcons: Record<string, string> = { audio: 'ri-volume-up-line', video: 'ri-film-line', blog: 'ri-file-text-line', linkedin: 'ri-linkedin-box-line' };

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="bg-accent-50 border border-accent-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-stack-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Production Automatique — 4 Formats</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Chaque épisode est automatiquement décliné en <strong>version audio</strong> (MP3 320kbps), <strong>version vidéo</strong> (1080p avec waveform), <strong>version blog</strong> (article SEO 1500-3000 mots) et <strong>version LinkedIn</strong> (post optimisé + hashtags). Distribution multi-canal.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {variants.map(v => (
          <ScrollReveal key={v.format}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center text-accent-700">
                  <i className={`${formatIcons[v.format] || 'ri-file-line'} text-lg`}></i>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground-950">{formatLabels[v.format] || v.format}</h3>
                  <span className="text-xs text-foreground-400">~{v.estimatedProductionTime}</span>
                </div>
              </div>
              <p className="text-xs text-foreground-600 mb-3">{v.outputDescription}</p>
              <div className="bg-background-100 rounded-lg p-3 mb-3">
                <h4 className="text-xs font-semibold text-foreground-700 mb-1">Spécifications</h4>
                <p className="text-xs text-foreground-500">{v.specifications}</p>
              </div>
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-foreground-700 mb-1.5">Canaux de Distribution</h4>
                <div className="flex flex-wrap gap-1">
                  {v.distributionChannels.map(c => (
                    <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{c}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground-700 mb-1.5">Quality Checks</h4>
                <ul className="space-y-1">
                  {v.qualityChecks.map((qc, i) => (
                    <li key={i} className="text-xs text-foreground-500 flex items-start gap-1.5">
                      <i className="ri-check-line text-emerald-500 mt-0.5"></i>{qc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 4: QUALITY STANDARDS
// ============================================================================
function QualityTab({ engine }: { engine: ReturnType<typeof useKOSPodcastFactory> }) {
  const standards = engine.getQualityStandards();

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-medal-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Standard Qualité — Cabinet International</h3>
              <p className="text-sm text-foreground-600 mt-1">
                6 dimensions de qualité évaluées pour chaque production. Score qualité global actuel : <strong className="text-emerald-700">{engine.getStats().qualityScore}/100</strong>. Cible : {engine.getStats().targetMaturity}/100.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {standards.map(s => (
          <ScrollReveal key={s.dimension}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                <i className={`${s.icon} text-emerald-600 text-xl`}></i>
              </div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-2">{s.dimension}</h3>
              <p className="text-xs text-foreground-500 mb-3">{s.description}</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-bold text-emerald-600">≥ {s.threshold}%</span>
                <span className="text-xs text-foreground-400">seuil</span>
              </div>
              <div className="w-full h-2 bg-background-200 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${s.threshold}%` }}></div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 5: KPIs
// ============================================================================
function KPIsTab({ engine }: { engine: ReturnType<typeof useKOSPodcastFactory> }) {
  const kpis = engine.getKPIs();

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center">
            <p className="text-xs text-foreground-500 uppercase tracking-wider mb-2">Score Maturité</p>
            <p className="text-5xl font-bold text-primary-500 font-heading">{engine.getStats().maturityScore}</p>
            <p className="text-xs text-foreground-400 mt-1">/100 — Cible {engine.getStats().targetMaturity}</p>
            <div className="w-full h-2 bg-background-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-primary-500 rounded-full" style={{ width: `${engine.getStats().maturityScore}%` }}></div>
            </div>
          </div>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center">
            <p className="text-xs text-foreground-500 uppercase tracking-wider mb-2">Qualité Audio</p>
            <p className="text-5xl font-bold text-accent-500 font-heading">{engine.getStats().qualityScore}</p>
            <p className="text-xs text-foreground-400 mt-1">/100 — Big Four Grade</p>
          </div>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center">
            <p className="text-xs text-foreground-500 uppercase tracking-wider mb-2">Épisodes / An</p>
            <p className="text-5xl font-bold text-secondary-500 font-heading">{engine.getStats().totalEpisodesProduced}</p>
            <p className="text-xs text-foreground-400 mt-1">objectif {kpis[0]?.target || 50}</p>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kpis.map(kpi => (
          <ScrollReveal key={kpi.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    kpi.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                    kpi.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                  }`}>
                    <i className={`${kpi.icon} text-sm`}></i>
                  </div>
                  <span className="text-sm font-semibold text-foreground-950">{kpi.name}</span>
                </div>
                <span className="text-lg font-bold text-foreground-950">{kpi.current}{kpi.unit}</span>
              </div>
              <div className="flex items-end gap-1 h-16 mb-2">
                {kpi.history.map((h, i) => {
                  const maxVal = Math.max(...kpi.history.map(hh => hh.value), kpi.target);
                  const heightPct = maxVal > 0 ? (h.value / maxVal) * 100 : 0;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="w-full relative" style={{ height: '48px' }}>
                        <div className="absolute bottom-0 w-full rounded-sm bg-primary-400 transition-all" style={{ height: `${heightPct}%` }}></div>
                      </div>
                      <span className="text-[9px] text-foreground-400">{h.month}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-xs text-foreground-500">
                <span>Cible: {kpi.target}{kpi.unit}</span>
                <span className="text-accent-600 font-medium">Standard Big Four</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}





