import type { LearningStats, RegulatoryPattern, KnowledgeRule, ArticleBigFourScore } from '@/mocks/selfLearningEngine';

interface CorrectionCockpitProps {
  learningStats: LearningStats;
  patterns: RegulatoryPattern[];
  knowledgeRules: KnowledgeRule[];
  articleScores: ArticleBigFourScore[];
  excellentCount: number;
  needsImprovementCount: number;
  averageScore: number;
}

export default function CorrectionCockpit({
  learningStats,
  patterns,
  knowledgeRules,
  articleScores,
  excellentCount,
  needsImprovementCount,
  averageScore,
}: CorrectionCockpitProps) {
  const critiquePatterns = patterns.filter(p => p.severity === 'critique').length;
  const totalOccurrences = patterns.reduce((sum, p) => sum + p.occurrencesFound, 0);
  const severityColors: Record<string, string> = {
    critique: 'bg-red-100 text-red-800 border-red-200',
    élevé: 'bg-amber-100 text-amber-800 border-amber-200',
    moyen: 'bg-secondary-100 text-secondary-800 border-secondary-200',
  };
  const categoryLabels: Record<string, string> = {
    formulation: 'Formulation',
    source: 'Traçabilité',
    governance: 'Gouvernance',
    aml_cft: 'AML/CFT',
    prudential: 'Prudentiel',
    legal: 'Juridique',
  };

  return (
    <div className="space-y-8">
      {/* ═══ SCORE GLOBAL ═══ */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-background-100 border border-background-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-foreground-500 uppercase tracking-wider font-body">Score Moyen Big Four</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
              <i className="ri-medal-line"></i>
            </span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-foreground-950 font-heading">{averageScore}</span>
            <span className="text-sm text-foreground-500 mb-1">/100</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs">
            <span className="text-emerald-600 font-semibold">Avant : {learningStats.averageScoreBefore}</span>
            <span className="text-foreground-400">→</span>
            <span className="text-primary-600 font-semibold">Après : {learningStats.averageScoreAfter}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-background-100 border border-background-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-foreground-500 uppercase tracking-wider font-body">Articles</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <i className="ri-article-line"></i>
            </span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-foreground-950 font-heading">{learningStats.totalArticlesScanned}</span>
            <span className="text-sm text-foreground-500 mb-1">scannés</span>
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {excellentCount} excellents
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              {needsImprovementCount} à améliorer
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-background-100 border border-background-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-foreground-500 uppercase tracking-wider font-body">Corrections</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
              <i className="ri-check-double-line"></i>
            </span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-foreground-950 font-heading">{learningStats.totalCorrectionsApplied}</span>
            <span className="text-sm text-foreground-500 mb-1">appliquées</span>
          </div>
          <div className="mt-2 text-xs text-foreground-500">
            {critiquePatterns} patterns critiques · {totalOccurrences} occurrences
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-background-100 border border-background-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-foreground-500 uppercase tracking-wider font-body">Autoapprentissage</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <i className="ri-brain-line"></i>
            </span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-foreground-950 font-heading">{knowledgeRules.length}</span>
            <span className="text-sm text-foreground-500 mb-1">règles générées</span>
          </div>
          <div className="mt-2 text-xs text-foreground-500">
            {learningStats.totalPatternsDetected} patterns détectés
          </div>
        </div>
      </div>

      {/* ═══ PATTERNS DÉTECTÉS — TOP 6 ═══ */}
      <div>
        <h2 className="text-lg font-bold text-foreground-950 mb-4 font-heading flex items-center gap-2">
          <i className="ri-radar-line text-accent-500"></i>
          Patterns Réglementaires Détectés
        </h2>
        <div className="grid md:grid-cols-3 gap-3">
          {patterns.slice(0, 6).map(pattern => (
            <div
              key={pattern.id}
              className="p-4 rounded-xl border bg-background-50 hover:bg-background-100 transition-colors"
              style={{ borderColor: `oklch(var(--${pattern.severity === 'critique' ? 'red' : pattern.severity === 'élevé' ? 'amber' : 'foreground'}-200))` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${severityColors[pattern.severity]}`}>
                  {pattern.severity.toUpperCase()}
                </span>
                <span className="text-[10px] text-foreground-400">{pattern.occurrencesFound} occ.</span>
              </div>
              <p className="text-xs font-semibold text-foreground-900 mb-1 font-body">{pattern.description}</p>
              <div className="flex items-center gap-2 text-[10px] text-foreground-400 mt-2">
                <span className="flex items-center gap-1">
                  <i className="ri-price-tag-3-line text-[10px]"></i>
                  {categoryLabels[pattern.category] || pattern.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ SELF-LEARNING ACTIVITY ═══ */}
      <div>
        <h2 className="text-lg font-bold text-foreground-950 mb-4 font-heading flex items-center gap-2">
          <i className="ri-loop-left-line text-primary-500"></i>
          Activité d&apos;Autoapprentissage
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-background-100 border border-background-200">
            <h3 className="text-sm font-bold text-foreground-950 mb-3">Dernières Règles Générées</h3>
            <div className="space-y-2.5">
              {knowledgeRules.slice(0, 4).map(rule => (
                <div key={rule.id} className="flex items-start gap-2 text-xs">
                  <div className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="ri-lightbulb-line text-[10px]"></i>
                  </div>
                  <div>
                    <p className="text-foreground-800 font-medium">{rule.rule}</p>
                    <p className="text-foreground-400 mt-0.5">{rule.domain} · {rule.generationDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-background-100 border border-background-200">
            <h3 className="text-sm font-bold text-foreground-950 mb-3">Prochain Cycle d&apos;Apprentissage</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-foreground-500">Dernier cycle complet</span>
                <span className="text-foreground-800 font-semibold">{new Date(learningStats.lastLearningCycle).toLocaleString('fr-FR')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground-500">Prochain scan programmé</span>
                <span className="text-foreground-800 font-semibold">{new Date(learningStats.nextScheduledScan).toLocaleString('fr-FR')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground-500">Pattern le plus fréquent</span>
                <span className="text-foreground-800 font-semibold text-right max-w-[200px] truncate">{learningStats.mostCommonPattern}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground-500">Auto-fix</span>
                <span className={`font-semibold ${learningStats.autoFixEnabled ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {learningStats.autoFixEnabled ? 'Activé' : 'Désactivé'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ TOP ARTICLES ═══ */}
      <div>
        <h2 className="text-lg font-bold text-foreground-950 mb-4 font-heading flex items-center gap-2">
          <i className="ri-trophy-line text-amber-500"></i>
          Top 6 — Meilleurs Scores Big Four
        </h2>
        <div className="grid md:grid-cols-3 gap-3">
          {articleScores
            .sort((a, b) => b.scoreTotal - a.scoreTotal)
            .slice(0, 6)
            .map((article, i) => (
              <div key={article.articleSlug} className="p-4 rounded-xl bg-background-100 border border-background-200 hover:bg-background-100/80 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-bold text-foreground-400 w-5">{i + 1}.</span>
                    <p className="text-xs font-semibold text-foreground-900 leading-snug line-clamp-2">{article.articleTitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex-1 h-1.5 rounded-full bg-background-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        article.status === 'excellent' ? 'bg-emerald-500' :
                        article.status === 'bon' ? 'bg-primary-500' :
                        article.status === 'a_ameliorer' ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${article.scoreTotal}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs font-bold ${
                    article.status === 'excellent' ? 'text-emerald-600' :
                    article.status === 'bon' ? 'text-primary-600' :
                    article.status === 'a_ameliorer' ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {article.scoreTotal}/100
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}





