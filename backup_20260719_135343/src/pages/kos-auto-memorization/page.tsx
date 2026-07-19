import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { useKOSAutoMemorization } from '@/hooks/useKOSAutoMemorization';
import type { CorrectionFixPattern, MemorizationScan, AutoFixEvent } from '@/mocks/memorization';

type TabId = 'patterns' | 'scans' | 'events' | 'cross';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'patterns', label: 'Patterns Auto-Fix', icon: 'ri-lightbulb-flash-line' },
  { id: 'scans', label: 'Scans Mémorisation', icon: 'ri-radar-line' },
  { id: 'events', label: 'Événements Auto-Fix', icon: 'ri-flashlight-line' },
  { id: 'cross', label: 'Impact Cross-Engine', icon: 'ri-share-line' },
];

const CATEGORY_LABELS: Record<string, string> = {
  broken_link: 'Liens Cassés',
  content_quality: 'Qualité Contenu',
  security_header: 'Sécurité Headers',
  conversion_gap: 'Conversion',
  seo_gap: 'SEO',
  infra_gap: 'Infrastructure',
  compliance_gap: 'Conformité',
  data_gap: 'Données',
  process_gap: 'Processus',
};

const CATEGORY_COLORS: Record<string, string> = {
  broken_link: 'text-red-600 bg-red-100 border-red-200',
  content_quality: 'text-primary-600 bg-primary-100 border-primary-200',
  security_header: 'text-amber-600 bg-amber-100 border-amber-200',
  conversion_gap: 'text-emerald-600 bg-emerald-100 border-emerald-200',
  seo_gap: 'text-accent-600 bg-accent-100 border-accent-200',
  infra_gap: 'text-secondary-600 bg-secondary-100 border-secondary-200',
  compliance_gap: 'text-red-600 bg-red-100 border-red-200',
  data_gap: 'text-primary-600 bg-primary-100 border-primary-200',
  process_gap: 'text-amber-600 bg-amber-100 border-amber-200',
};

export default function autoMemorizationPage() {
  const [activeTab, setActiveTab] = useState<TabId>('patterns');
  const engine = useKOSAutoMemorization();

  const handleScan = async () => {
    try {
      await engine.runFullMemorizationScan();
    } catch {
      // error handled by hook
    }
  };

  return (
    <hubLayout hubId={95} activeTab="Auto-Memorization" tabLabel="Auto-Apprentissage & Mémorisation">
      <SeoHead
        title="KOS Auto-Memorization — Auto-Apprentissage & Auto-Correction | KHEPRA"
        description="Centre de Commande Auto-Apprentissage KOS. Mémorisation des corrections passées, extraction de patterns, déploiement auto-fix. 10 patterns actifs, 89 corrections automatiques, 21h de travail économisées."
        keywords="KOS Auto-Memorization, auto-apprentissage, auto-correction, pattern extraction, auto-fix, KHEPRA EXPERTS, KOS self-learning"
        canonicalPath="/kos-auto-memorization"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-10 sm:pt-40 sm:pb-14 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20neural%20memory%20network%20visualization%20with%20interconnected%20data%20nodes%20forming%20crystalline%20patterns%2C%20self-learning%20system%20architecture%20with%20emerald%20and%20amber%20energy%20flows%2C%20holographic%20memory%20banks%20storing%20correction%20patterns%2C%20autonomous%20AI%20system%20auto-healing%20concept%2C%20dark%20technological%20background%2C%20no%20text%20no%20human%20figures%2C%20cinematic%20volumetric%20lighting%2C%20ultra%20detailed%208K%20render%20with%20subsurface%20scattering&width=1920&height=700&seq=kos-memorization-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-12"
            width="1920"
            height="700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/20 via-foreground-950/50 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 border border-accent-400/30 backdrop-blur-sm">
              <i className="ri-brain-line text-accent-400 text-sm" />
              <span className="text-sm font-semibold text-accent-300 uppercase tracking-wider">Auto-Memorization Engine</span>
            </div>
            {engine.isLive && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">LIVE — SUPABASE</span>
              </div>
            )}
            {engine.isScanning && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <i className="ri-loader-4-line animate-spin text-amber-400 text-sm" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">SCAN EN COURS</span>
              </div>
            )}
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            KOS mémorise.
            <span className="block text-accent-400 mt-2">Chaque correction nourrit l'auto-apprentissage.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-4 max-w-3xl">
            Le <strong className="text-white">KOS Auto-Memorization Engine</strong> scanne l'historique complet des corrections
            (tickets, fix history, lessons learned, best practices), extrait les <strong className="text-accent-400">patterns de correction</strong>,
            et déploie des <strong className="text-emerald-400">stratégies auto-fix</strong> pour que les erreurs connues
            ne nécessitent <strong className="text-white">plus jamais d'intervention humaine</strong>.
          </p>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="py-3 bg-accent-50 border-b border-accent-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {[
              { label: 'Corrections Scannées', value: engine.stats.totalCorrectionsScanned.toLocaleString(), icon: 'ri-search-line', color: 'text-accent-600' },
              { label: 'Patterns Actifs', value: engine.activePatterns.length, icon: 'ri-lightbulb-flash-line', color: 'text-emerald-600' },
              { label: 'Auto-Fix Appliqués', value: engine.stats.totalAutoFixesApplied, icon: 'ri-flashlight-line', color: 'text-primary-600' },
              { label: 'Taux Succès Auto-Fix', value: `${engine.stats.autoFixSuccessRate}%`, icon: 'ri-check-double-line', color: 'text-emerald-500' },
              { label: 'Heures Économisées', value: `${engine.stats.totalTimeSavedHours.toFixed(1)}h`, icon: 'ri-timer-flash-line', color: 'text-accent-500' },
              { label: 'Interventions Évitées', value: engine.stats.humanInterventionsAvoided, icon: 'ri-user-unfollow-line', color: 'text-secondary-600' },
              { label: 'Vélocité', value: `${engine.stats.learningVelocity}/j`, icon: 'ri-speed-up-line', color: 'text-foreground-500' },
            ].map((s, i) => (
              <div key={i} className="text-center py-1.5 rounded-lg bg-white border border-accent-100">
                <i className={`${s.icon} ${s.color} text-xs mb-0.5 block`} />
                <span className="block text-base font-bold text-foreground-950 font-heading">{s.value}</span>
                <span className="text-[9px] text-foreground-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SCAN COMMAND ===== */}
      <section className="py-4 bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground-950 text-sm mb-1">
                <i className="ri-radar-line text-accent-500 mr-2" />
                Memorization Scan — Analyse cross-source des corrections
              </h3>
              <p className="text-xs text-foreground-500">
                {engine.isScanning
                  ? `Scan en cours — ${engine.activeScan?.sourcesScanned.length || 9} sources analysées...`
                  : engine.scans.length > 0
                    ? `Dernier scan : ${new Date(engine.scans[0].startedAt).toLocaleString('fr-FR')} — ${engine.scans[0].patternsDiscovered} patterns, ${engine.scans[0].newAutoFixableDetected} auto-fixables`
                    : 'Lancez un scan complet pour analyser l\'historique des corrections et extraire des patterns auto-fix'}
              </p>
            </div>
            <button
              onClick={handleScan}
              disabled={engine.isScanning}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
                engine.isScanning
                  ? 'bg-accent-300 text-white cursor-wait'
                  : 'bg-accent-500 text-white hover:bg-accent-600 hover:scale-105'
              } disabled:opacity-80`}
            >
              {engine.isScanning ? (
                <>
                  <i className="ri-loader-4-line animate-spin" />
                  SCAN EN COURS...
                </>
              ) : (
                <>
                  <i className="ri-play-circle-line text-lg" />
                  LANCER SCAN COMPLET
                </>
              )}
            </button>
          </div>

          {engine.isScanning && engine.activeScan && (
            <div className="mt-3 p-3 rounded-xl bg-accent-50 border border-accent-200/70">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-accent-400 border-t-transparent animate-spin" />
                <div>
                  <span className="text-sm font-semibold text-accent-700">Scan actif — {engine.activeScan.id}</span>
                  <div className="flex gap-2 mt-1 text-xs text-accent-600">
                    <span>Sources: {engine.activeScan.sourcesScanned.length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== TAB NAVIGATION ===== */}
      <div className="sticky top-[88px] z-20 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-white'
                    : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
                }`}
              >
                <i className={`${tab.icon} text-xs`} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== TAB: PATTERNS ===== */}
      {activeTab === 'patterns' && <PatternsTab engine={engine} />}

      {/* ===== TAB: SCANS ===== */}
      {activeTab === 'scans' && <ScansTab engine={engine} />}

      {/* ===== TAB: EVENTS ===== */}
      {activeTab === 'events' && <EventsTab engine={engine} />}

      {/* ===== TAB: CROSS-ENGINE ===== */}
      {activeTab === 'cross' && <CrossTab engine={engine} />}

      {/* ===== CROSS-LINKS ===== */}
      <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">KOS Intelligence — Tous les Centres</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {[
              { label: 'Auto-Learning', path: '/kos-auto-learning-agentic', icon: 'ri-brain-line' },
              { label: 'Self-Evolution', path: '/kos-self-evolution', icon: 'ri-loop-left-line' },
              { label: 'Correction Engine', path: '/kos-correction-engine', icon: 'ri-tools-line' },
              { label: 'Orchestrator', path: '/kos-orchestrator-engine', icon: 'ri-flow-chart' },
              { label: 'Multi-Agent', path: '/kos-multi-agent-orchestration', icon: 'ri-robot-2-line' },
              { label: 'Enterprise Brain', path: '/kos-enterprise-brain-os', icon: 'ri-database-2-line' },
              { label: 'Tasks 100', path: '/kos-tasks-restantes-100', icon: 'ri-task-line' },
            ].map(link => (
              <a key={link.path} href={link.path} className="rounded-xl border border-background-200 bg-white p-3 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block">
                <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg bg-accent-100 flex items-center justify-center">
                  <i className={`${link.icon} text-accent-600 text-sm`} />
                </div>
                <span className="text-[10px] font-bold text-foreground-700 leading-tight">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}

// ═══════════════════════════════════════════
// TAB: PATTERNS AUTO-FIX
// ═══════════════════════════════════════════

function PatternsTab({ engine }: { engine: ReturnType<typeof useKOSAutoMemorization> }) {
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredPatterns = categoryFilter === 'all'
    ? engine.patterns
    : engine.patterns.filter(p => p.errorCategory === categoryFilter);

  const categories = Object.keys(engine.patternsByCategory).filter(
    k => engine.patternsByCategory[k as keyof typeof engine.patternsByCategory].length > 0,
  );

  return (
    <section className="py-6 sm:py-10 bg-background-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${
              categoryFilter === 'all' ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'
            }`}
          >
            Tous ({engine.patterns.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap border ${
                categoryFilter === cat
                  ? `${CATEGORY_COLORS[cat] || 'bg-foreground-950 text-white'}`
                  : 'bg-white border-background-200 text-foreground-600 hover:border-foreground-300'
              }`}
            >
              {CATEGORY_LABELS[cat] || cat} ({engine.patternsByCategory[cat as keyof typeof engine.patternsByCategory]?.length || 0})
            </button>
          ))}
        </div>

        {/* Pattern cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPatterns.map(pattern => (
            <ScrollReveal key={pattern.id}>
              <div
                className={`rounded-xl border bg-white overflow-hidden transition-all cursor-pointer ${
                  pattern.status === 'active' ? 'border-emerald-300 ring-1 ring-emerald-100' :
                  pattern.status === 'testing' ? 'border-amber-200' :
                  pattern.status === 'learning' ? 'border-accent-200' :
                  'border-background-200 opacity-60'
                }`}
                onClick={() => setExpandedPattern(expandedPattern === pattern.id ? null : pattern.id)}
              >
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      pattern.errorCategory === 'broken_link' ? 'bg-red-100 text-red-600' :
                      pattern.errorCategory === 'content_quality' ? 'bg-primary-100 text-primary-600' :
                      pattern.errorCategory === 'security_header' ? 'bg-amber-100 text-amber-600' :
                      pattern.errorCategory === 'conversion_gap' ? 'bg-emerald-100 text-emerald-600' :
                      pattern.errorCategory === 'seo_gap' ? 'bg-accent-100 text-accent-600' :
                      'bg-secondary-100 text-secondary-600'
                    }`}>
                      <i className={`${
                        pattern.errorCategory === 'broken_link' ? 'ri-link-unlink' :
                        pattern.errorCategory === 'content_quality' ? 'ri-file-text-line' :
                        pattern.errorCategory === 'security_header' ? 'ri-shield-flash-line' :
                        pattern.errorCategory === 'conversion_gap' ? 'ri-line-chart-line' :
                        pattern.errorCategory === 'seo_gap' ? 'ri-search-line' :
                        'ri-settings-3-line'
                      } text-lg`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-sm font-bold text-foreground-950">{pattern.patternName}</h3>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                          pattern.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                          pattern.status === 'testing' ? 'bg-amber-100 text-amber-700' :
                          pattern.status === 'learning' ? 'bg-accent-100 text-accent-700' :
                          'bg-background-100 text-foreground-500'
                        }`}>
                          {pattern.status.toUpperCase()}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">
                          {CATEGORY_LABELS[pattern.errorCategory] || pattern.errorCategory}
                        </span>
                      </div>
                      <p className="text-xs text-foreground-500 mb-2">{pattern.autoFixStrategy.slice(0, 100)}...</p>
                      <div className="flex flex-wrap items-center gap-3 text-[10px] text-foreground-400">
                        <span><i className="ri-flashlight-line mr-1" />{pattern.totalOccurrences} occurrences</span>
                        <span className={pattern.autoFixSuccessRate >= 90 ? 'text-emerald-600 font-bold' : pattern.autoFixSuccessRate >= 80 ? 'text-accent-600 font-bold' : 'text-amber-600 font-bold'}>
                          {pattern.autoFixSuccessRate}% succès
                        </span>
                        <span><i className="ri-timer-line mr-1" />{pattern.estimatedTimeToFixMin}min/fix</span>
                        {pattern.manualFixRequired && (
                          <span className="text-amber-600"><i className="ri-user-line mr-1" />Validation humaine</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-lg font-bold text-emerald-600">{pattern.savingsMinutesCumulated}min</span>
                      <p className="text-[9px] text-foreground-400">économisées</p>
                    </div>
                  </div>

                  {expandedPattern === pattern.id && (
                    <div className="mt-4 pt-4 border-t border-background-100 space-y-3">
                      {/* Fix Steps */}
                      <div>
                        <h4 className="text-xs font-semibold text-accent-600 uppercase tracking-wider mb-1.5">
                          <i className="ri-list-ordered mr-1" />Étapes Auto-Fix
                        </h4>
                        <ol className="space-y-1">
                          {pattern.fixSteps.map((step, i) => (
                            <li key={i} className="text-xs text-foreground-600 flex items-start gap-1.5">
                              <span className="text-emerald-500 font-bold flex-shrink-0">{i + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Error Signatures */}
                      <div className="p-2.5 rounded-lg bg-background-50 border border-background-100">
                        <span className="text-[10px] font-semibold text-foreground-500">Signatures d'erreur :</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {pattern.errorSignature.map((sig, i) => (
                            <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-100">{sig}</span>
                          ))}
                        </div>
                      </div>

                      {/* Cross-engine impact */}
                      <div>
                        <span className="text-[10px] font-semibold text-foreground-500">Impacte les engines :</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {pattern.crossEngineImpact.map(eng => (
                            <span key={eng} className="text-[9px] px-2 py-0.5 rounded-full bg-accent-50 text-accent-700 border border-accent-200">{eng}</span>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        {pattern.status !== 'active' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); engine.promotePattern(pattern.id); }}
                            className="flex-1 px-3 py-2 rounded-lg bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors cursor-pointer whitespace-nowrap"
                          >
                            <i className="ri-arrow-up-circle-line mr-1" />Activer l'Auto-Fix
                          </button>
                        )}
                        {pattern.status === 'active' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); engine.deprecatePattern(pattern.id); }}
                            className="flex-1 px-3 py-2 rounded-lg bg-background-100 text-foreground-500 text-xs font-bold hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap"
                          >
                            <i className="ri-archive-line mr-1" />Déprécier
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            engine.applyAutoFix(pattern.id, '/test-url', pattern.detectedFrom[0] || 'unknown');
                          }}
                          className="flex-1 px-3 py-2 rounded-lg bg-accent-500 text-white text-xs font-bold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-flashlight-line mr-1" />Tester Auto-Fix
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {filteredPatterns.length === 0 && (
          <div className="text-center py-16 text-foreground-400">
            <i className="ri-inbox-line text-4xl block mb-3" />
            <p className="text-sm">Aucun pattern dans cette catégorie. Lancez un scan de mémorisation.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// TAB: SCANS DE MÉMORISATION
// ═══════════════════════════════════════════

function ScansTab({ engine }: { engine: ReturnType<typeof useKOSAutoMemorization> }) {
  return (
    <section className="py-6 sm:py-10 bg-background-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          {engine.scans.map(scan => (
            <ScrollReveal key={scan.id}>
              <div className={`rounded-xl border bg-white overflow-hidden ${
                scan.status === 'running' ? 'border-accent-300 ring-2 ring-accent-100' :
                scan.status === 'completed' ? 'border-background-200' :
                'border-red-200'
              }`}>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${
                          scan.status === 'running' ? 'bg-accent-500 animate-pulse' :
                          scan.status === 'completed' ? 'bg-emerald-500' :
                          'bg-red-500'
                        }`} />
                        <span className="text-sm font-bold text-foreground-950">{scan.id}</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                          scan.status === 'running' ? 'bg-accent-100 text-accent-700' :
                          scan.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-red-100 text-red-700'
                        }`}>{scan.status.toUpperCase()}</span>
                      </div>
                      <p className="text-xs text-foreground-500 mb-2">{scan.summary}</p>
                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-foreground-400">
                        <span><i className="ri-ticket-line mr-1" />{scan.totalTicketsAnalyzed} tickets</span>
                        <span>•</span>
                        <span><i className="ri-history-line mr-1" />{scan.totalFixHistoryAnalyzed} fix history</span>
                        <span>•</span>
                        <span><i className="ri-lightbulb-flash-line mr-1" />{scan.patternsDiscovered} patterns</span>
                        <span>•</span>
                        <span><i className="ri-rocket-line mr-1" />{scan.autoFixStrategiesDeployed} stratégies déployées</span>
                        <span>•</span>
                        <span className="text-emerald-600 font-bold">{scan.newAutoFixableDetected} auto-fixables</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 text-xs text-foreground-400">
                      <div>{new Date(scan.startedAt).toLocaleString('fr-FR')}</div>
                      {scan.completedAt && (
                        <div className="text-emerald-600">
                          {Math.round((new Date(scan.completedAt).getTime() - new Date(scan.startedAt).getTime()) / 1000)}s
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sources scanned */}
                  {scan.sourcesScanned.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-background-100">
                      <span className="text-[10px] font-semibold text-foreground-500">Sources scannées :</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {scan.sourcesScanned.map(src => (
                          <span key={src} className="text-[9px] px-2 py-0.5 rounded-full bg-accent-50 text-accent-700 border border-accent-200 font-mono">{src}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// TAB: ÉVÉNEMENTS AUTO-FIX
// ═══════════════════════════════════════════

function EventsTab({ engine }: { engine: ReturnType<typeof useKOSAutoMemorization> }) {
  return (
    <section className="py-6 sm:py-10 bg-background-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total Auto-Fix', value: engine.events.length, icon: 'ri-flashlight-line', color: 'text-accent-600' },
            { label: 'Réussis', value: engine.successfulFixes.length, icon: 'ri-check-double-line', color: 'text-emerald-600' },
            { label: 'Échoués', value: engine.failedFixes.length, icon: 'ri-close-circle-line', color: 'text-red-500' },
            { label: 'Temps Économisé', value: `${engine.events.reduce((s, e) => s + e.timeSavedMin, 0)}min`, icon: 'ri-timer-flash-line', color: 'text-accent-500' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-background-200 rounded-lg p-3 text-center">
              <i className={`${s.icon} ${s.color} text-lg`} />
              <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
              <p className="text-[10px] text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Events table */}
        <div className="bg-white border border-background-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-background-200 bg-background-50">
                <th className="text-left p-3 text-[10px] font-semibold text-foreground-500 uppercase">Horodatage</th>
                <th className="text-left p-3 text-[10px] font-semibold text-foreground-500 uppercase">Ticket</th>
                <th className="text-left p-3 text-[10px] font-semibold text-foreground-500 uppercase">Engine</th>
                <th className="text-left p-3 text-[10px] font-semibold text-foreground-500 uppercase">Pattern</th>
                <th className="text-left p-3 text-[10px] font-semibold text-foreground-500 uppercase">URL Cible</th>
                <th className="text-center p-3 text-[10px] font-semibold text-foreground-500 uppercase">Succès</th>
                <th className="text-right p-3 text-[10px] font-semibold text-foreground-500 uppercase">Temps Économisé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-background-100">
              {engine.events.map(event => {
                const pattern = engine.patterns.find(p => p.id === event.patternApplied);
                return (
                  <tr key={event.id} className="hover:bg-background-50/50 transition-colors">
                    <td className="p-3 text-[10px] text-foreground-500 whitespace-nowrap">
                      {new Date(event.timestamp).toLocaleString('fr-FR')}
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] font-mono text-foreground-700">{event.ticketId}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent-50 text-accent-700">{event.engine}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] text-foreground-600">{pattern?.patternName?.slice(0, 40) || event.patternApplied}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] font-mono text-foreground-500 truncate max-w-[180px] block">{event.targetUrl}</span>
                    </td>
                    <td className="p-3 text-center">
                      {event.success ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                          <i className="ri-check-line" />OK
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] text-red-500 font-bold">
                          <i className="ri-close-line" />ÉCHEC
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-[10px] font-bold text-emerald-600">{event.timeSavedMin > 0 ? `${event.timeSavedMin}min` : '-'}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// TAB: IMPACT CROSS-ENGINE
// ═══════════════════════════════════════════

function CrossTab({ engine }: { engine: ReturnType<typeof useKOSAutoMemorization> }) {
  const allEngines = [...new Set(engine.patterns.flatMap(p => [...p.detectedFrom, ...p.crossEngineImpact]))];

  const engineImpact = allEngines.map(eng => {
    const detects = engine.patterns.filter(p => p.detectedFrom.includes(eng));
    const impacts = engine.patterns.filter(p => p.crossEngineImpact.includes(eng));
    const allRelated = engine.patterns.filter(p => p.detectedFrom.includes(eng) || p.crossEngineImpact.includes(eng));
    const fixesForEngine = engine.events.filter(e => e.engine === eng);
    return {
      engine: eng,
      patternsDetected: detects.length,
      patternsImpacting: impacts.length,
      totalPatterns: allRelated.length,
      autoFixesCount: fixesForEngine.length,
      successRate: fixesForEngine.length > 0
        ? Math.round((fixesForEngine.filter(e => e.success).length / fixesForEngine.length) * 100)
        : 0,
      timeSaved: fixesForEngine.reduce((s, e) => s + e.timeSavedMin, 0),
    };
  }).sort((a, b) => b.totalPatterns - a.totalPatterns);

  return (
    <section className="py-6 sm:py-10 bg-background-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-foreground-500 mb-6">
          Quand un pattern de correction est découvert dans un engine, il peut impacter automatiquement les autres engines connectés.
          {engine.patterns.reduce((s, p) => s + p.crossEngineImpact.length, 0)} connexions cross-engine actives.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {engineImpact.map(ei => (
            <ScrollReveal key={ei.engine}>
              <div className="rounded-xl border border-background-200 bg-white p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-foreground-950">{ei.engine}</h3>
                  <span className={`text-xs font-bold ${ei.successRate >= 90 ? 'text-emerald-600' : ei.successRate >= 70 ? 'text-amber-600' : 'text-red-500'}`}>
                    {ei.autoFixesCount > 0 ? `${ei.successRate}% succès` : 'Aucun fix'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                  <div className="p-2 rounded-lg bg-accent-50">
                    <span className="block text-lg font-bold text-accent-700">{ei.patternsDetected}</span>
                    <span className="text-[9px] text-accent-500">Patterns détectés</span>
                  </div>
                  <div className="p-2 rounded-lg bg-primary-50">
                    <span className="block text-lg font-bold text-primary-700">{ei.patternsImpacting}</span>
                    <span className="text-[9px] text-primary-500">Impactés</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50">
                    <span className="block text-lg font-bold text-emerald-700">{ei.autoFixesCount}</span>
                    <span className="text-[9px] text-emerald-500">Auto-fixes</span>
                  </div>
                </div>

                {/* Connected patterns */}
                <div className="space-y-1.5">
                  {engine.patterns.filter(p => p.detectedFrom.includes(ei.engine) || p.crossEngineImpact.includes(ei.engine)).slice(0, 3).map(p => (
                    <div key={p.id} className="flex items-center justify-between text-[10px]">
                      <span className="text-foreground-600 truncate mr-2">{p.patternName.slice(0, 50)}</span>
                      <span className={`flex-shrink-0 font-bold ${p.status === 'active' ? 'text-emerald-600' : 'text-foreground-400'}`}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>

                {ei.timeSaved > 0 && (
                  <div className="mt-3 pt-3 border-t border-background-100 text-[10px] text-emerald-600 font-semibold">
                    <i className="ri-timer-flash-line mr-1" />{ei.timeSaved}min économisées
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}



