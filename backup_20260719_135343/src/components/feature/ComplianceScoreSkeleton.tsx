/**
 * ═══════════════════════════════════════════════════
 * KHEPRA EXPERTS — Compliance Score Skeleton Screens
 * ═══════════════════════════════════════════════════
 * Squelettes HTML/CSS statiques affichés avant le
 * chargement du module de compliance score.
 *
 * CLS garanti à 0.0: dimensions fixes, pas de layout shift.
 */

export function ComplianceScoreResultSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Grade Banner Skeleton */}
      <div className="rounded-2xl border-2 border-background-200 p-6 md:p-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-100 mb-4" style={{ width: '280px', height: '36px' }}>
          <div className="w-full h-3 bg-background-200 rounded animate-shimmer" />
        </div>
        <div className="w-24 h-24 rounded-full bg-background-100 mx-auto mb-4 animate-shimmer" />
        <div className="w-64 h-8 bg-background-100 rounded mx-auto mb-2 animate-shimmer" />
        <div className="w-32 h-16 bg-background-100 rounded mx-auto mb-2 animate-shimmer" />
        <div className="w-96 h-4 bg-background-100 rounded mx-auto animate-shimmer" />
      </div>

      {/* Domain Scores Skeleton */}
      <div className="bg-white rounded-2xl border border-background-200 p-5 md:p-6 mb-8">
        <div className="w-48 h-5 bg-background-100 rounded mb-1 animate-shimmer" />
        <div className="w-32 h-4 bg-background-100 rounded mb-5 animate-shimmer" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-background-100 animate-shimmer" />
                  <div className="w-40 h-4 bg-background-100 rounded animate-shimmer" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-5 rounded-full bg-background-100 animate-shimmer" />
                  <div className="w-10 h-4 bg-background-100 rounded animate-shimmer" />
                </div>
              </div>
              <div className="h-2 rounded-full bg-background-100 overflow-hidden">
                <div className="h-full rounded-full bg-background-200 animate-shimmer" style={{ width: `${30 + i * 10}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-background-200 p-5">
          <div className="w-20 h-4 bg-background-100 rounded mb-3 animate-shimmer" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full h-3 bg-background-100 rounded animate-shimmer" />
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-background-200 p-5">
          <div className="w-32 h-4 bg-background-100 rounded mb-3 animate-shimmer" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full h-3 bg-background-100 rounded animate-shimmer" />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Skeleton */}
      <div className="bg-white rounded-2xl border border-background-200 p-6 md:p-8 mb-8">
        <div className="w-64 h-6 bg-background-100 rounded mb-2 animate-shimmer" />
        <div className="w-96 h-4 bg-background-100 rounded mb-6 animate-shimmer" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-12 bg-background-100 rounded-lg animate-shimmer" />
          <div className="h-12 bg-background-100 rounded-lg animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function ComplianceScoreQuizSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="w-24 h-4 bg-background-100 rounded animate-shimmer" />
          <div className="w-16 h-4 bg-background-100 rounded animate-shimmer" />
        </div>
        <div className="h-2 rounded-full bg-background-100 animate-shimmer" />
      </div>

      {/* Domain Tabs */}
      <div className="flex items-center gap-1.5 mb-8 overflow-x-auto pb-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="whitespace-nowrap px-3 py-1.5 rounded-full bg-background-100" style={{ width: '100px', height: '28px' }}>
            <div className="w-full h-3 bg-background-200 rounded animate-shimmer" />
          </div>
        ))}
      </div>

      {/* Questions */}
      <div className="bg-white rounded-2xl border border-background-200 p-5 md:p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-background-100 animate-shimmer" />
          <div>
            <div className="w-48 h-5 bg-background-100 rounded mb-1 animate-shimmer" />
            <div className="w-80 h-3 bg-background-100 rounded animate-shimmer" />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-background-200 rounded-xl p-4">
              <div className="flex items-start gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-background-100 animate-shimmer flex-shrink-0" />
                <div className="flex-1">
                  <div className="w-full h-4 bg-background-100 rounded mb-1 animate-shimmer" />
                  <div className="w-3/4 h-3 bg-background-100 rounded animate-shimmer" />
                </div>
              </div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-16 bg-background-100 rounded-lg animate-shimmer" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between">
        <div className="w-24 h-10 rounded-full bg-background-100 animate-shimmer" />
        <div className="w-32 h-10 rounded-full bg-background-100 animate-shimmer" />
      </div>
    </div>
  );
}



