import { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/feature/SeoHead';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { useBlogRegulatoryCorrection } from '@/hooks/useBlogRegulatoryCorrection';
import CorrectionCockpit from './components/CorrectionCockpit';
import PatternsPanel from './components/PatternsPanel';
import ArticleScoresPanel from './components/ArticleScoresPanel';
import CorrectionQueuePanel from './components/CorrectionQueuePanel';
import KnowledgeRulesPanel from './components/KnowledgeRulesPanel';
import CorrectionHistoryPanel from './components/CorrectionHistoryPanel';

const TABS = [
  { key: 'cockpit', label: 'Cockpit', icon: 'ri-dashboard-3-line' },
  { key: 'scores', label: 'Scores Articles', icon: 'ri-medal-line' },
  { key: 'patterns', label: 'Patterns', icon: 'ri-scan-2-line' },
  { key: 'queue', label: 'File Correction', icon: 'ri-tools-line' },
  { key: 'rules', label: 'Règles Apprises', icon: 'ri-brain-line' },
  { key: 'history', label: 'Historique', icon: 'ri-history-line' },
] as const;

type TabKey = typeof TABS[number]['key'];

export default function KOSBlogRegulatoryCorrectionPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('cockpit');
  const {
    patterns,
    correctionRecords,
    knowledgeRules,
    learningStats,
    articleScores,
    correctionQueue,
    p0Count,
    p1Count,
    p2Count,
    totalPending,
    totalFixed,
    excellentCount,
    needsImprovementCount,
    averageScore,
    loading,
    error,
    refresh,
  } = useBlogRegulatoryCorrection();

  if (loading) {
    return (
      <>
        <SeoHead
          title="KOS Blog Regulatory Correction Engine — KHEPRA EXPERTS"
          description="Moteur de correction réglementaire autonome — Audit BCEAO/COBAC/GAFI des articles blog, correction Big Four, autoapprentissage continu"
          canonicalPath="/kos-blog-regulatory-correction-engine"
          noIndex={true}
        />
        <KOSHubLayout hubId={64} activeTab="Blog Correction" tabLabel="Blog Correction Engine">
          <div className="bg-background-50 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-foreground-500 font-body">Initialisation du moteur de correction réglementaire...</p>
            </div>
          </div>
        </KOSHubLayout>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SeoHead
          title="KOS Blog Regulatory Correction Engine — KHEPRA EXPERTS"
          description="Moteur de correction réglementaire autonome"
          canonicalPath="/kos-blog-regulatory-correction-engine"
          noIndex={true}
        />
        <KOSHubLayout hubId={64} activeTab="Blog Correction" tabLabel="Blog Correction Engine">
          <div className="bg-background-50 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 max-w-md text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-100 text-red-600">
                <i className="ri-error-warning-line text-2xl"></i>
              </div>
              <p className="text-sm text-foreground-700 font-body">{error}</p>
              <button
                type="button"
                onClick={refresh}
                className="px-4 py-2 rounded-lg bg-accent-500 text-background-50 text-sm font-semibold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap"
              >
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
      <SeoHead
        title="KOS Blog Regulatory Correction Engine — KHEPRA EXPERTS"
        description="Moteur de correction réglementaire autonome — Audit BCEAO/COBAC/GAFI des articles blog, correction Big Four, autoapprentissage continu. 39 articles scannés, 247 corrections appliquées, 10 règles auto-générées, score moyen 92/100."
        canonicalPath="/kos-blog-regulatory-correction-engine"
        noIndex={true}
      />
      <KOSHubLayout hubId={64} activeTab="Blog Correction" tabLabel="Blog Correction Engine">
        <div className="bg-background-50 min-h-screen">
          {/* Hero Header */}
          <section className="bg-background-100 border-b border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-accent-100 text-accent-700 shrink-0">
                    <i className="ri-scales-3-line text-2xl"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-accent-100 text-accent-700 font-body tracking-wide">
                        KOS AUTONOMOUS
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary-100 text-primary-700 font-body tracking-wide">
                        BCEAO / COBAC / GAFI
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 font-body tracking-wide">
                        AUTOAPPRENTISSAGE
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 font-body tracking-wide">
                        12 PATTERNS
                      </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading">
                      KOS Blog Regulatory Correction Engine
                    </h1>
                    <p className="text-sm text-foreground-600 mt-1.5 max-w-2xl font-body">
                      Système autonome d&apos;audit et de correction réglementaire des articles blog KHEPRA EXPERTS.
                      Fonctionnement : Scan → Audit → Correction → Enrichissement → Scoring → Autoapprentissage.
                      Aligné sur les standards Big Four — BCEAO, COBAC, BEAC, OHADA, GAFI.
                    </p>
                  </div>
                </div>
                {/* Stats Card */}
                <div className="flex items-center gap-5 shrink-0">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-red-600 font-heading">{p0Count}</span>
                    <span className="text-[10px] font-medium text-foreground-500 font-body block">P0 Critiques</span>
                  </div>
                  <div className="w-px h-10 bg-background-200/70"></div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-amber-600 font-heading">{totalPending}</span>
                    <span className="text-[10px] font-medium text-foreground-500 font-body block">En attente</span>
                  </div>
                  <div className="w-px h-10 bg-background-200/70"></div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-emerald-600 font-heading">{totalFixed}</span>
                    <span className="text-[10px] font-medium text-foreground-500 font-body block">Corrections</span>
                  </div>
                  <div className="w-px h-10 bg-background-200/70"></div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-primary-600 font-heading">{averageScore}/100</span>
                    <span className="text-[10px] font-medium text-foreground-500 font-body block">Score Moyen</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Critical Alert Banner */}
          {p0Count > 0 && (
            <div className="bg-red-50 border-b border-red-200">
              <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5">
                <div className="flex items-center gap-2 text-sm">
                  <i className="ri-error-warning-line text-red-600 animate-pulse"></i>
                  <span className="font-semibold text-red-700 font-body">
                    {p0Count} corrections réglementaires critiques en attente
                  </span>
                  <span className="text-red-500 font-body">
                    — {correctionQueue.filter(t => t.severity === 'P0').map(t => t.articleTitle).join(' · ')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Self-Learning Status Bar */}
          <div className="bg-background-100 border-b border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs text-foreground-500 font-body">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${learningStats.autoFixEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                  Auto-fix : {learningStats.autoFixEnabled ? 'Activé' : 'Désactivé'}
                </span>
                <span className="hidden sm:inline text-foreground-300">|</span>
                <span className="flex items-center gap-1.5">
                  <i className="ri-loop-left-line text-accent-500"></i>
                  Dernier cycle : {new Date(learningStats.lastLearningCycle).toLocaleString('fr-FR')}
                </span>
                <span className="hidden sm:inline text-foreground-300">|</span>
                <span className="flex items-center gap-1.5">
                  <i className="ri-timer-line text-accent-500"></i>
                  Prochain scan : {new Date(learningStats.nextScheduledScan).toLocaleString('fr-FR')}
                </span>
                <span className="hidden sm:inline text-foreground-300">|</span>
                <span className="flex items-center gap-1.5">
                  <i className="ri-brain-line text-primary-500"></i>
                  {knowledgeRules.length} règles auto-générées
                </span>
                <span className="hidden sm:inline text-foreground-300">|</span>
                <span className="flex items-center gap-1.5">
                  <i className="ri-article-line text-foreground-400"></i>
                  {learningStats.totalArticlesScanned} articles scannés
                </span>
              </div>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-none">
                {TABS.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      activeTab === tab.key
                        ? 'bg-accent-500 text-background-50'
                        : 'text-foreground-600 hover:text-foreground-900 hover:bg-background-100'
                    }`}
                    type="button"
                  >
                    <i className={`${tab.icon} text-sm`}></i>
                    {tab.label}
                  </button>
                ))}
                <Link
                  to="/blog"
                  className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-foreground-500 hover:text-foreground-900 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-article-line text-sm"></i>
                  Voir le Blog
                  <i className="ri-arrow-right-up-line text-xs"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            {activeTab === 'cockpit' && (
              <CorrectionCockpit
                learningStats={learningStats}
                patterns={patterns}
                knowledgeRules={knowledgeRules}
                articleScores={articleScores}
                excellentCount={excellentCount}
                needsImprovementCount={needsImprovementCount}
                averageScore={averageScore}
              />
            )}
            {activeTab === 'scores' && (
              <ArticleScoresPanel articleScores={articleScores} />
            )}
            {activeTab === 'patterns' && (
              <PatternsPanel patterns={patterns} />
            )}
            {activeTab === 'queue' && (
              <CorrectionQueuePanel
                queue={correctionQueue}
                p0Count={p0Count}
                p1Count={p1Count}
                p2Count={p2Count}
              />
            )}
            {activeTab === 'rules' && (
              <KnowledgeRulesPanel rules={knowledgeRules} />
            )}
            {activeTab === 'history' && (
              <CorrectionHistoryPanel records={correctionRecords} />
            )}
          </div>

          {/* Footer Bar */}
          <footer className="border-t border-background-200/70 bg-background-100 mt-8">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-[10px] text-foreground-500 font-body">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Score cible : ≥ 95/100
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                    Standards : BCEAO · COBAC · BEAC · OHADA · GAFI
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-foreground-400 font-body">
                  <span>KOS Autonomous — Scan → Audit → Correct → Enrich → Score → Learn</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </KOSHubLayout>
    </>
  );
}