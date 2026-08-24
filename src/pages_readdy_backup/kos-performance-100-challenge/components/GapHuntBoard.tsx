import { useState } from 'react';

interface Subtask {
  id: string;
  label: string;
  done: boolean;
}

interface PerformanceGap {
  id: string;
  category: string;
  metric: string;
  current: number;
  target: number;
  delta: number;
  unit?: string;
  severity: string;
  assignedAgent: string;
  agentAvatar: string;
  rootCause: string;
  mission: string;
  estimatedImpact: string;
  roi: string;
  status: string;
  progress: number;
  eta: string;
  subtasks: Subtask[];
}

const severityColors: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-amber-100 text-amber-700 border-amber-200',
  medium: 'bg-secondary-100 text-secondary-700 border-secondary-200',
};

const statusColors: Record<string, string> = {
  open: 'text-red-600 bg-red-50',
  in_progress: 'text-primary-600 bg-primary-50',
  closed: 'text-emerald-600 bg-emerald-50',
};

const statusLabels: Record<string, string> = {
  open: 'Ouvert',
  in_progress: 'En cours',
  closed: 'Fermé',
};

const categoryLabels: Record<string, string> = {
  'Performance': 'Performance',
  'Core Web Vitals': 'Core Web Vitals',
  'SEO': 'SEO',
  'Accessibilité': 'Accessibilité',
  'Sécurité': 'Sécurité',
  'Infrastructure': 'Infrastructure',
};

export default function GapHuntBoard({
  sprintActive = false,
  liveGaps,
}: {
  sprintActive?: boolean;
  liveGaps?: PerformanceGap[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [expandedGap, setExpandedGap] = useState<string | null>(null);

  const gaps = liveGaps || [];

  const filteredGaps = selectedCategory === 'Tous'
    ? gaps
    : gaps.filter(g => g.category === selectedCategory);

  const categories = ['Tous', ...Array.from(new Set(gaps.map(g => g.category)))];

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-primary-500 text-background-50'
                : 'bg-background-100 text-foreground-600 hover:text-foreground-900 hover:bg-background-200/70'
            }`}
            type="button"
          >
            {cat === 'Tous' ? 'Tous les GAPs' : categoryLabels[cat] || cat}
            {cat !== 'Tous' && (
              <span className="ml-1.5 opacity-70">
                {gaps.filter(g => g.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Gaps Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredGaps.map(gap => {
          const isExpanded = expandedGap === gap.id;
          const subtasksDone = gap.subtasks.filter(s => s.done).length;
          const subtasksTotal = gap.subtasks.length;

          return (
            <div
              key={gap.id}
              className={`bg-background-50 rounded-lg border overflow-hidden transition-all duration-200 ${
                gap.status === 'closed'
                  ? 'border-emerald-300 bg-emerald-50/30'
                  : 'border-background-200/70'
              }`}
            >
              {/* Header */}
              <div
                className="p-5 cursor-pointer"
                onClick={() => setExpandedGap(isExpanded ? null : gap.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border font-body ${severityColors[gap.severity]}`}>
                      {gap.severity.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-foreground-500 font-body">{gap.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold font-body ${
                      sprintActive && gap.status === 'open'
                        ? 'bg-primary-100 text-primary-700 animate-pulse'
                        : statusColors[gap.status] || statusColors.open
                    }`}>
                      {sprintActive && gap.status === 'open' ? 'En cours' : statusLabels[gap.status] || gap.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-foreground-500 font-body">{gap.eta}</span>
                    {isExpanded ? <i className="ri-arrow-up-s-line text-foreground-400 text-sm"></i> : <i className="ri-arrow-down-s-line text-foreground-400 text-sm"></i>}
                  </div>
                </div>

                <h4 className="text-sm font-semibold text-foreground-950 mb-1.5 font-heading">
                  {gap.metric} : {gap.current} → <span className="text-primary-500">{gap.target}</span>
                  {gap.unit ? ` ${gap.unit}` : ''}
                </h4>
                <p className="text-xs text-foreground-600 mb-3 line-clamp-2 font-body">{gap.rootCause}</p>

                {/* Progress Bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        gap.status === 'closed' ? 'bg-emerald-500' : 'bg-primary-500'
                      }`}
                      style={{ width: `${gap.progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-foreground-600 font-body">{gap.progress}%</span>
                </div>

                <div className="flex items-center gap-4 mt-2 text-[10px] text-foreground-400 font-body">
                  <span className="flex items-center gap-1">
                    <i className={`${gap.agentAvatar} text-xs`}></i>
                    {gap.assignedAgent}
                  </span>
                  <span>{subtasksDone}/{subtasksTotal} sous-tâches</span>
                  {gap.status === 'closed' && (
                    <span className="text-emerald-500 font-semibold flex items-center gap-0.5">
                      <i className="ri-check-double-line"></i> FERMÉ
                    </span>
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-background-200/70 px-5 py-4 bg-background-100/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="text-[10px] font-semibold text-foreground-500 uppercase tracking-wider mb-1.5 font-body">Mission</h5>
                      <p className="text-xs text-foreground-700 font-body">{gap.mission}</p>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-semibold text-foreground-500 uppercase tracking-wider mb-1.5 font-body">Impact estimé</h5>
                      <p className="text-xs text-foreground-700 font-body">{gap.estimatedImpact}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <i className="ri-funds-line text-secondary-500 text-xs"></i>
                        <span className="text-[10px] text-secondary-700 font-semibold font-body">ROI: {gap.roi}</span>
                      </div>
                    </div>
                  </div>

                  {/* Subtasks */}
                  <h5 className="text-[10px] font-semibold text-foreground-500 uppercase tracking-wider mb-2 font-body">Sous-tâches</h5>
                  <div className="space-y-1.5">
                    {gap.subtasks.map(st => (
                      <div key={st.id} className="flex items-center gap-2.5 text-xs">
                        <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${st.done ? 'bg-emerald-100 text-emerald-600' : 'bg-background-200/70 text-foreground-400'}`}>
                          {st.done ? <i className="ri-check-line text-[10px]"></i> : <i className="ri-time-line text-[10px]"></i>}
                        </div>
                        <span className={`font-body transition-all duration-300 ${st.done ? 'text-foreground-500 line-through' : 'text-foreground-700'}`}>
                          {st.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}



