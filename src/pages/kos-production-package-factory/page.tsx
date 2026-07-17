import { useState, useMemo } from 'react';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { PRODUCTION_PACKAGES, FACTORY_STATS } from '@/mocks/kosProductionPackageFactory';
import type { ProductionPackage, ScriptSection, VisualCue } from '@/mocks/kosProductionPackageFactory';

type TabId = 'all' | 'analyse_reglementaire' | 'guide_pratique' | 'tendance_marche' | 'etude_cas';
type DifficultyFilter = 'all' | 'standard' | 'advanced' | 'expert';

function ExpandIcon({ expanded }: { expanded: boolean }) {
  return expanded
    ? <i className="ri-arrow-up-s-line text-foreground-400 ml-auto transition-transform duration-200" />
    : <i className="ri-arrow-down-s-line text-foreground-400 ml-auto transition-transform duration-200" />;
}

function PriorityBadge({ priority }: { priority: string }) {
  if (priority === 'high') return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">Priorité Haute</span>;
  if (priority === 'medium') return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Priorité Moyenne</span>;
  return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-background-200 text-foreground-600">Priorité Basse</span>;
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  if (difficulty === 'expert') return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent-100 text-accent-800">Expert</span>;
  if (difficulty === 'advanced') return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary-100 text-primary-800">Avancé</span>;
  return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-800">Standard</span>;
}

function FormatLabel({ format }: { format: string }) {
  const map: Record<string, { label: string; icon: string }> = {
    analyse_reglementaire: { label: 'Analyse Réglementaire', icon: 'ri-scales-3-line' },
    guide_pratique: { label: 'Guide Pratique', icon: 'ri-book-open-line' },
    tendance_marche: { label: 'Tendance Marché', icon: 'ri-line-chart-line' },
    etude_cas: { label: 'Étude de Cas', icon: 'ri-focus-2-line' },
  };
  const f = map[format] || { label: format, icon: 'ri-video-line' };
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-foreground-600 bg-background-100 px-2.5 py-1 rounded-full">
      <i className={`${f.icon} text-xs`} />{f.label}
    </span>
  );
}

function VisualCueIcon({ type }: { type: VisualCue['type'] }) {
  const map: Record<string, string> = {
    broll: 'ri-film-line',
    graphic: 'ri-pie-chart-line',
    text_overlay: 'ri-text',
    camera: 'ri-camera-line',
    transition: 'ri-arrow-left-right-line',
  };
  return <i className={`${map[type] || 'ri-checkbox-blank-circle-line'} text-[10px]`} />;
}

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'all', label: 'Tous les Packages', icon: 'ri-stack-line' },
  { id: 'analyse_reglementaire', label: 'Analyse Réglementaire', icon: 'ri-scales-3-line' },
  { id: 'guide_pratique', label: 'Guide Pratique', icon: 'ri-book-open-line' },
  { id: 'tendance_marche', label: 'Tendance Marché', icon: 'ri-line-chart-line' },
  { id: 'etude_cas', label: 'Étude de Cas', icon: 'ri-focus-2-line' },
];

const difficultyOptions: { id: DifficultyFilter; label: string }[] = [
  { id: 'all', label: 'Tous niveaux' },
  { id: 'standard', label: 'Standard' },
  { id: 'advanced', label: 'Avancé' },
  { id: 'expert', label: 'Expert' },
];

export default function KOSProductionPackageFactoryPage() {
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<ProductionPackage | null>(null);
  const [detailTab, setDetailTab] = useState<'script' | 'metadata' | 'conversion'>('script');

  const filteredPackages = useMemo(() => {
    return PRODUCTION_PACKAGES.filter((pkg) => {
      if (activeTab !== 'all' && pkg.videoMetadata.format !== activeTab) return false;
      if (difficultyFilter !== 'all' && pkg.videoMetadata.difficulty !== difficultyFilter) return false;
      return true;
    });
  }, [activeTab, difficultyFilter]);

  const formatCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PRODUCTION_PACKAGES.length };
    PRODUCTION_PACKAGES.forEach((pkg) => {
      counts[pkg.videoMetadata.format] = (counts[pkg.videoMetadata.format] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-background-50">
      <Navigation />

      <main id="main-content">
        {/* ═══════════════════════════════════════════ HERO ═══════════════════════════════════════════ */}
        <section className="relative bg-foreground-950 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #c4a235 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-accent-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">Hub 73 — Executive Producer</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Production Package{' '}
                <span className="block text-accent-400">Factory</span>
              </h1>
              <p className="text-body-lg text-foreground-400 leading-relaxed mb-8 max-w-2xl">
                White Paper Deconstruction — Big Four Scriptwriting — Video Asset Packaging. Chaque package est un contenu YouTube complet prêt à produire : script, visuels, métadonnées SEO, stratégie de conversion.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#packages" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5 bg-accent-500 text-background-50">
                  <i className="ri-file-list-3-line" />
                  Explorer les packages
                </a>
                <a href="/kos-voice-ai-studio/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5 border border-primary-400/50 text-primary-400 bg-primary-500/10">
                  <i className="ri-voiceprint-line" />
                  Voice AI Studio
                </a>
                <a href="/youtube-connect/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5 border border-foreground-400/50 text-foreground-300 bg-foreground-800/40">
                  <i className="ri-youtube-line" />
                  YouTube Connect
                </a>
              </div>
            </div>
          </div>
          {/* Stats Bar */}
          <div className="relative border-t border-foreground-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                {[
                  { value: FACTORY_STATS.totalPackages, label: 'Packages prêts', icon: 'ri-folder-open-line' },
                  { value: FACTORY_STATS.readyToProduce, label: 'Prêts à produire', icon: 'ri-check-double-line' },
                  { value: FACTORY_STATS.totalDuration, label: 'Durée totale', icon: 'ri-timer-line' },
                  { value: `${FACTORY_STATS.averageDuration}`, label: 'Durée moyenne', icon: 'ri-time-line' },
                  { value: FACTORY_STATS.topicsCovered, label: 'Thématiques', icon: 'ri-price-tag-3-line' },
                  { value: FACTORY_STATS.conversionRate, label: 'Taux de conversion', icon: 'ri-percent-line' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="w-9 h-9 mx-auto flex items-center justify-center rounded-lg bg-foreground-800/60 mb-2">
                      <i className={`${stat.icon} text-base text-accent-400`} />
                    </div>
                    <div className="font-heading text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-foreground-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ PIPELINE BANNER ═══════════════════════════════════════════ */}
        <section className="py-6 bg-background-100 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3 md:gap-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground-400">Pipeline :</span>
              {[
                { label: 'Production Package Factory', icon: 'ri-folder-open-line', active: true, url: '/kos-production-package-factory/' },
                { label: 'Studio Média', icon: 'ri-clapperboard-line', active: false, url: '/studio-media/' },
                { label: 'Voice AI Studio', icon: 'ri-voiceprint-line', active: false, url: '/kos-voice-ai-studio/' },
                { label: 'YouTube Connect', icon: 'ri-youtube-line', active: false, url: '/youtube-connect/' },
                { label: 'Multichannel Command', icon: 'ri-global-line', active: false, url: '/kos-multichannel-command/' },
                { label: 'Analytics', icon: 'ri-bar-chart-line', active: false, url: '/kos-youtube-analytics/' },
              ].map((step, i) => (
                <a
                  key={i}
                  href={step.url}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                    step.active
                      ? 'bg-accent-500 text-background-50'
                      : 'bg-background-50 text-foreground-600 hover:bg-background-200 hover:text-foreground-900'
                  }`}
                >
                  <i className={`${step.icon} text-xs`} />
                  {step.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ PACKAGES ═══════════════════════════════════════════ */}
        <section id="packages" className="py-16 md:py-20 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-600 mb-3">
                  Production Packages
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-2">
                  {filteredPackages.length} packages prêts à produire
                </h2>
                <p className="text-body-md text-foreground-600 max-w-2xl">
                  Chaque package contient : script complet avec cues visuels, métadonnées SEO YouTube optimisées, commentaire épinglé, stratégie de conversion.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-500 whitespace-nowrap">Difficulté :</span>
                {difficultyOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setDifficultyFilter(opt.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                      difficultyFilter === opt.id
                        ? 'bg-accent-500 text-background-50'
                        : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all ${
                    activeTab === tab.id
                      ? 'bg-accent-500 text-background-50'
                      : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                  }`}
                >
                  <i className={`${tab.icon} text-sm`} />
                  {tab.label}
                  {tab.id !== 'all' && (
                    <span className={`text-[10px] ml-0.5 ${activeTab === tab.id ? 'text-background-50/70' : 'text-foreground-400'}`}>
                      ({formatCounts[tab.id] || 0})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Package Cards */}
            <div className="space-y-4">
              {filteredPackages.map((pkg) => {
                const isExpanded = expandedId === pkg.id;
                const isSelected = selectedPackage?.id === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    className={`rounded-xl border transition-all duration-300 bg-background-50 ${
                      isExpanded || isSelected
                        ? 'border-accent-300/60 shadow-sm'
                        : 'border-background-200/70 hover:border-accent-200/60'
                    }`}
                  >
                    {/* Header */}
                    <div
                      className="p-5 cursor-pointer"
                      onClick={() => {
                        if (isExpanded) {
                          setExpandedId(null);
                          setSelectedPackage(null);
                        } else {
                          setExpandedId(pkg.id);
                          setSelectedPackage(pkg);
                          setDetailTab('script');
                        }
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent-100 flex-shrink-0">
                          <i className="ri-video-line text-xl text-accent-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <PriorityBadge priority={pkg.priority} />
                            <FormatLabel format={pkg.videoMetadata.format} />
                            <DifficultyBadge difficulty={pkg.videoMetadata.difficulty} />
                            <span className="text-xs text-foreground-400">{pkg.videoMetadata.estimatedDuration}</span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              pkg.status === 'ready' ? 'bg-green-100 text-green-700' :
                              pkg.status === 'produced' ? 'bg-accent-100 text-accent-700' :
                              'bg-background-200 text-foreground-500'
                            }`}>
                              {pkg.status === 'ready' ? 'Prêt' : pkg.status === 'produced' ? 'Produit' : 'Brouillon'}
                            </span>
                          </div>
                          <h3 className="font-heading text-base font-bold text-foreground-900 mb-1">{pkg.title}</h3>
                          <p className="text-sm text-foreground-600 line-clamp-2">{pkg.subtitle}</p>
                          <div className="flex flex-wrap items-center gap-1.5 mt-3">
                            {pkg.videoMetadata.seoKeywords.slice(0, 4).map((kw, i) => (
                              <span key={i} className="text-[10px] text-foreground-400 bg-background-100 px-2 py-0.5 rounded-full">{kw}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex-shrink-0 pt-1">
                          <ExpandIcon expanded={isExpanded} />
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {(isExpanded || isSelected) && selectedPackage && selectedPackage.id === pkg.id && (
                      <div className="px-5 pb-6 border-t border-background-200/70 animate-fade-in">
                        {/* Detail Tabs */}
                        <div className="flex items-center gap-1 mt-5 mb-5 border border-background-200/70 rounded-full p-1 w-fit">
                          {([
                            { id: 'script' as const, label: 'Script & Visuels', icon: 'ri-file-text-line' },
                            { id: 'metadata' as const, label: 'Métadonnées SEO', icon: 'ri-search-line' },
                            { id: 'conversion' as const, label: 'Conversion', icon: 'ri-funds-line' },
                          ]).map((dt) => (
                            <button
                              key={dt.id}
                              onClick={() => setDetailTab(dt.id)}
                              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                                detailTab === dt.id
                                  ? 'bg-accent-500 text-background-50'
                                  : 'text-foreground-600 hover:text-foreground-900'
                              }`}
                            >
                              <i className={`${dt.icon} text-xs`} />{dt.label}
                            </button>
                          ))}
                        </div>

                        {/* TAB: SCRIPT */}
                        {detailTab === 'script' && (
                          <div className="space-y-0">
                            {/* Target Audience */}
                            <div className="mb-5 p-4 rounded-lg bg-background-100 border border-background-200/60">
                              <h4 className="font-heading text-sm font-bold text-foreground-900 mb-3 flex items-center gap-2">
                                <i className="ri-user-search-line text-accent-500 text-sm" />
                                Audience Cible
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">Primaire</span>
                                  <ul className="mt-1.5 space-y-0.5">
                                    {selectedPackage.targetAudience.primary.map((p, i) => (
                                      <li key={i} className="text-xs text-foreground-700 flex items-start gap-1.5">
                                        <i className="ri-checkbox-blank-circle-fill text-[6px] text-accent-500 mt-1.5 flex-shrink-0" />{p}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">Pain Points</span>
                                  <ul className="mt-1.5 space-y-0.5">
                                    {selectedPackage.targetAudience.painPoints.map((p, i) => (
                                      <li key={i} className="text-xs text-foreground-700 flex items-start gap-1.5">
                                        <i className="ri-error-warning-line text-[10px] text-red-500 mt-0.5 flex-shrink-0" />{p}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* Script Sections */}
                            <h4 className="font-heading text-sm font-bold text-foreground-900 mb-3 flex items-center gap-2">
                              <i className="ri-file-text-line text-accent-500 text-sm" />
                              Script — {selectedPackage.videoMetadata.estimatedDuration}
                            </h4>
                            <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
                              {selectedPackage.script.map((section: ScriptSection, idx: number) => (
                                <div key={section.id} className="rounded-lg border border-background-200/60 overflow-hidden">
                                  <div className="flex items-center gap-3 px-4 py-3 bg-background-100">
                                    <span className="w-7 h-7 flex items-center justify-center rounded-md bg-accent-100 text-accent-700 font-heading text-xs font-bold">
                                      {idx + 1}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                      <span className="font-heading text-sm font-bold text-foreground-900">{section.title}</span>
                                      <span className="text-xs text-foreground-400 ml-2">{section.duration}</span>
                                    </div>
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-background-200 text-foreground-500 uppercase">
                                      {section.type}
                                    </span>
                                  </div>
                                  <div className="px-4 py-3">
                                    <div className="mb-3 rounded-lg bg-foreground-950 text-foreground-300 p-4 overflow-x-auto text-xs leading-relaxed font-mono whitespace-pre-wrap">
                                      {section.script}
                                    </div>
                                    {section.visualCues.length > 0 && (
                                      <div>
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">Cues Visuels</span>
                                        <div className="mt-1.5 space-y-1">
                                          {section.visualCues.map((cue: VisualCue, ci: number) => (
                                            <div key={ci} className="flex items-start gap-2 text-xs text-foreground-600">
                                              <VisualCueIcon type={cue.type} />
                                              <span className="text-foreground-400 font-mono">{cue.timestamp}</span>
                                              <span>{cue.instruction}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    {section.voiceDirection && (
                                      <div className="mt-2 pt-2 border-t border-background-200/60">
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">Direction Voix</span>
                                        <p className="text-xs text-foreground-600 mt-1 italic">{section.voiceDirection}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* TAB: METADATA */}
                        {detailTab === 'metadata' && (
                          <div className="space-y-5">
                            {/* SEO Title */}
                            <div className="p-4 rounded-lg border border-background-200/60 bg-background-50">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">Titre SEO YouTube (≤60 car.)</span>
                              <p className="text-sm font-bold text-foreground-900 mt-1">{selectedPackage.videoMetadata.seoTitle}</p>
                            </div>

                            {/* SEO Description */}
                            <div className="p-4 rounded-lg border border-background-200/60 bg-background-50">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">Meta Description</span>
                              <p className="text-sm text-foreground-700 mt-1">{selectedPackage.videoMetadata.seoDescription}</p>
                            </div>

                            {/* Keywords */}
                            <div className="p-4 rounded-lg border border-background-200/60 bg-background-50">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">Mots-clés SEO</span>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {selectedPackage.videoMetadata.seoKeywords.map((kw: string, i: number) => (
                                  <span key={i} className="text-[11px] text-foreground-600 bg-background-100 px-2.5 py-1 rounded-full">{kw}</span>
                                ))}
                              </div>
                            </div>

                            {/* Hashtags */}
                            <div className="p-4 rounded-lg border border-background-200/60 bg-background-50">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">Hashtags</span>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {selectedPackage.videoMetadata.hashtags.map((h: string, i: number) => (
                                  <span key={i} className="text-[11px] text-accent-700 bg-accent-50 px-2.5 py-1 rounded-full">{h}</span>
                                ))}
                              </div>
                            </div>

                            {/* YouTube Description */}
                            <div className="p-4 rounded-lg border border-background-200/60 bg-background-50">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">Description YouTube (300+ mots)</span>
                              <div className="mt-2 rounded-lg bg-foreground-950 text-foreground-300 p-4 max-h-[400px] overflow-y-auto">
                                <pre className="text-[11px] leading-relaxed font-mono whitespace-pre-wrap">{selectedPackage.youtubeDescription}</pre>
                              </div>
                            </div>

                            {/* Pinned Comment */}
                            <div className="p-4 rounded-lg border border-background-200/60 bg-background-50">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">Commentaire Épinglé</span>
                              <div className="mt-2 rounded-lg bg-accent-50 border border-accent-200/50 p-4">
                                <pre className="text-xs leading-relaxed font-mono whitespace-pre-wrap text-foreground-800">{selectedPackage.pinnedComment}</pre>
                              </div>
                            </div>

                            {/* Thumbnail Prompt */}
                            <div className="p-4 rounded-lg border border-background-200/60 bg-background-50">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">Prompt Miniature (Stable Diffusion)</span>
                              <p className="text-xs text-foreground-600 mt-1 leading-relaxed">{selectedPackage.videoMetadata.thumbnailPrompt}</p>
                            </div>

                            {/* Source Document */}
                            <div className="p-4 rounded-lg border border-background-200/60 bg-background-50">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">Document Source</span>
                              <p className="text-xs text-foreground-600 mt-1 font-mono">{selectedPackage.sourceDocument}</p>
                            </div>
                          </div>
                        )}

                        {/* TAB: CONVERSION */}
                        {detailTab === 'conversion' && (
                          <div className="space-y-5">
                            {/* Conversion Strategy */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="p-4 rounded-lg border border-background-200/60 bg-background-50">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">Lead Magnet</span>
                                <p className="text-sm font-bold text-foreground-900 mt-1">{selectedPackage.conversionStrategy.leadMagnet}</p>
                              </div>
                              <div className="p-4 rounded-lg border border-background-200/60 bg-background-50">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">Séquence Follow-Up</span>
                                <p className="text-sm text-foreground-700 mt-1">{selectedPackage.conversionStrategy.followUpSequence}</p>
                              </div>
                            </div>

                            {/* CTAs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="p-4 rounded-lg bg-accent-50 border border-accent-200/60">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-accent-600">CTA Primaire</span>
                                <p className="text-sm font-bold text-accent-900 mt-1">{selectedPackage.conversionStrategy.ctaPrimary}</p>
                              </div>
                              <div className="p-4 rounded-lg bg-primary-50 border border-primary-200/60">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary-600">CTA Secondaire</span>
                                <p className="text-sm font-bold text-primary-900 mt-1">{selectedPackage.conversionStrategy.ctaSecondary}</p>
                              </div>
                            </div>

                            {/* LinkedIn Summary */}
                            <div className="p-4 rounded-lg border border-background-200/60 bg-background-50">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">
                                <i className="ri-linkedin-fill mr-1 text-sm" />
                                Résumé LinkedIn
                              </span>
                              <p className="text-sm text-foreground-700 mt-1 leading-relaxed">{selectedPackage.linkedinSummary}</p>
                            </div>

                            {/* Blog Article Excerpt */}
                            <div className="p-4 rounded-lg border border-background-200/60 bg-background-50">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">
                                <i className="ri-article-line mr-1 text-sm" />
                                Extrait Article Blog
                              </span>
                              <p className="text-sm text-foreground-700 mt-1 leading-relaxed">{selectedPackage.blogArticleExcerpt}</p>
                            </div>

                            {/* Decision Triggers */}
                            <div className="p-4 rounded-lg border border-background-200/60 bg-background-50">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">Déclencheurs de Décision</span>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {selectedPackage.targetAudience.decisionTriggers.map((t: string, i: number) => (
                                  <span key={i} className="text-[11px] text-foreground-600 bg-secondary-100 px-2.5 py-1 rounded-full">{t}</span>
                                ))}
                              </div>
                            </div>

                            {/* Secondary Audience */}
                            <div className="p-4 rounded-lg border border-background-200/60 bg-background-50">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-400">Audience Secondaire</span>
                              <ul className="mt-1.5 space-y-0.5">
                                {selectedPackage.targetAudience.secondary.map((s: string, i: number) => (
                                  <li key={i} className="text-xs text-foreground-600 flex items-start gap-1.5">
                                    <i className="ri-checkbox-blank-circle-fill text-[6px] text-secondary-500 mt-1.5 flex-shrink-0" />{s}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Empty state */}
            {filteredPackages.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-2xl bg-background-100 mb-5">
                  <i className="ri-video-off-line text-3xl text-foreground-300" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground-700 mb-2">Aucun package trouvé</h3>
                <p className="text-sm text-foreground-500">Essayez d'autres filtres.</p>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════ CTA ═══════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-foreground-950 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #c4a235 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px bg-accent-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">Pipeline de Production</span>
              <div className="w-8 h-px bg-accent-400" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              De la documentation au contenu, du contenu à la mission
            </h2>
            <p className="text-body-md text-foreground-400 max-w-2xl mx-auto mb-8">
              La Production Package Factory transforme votre capital intellectuel en packages vidéo complets — scripts, visuels, métadonnées, stratégie de conversion. Connectez-vous au Voice AI Studio et à YouTube Connect pour finaliser la production.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/kos-voice-ai-studio/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5 bg-accent-500 text-background-50">
                <i className="ri-voiceprint-line" />
                Voice AI Studio
              </a>
              <a href="/youtube-connect/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5 bg-primary-500 text-background-50">
                <i className="ri-youtube-line" />
                Publier sur YouTube
              </a>
              <a href="/kos-multichannel-command/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5 border border-accent-400/50 text-accent-400 bg-accent-500/10">
                <i className="ri-global-line" />
                Multichannel Command
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}