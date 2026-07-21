import type { TimelineEvent, ChallengeManifest, PerformanceGap } from '@/hooks/usePerformance100Challenge';
import { challengeTimeline as mockTimeline, challengeManifest as mockManifest } from '@/mocks/performance100Challenge';

interface PerformanceGapWithStatus {
  id: string;
  category: string;
  status: string;
  severity: string;
  progress: number;
}

const statusStyles: Record<string, string> = {
  target: 'border-primary-500 bg-primary-50',
  milestone: 'border-accent-500 bg-accent-50',
  current: 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-100',
};

const dotStyles: Record<string, string> = {
  target: 'bg-primary-500 ring-primary-100',
  milestone: 'bg-accent-500 ring-accent-100',
  current: 'bg-emerald-500 ring-emerald-200 animate-pulse',
};

interface ChallengeTimelineProps {
  sprintActive?: boolean;
  liveGaps?: PerformanceGap[];
  manifest?: ChallengeManifest;
  timeline?: TimelineEvent[];
}

export default function ChallengeTimeline({
  sprintActive = false,
  liveGaps,
  manifest,
  timeline,
}: ChallengeTimelineProps) {
  const gaps = liveGaps || [];
  const challengeManifestData = manifest || mockManifest;
  const timelineEvents = timeline || mockTimeline;

  const gapsByCategory = gaps.reduce<Record<string, PerformanceGap[]>>((acc, gap) => {
    if (!acc[gap.category]) acc[gap.category] = [];
    acc[gap.category].push(gap);
    return acc;
  }, {});

  const criticalCount = gaps.filter(g => g.severity === 'critical').length;
  const highCount = gaps.filter(g => g.severity === 'high').length;
  const mediumCount = gaps.filter(g => g.severity === 'medium').length;
  const closedCount = gaps.filter(g => g.status === 'closed').length;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-background-50 rounded-lg border border-background-200/70 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-100 text-red-700">
              <i className="ri-error-warning-line text-lg"></i>
            </div>
            <div>
              <div className="text-xl font-bold text-red-600 font-heading">{criticalCount}</div>
              <div className="text-[10px] text-foreground-500 font-body">GAPs Critiques</div>
            </div>
          </div>
          <p className="text-[11px] text-foreground-500 font-body">Impact direct sur le score global. Fermeture prioritaire requise.</p>
        </div>

        <div className="bg-background-50 rounded-lg border border-background-200/70 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <i className="ri-alert-line text-lg"></i>
            </div>
            <div>
              <div className="text-xl font-bold text-amber-600 font-heading">{highCount}</div>
              <div className="text-[10px] text-foreground-500 font-body">GAPs Élevés</div>
            </div>
          </div>
          <p className="text-[11px] text-foreground-500 font-body">Améliorations significatives. Fermeture en parallèle des critiques.</p>
        </div>

        <div className="bg-background-50 rounded-lg border border-background-200/70 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700">
              <i className="ri-information-line text-lg"></i>
            </div>
            <div>
              <div className="text-xl font-bold text-secondary-600 font-heading">{mediumCount}</div>
              <div className="text-[10px] text-foreground-500 font-body">GAPs Moyens</div>
            </div>
          </div>
          <p className="text-[11px] text-foreground-500 font-body">Optimisations de finition. Traitées quand les critiques sont fermées.</p>
        </div>

        <div className={`bg-background-50 rounded-lg border p-5 ${closedCount >= challengeManifestData.totalGaps ? 'border-emerald-300 bg-emerald-50/30' : 'border-background-200/70'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${closedCount >= challengeManifestData.totalGaps ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-100 text-emerald-700'}`}>
              <i className={`${closedCount >= challengeManifestData.totalGaps ? 'ri-trophy-line' : 'ri-timer-line'} text-lg`}></i>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-600 font-heading">{closedCount}<span className="text-sm text-emerald-400">/{challengeManifestData.totalGaps}</span></div>
              <div className="text-[10px] text-foreground-500 font-body">GAPs Fermés</div>
            </div>
          </div>
          <p className="text-[11px] text-foreground-500 font-body">
            {closedCount >= challengeManifestData.totalGaps
              ? 'TOUS LES GAPS SONT FERMÉS ! Certification en cours.'
              : `${challengeManifestData.totalGaps - closedCount} GAPs restants. Sprint final intensif.`}
          </p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
        <h3 className="text-sm font-semibold text-foreground-950 mb-4 font-heading">RÉPARTITION PAR CATÉGORIE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(gapsByCategory).map(([category, catGaps]) => {
            const closed = catGaps.filter(g => g.status === 'closed').length;
            const inProgress = catGaps.filter(g => g.status === 'in_progress').length;
            const open = catGaps.filter(g => g.status === 'open').length;
            const avgProgress = Math.round(catGaps.reduce((s, g) => s + g.progress, 0) / catGaps.length);

            return (
              <div key={category} className={`p-4 rounded-md ${closed === catGaps.length ? 'bg-emerald-50/70 border border-emerald-200' : 'bg-background-100/70'}`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-foreground-950 font-heading">{category}</h4>
                  <span className="text-[10px] text-foreground-500 font-body">{catGaps.length} GAPs</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${closed === catGaps.length ? 'bg-emerald-500' : 'bg-primary-500'}`} style={{ width: `${avgProgress}%` }} />
                  </div>
                  <span className="text-[10px] font-semibold text-foreground-600 font-body">{avgProgress}%</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-foreground-400 font-body">
                  {open > 0 && <span className="text-red-500">{open} ouverts</span>}
                  {inProgress > 0 && <span className="text-primary-500">{inProgress} en cours</span>}
                  {closed > 0 && <span className="text-emerald-500">{closed} fermés</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
        <h3 className="text-sm font-semibold text-foreground-950 mb-6 font-heading">CHALLENGE TIMELINE — 14 JOURS VERS 100%</h3>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-background-200/70" />

          <div className="space-y-6">
            {sprintActive && (
              <div className="relative pl-12">
                <div className="absolute left-3.5 top-1 w-4 h-4 rounded-full border-2 ring-4 bg-emerald-500 border-emerald-500 ring-emerald-200 animate-pulse" />
                <div className="p-4 rounded-lg border border-emerald-500 bg-emerald-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-emerald-800 font-heading">MAINTENANT</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white font-body animate-pulse">
                      EN COURS
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-emerald-800 font-heading">SPRINT LANCÉ — Automatisation Active</h4>
                  <p className="text-xs text-emerald-600 mt-1 font-body">
                    Les 12 agents exécutent leurs missions automatiquement. {closedCount}/{challengeManifestData.totalGaps} GAPs fermés.
                    KOS Automation Engine en contrôle.
                  </p>
                </div>
              </div>
            )}
            {timelineEvents.map((event, idx) => (
              <div key={idx} className="relative pl-12">
                <div className={`absolute left-3.5 top-1 w-4 h-4 rounded-full border-2 ring-4 ${dotStyles[event.status]}`} />
                <div className={`p-4 rounded-lg border ${statusStyles[event.status]}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-foreground-950 font-heading">{event.day}</span>
                    {event.status === 'current' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white font-body animate-pulse">
                        EN COURS
                      </span>
                    )}
                    {event.status === 'target' && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white font-body ${
                        closedCount >= challengeManifestData.totalGaps ? 'bg-emerald-500 animate-pulse' : 'bg-primary-500'
                      }`}>
                        {closedCount >= challengeManifestData.totalGaps ? 'IMMINENT !' : 'OBJECTIF FINAL'}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-foreground-950 font-heading">{event.target}</h4>
                  <p className="text-xs text-foreground-500 mt-1 font-body">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className={`rounded-lg p-8 text-center ${closedCount >= challengeManifestData.totalGaps ? 'bg-emerald-500 text-white' : 'bg-primary-500 text-background-50'}`}>
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-background-50/20">
          <i className={`${closedCount >= challengeManifestData.totalGaps ? 'ri-trophy-line' : 'ri-flag-2-line'} text-3xl`}></i>
        </div>
        <h3 className="text-xl font-bold mb-2 font-heading">
          {closedCount >= challengeManifestData.totalGaps
            ? 'CERTIFICATION AAAA IMMINENTE !'
            : 'LA LIGNE D\'ARRIVÉE EST PROCHE'}
        </h3>
        <p className="text-sm opacity-90 max-w-lg mx-auto font-body">
          {closedCount >= challengeManifestData.totalGaps
            ? 'Les 12 agents KOS ont accompli leur mission. Le premier cabinet africain certifié 100% Big Four Supreme. Rapport final en cours de validation.'
            : `Chaque heure compte. Les 12 agents KOS sont en mission 24/7. Le premier cabinet africain certifié 100% Big Four Supreme.
          Deadline : ${challengeManifestData.deadline}.`}
        </p>
      </div>
    </div>
  );
}





