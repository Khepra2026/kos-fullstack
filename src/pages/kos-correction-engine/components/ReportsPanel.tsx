interface BeforeAfterItem {
  before: string | number;
  after: string | number;
  delta: string | number;
}

interface FixHistoryItem {
  id: string;
  timestamp: string;
  module: string;
  title: string;
  status: string;
  before: string;
  after: string;
  gain: string;
}

interface ExecReport {
  period: string;
  totalFixesApplied: number;
  totalFixesVerified: number;
  avgTimeToFix: string;
  successRate: string;
  metricsImpact: Array<{ metric: string; evolution: string; trend: string; gainPercent: number }>;
  topGains: Array<{ module: string; description: string; gain: string }>;
  roiEstimate: string;
}

interface ReportsPanelProps {
  beforeAfter: Record<string, BeforeAfterItem>;
  fixHistory: FixHistoryItem[];
  executiveReport: ExecReport;
}

export default function ReportsPanel({ beforeAfter, fixHistory, executiveReport }: ReportsPanelProps) {
  return (
    <div className="space-y-8">
      {/* Before / After */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 font-heading mb-4 flex items-center gap-2">
          <i className="ri-scales-3-line text-accent-500"></i>
          Avant / Après — Impact Global des Corrections
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(beforeAfter).map(([key, data]) => (
            <div key={key} className="bg-background-100 rounded-xl border border-background-200/70 p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider font-body">{key}</h4>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  parseFloat(String(data.delta)) > 0 || String(data.delta).startsWith('+')
                    ? 'bg-emerald-100 text-emerald-700'
                    : String(data.delta).startsWith('-')
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {String(data.delta).startsWith('-') || String(data.delta).startsWith('+') ? data.delta : `+${data.delta}`}
                </span>
              </div>
              <div className="flex items-end gap-3">
                <div>
                  <span className="text-[10px] text-foreground-400 font-body">Avant</span>
                  <p className="text-xl font-bold text-red-500 font-heading">{String(data.before)}</p>
                </div>
                <i className="ri-arrow-right-line text-foreground-300 mb-1"></i>
                <div>
                  <span className="text-[10px] text-foreground-400 font-body">Après</span>
                  <p className="text-xl font-bold text-emerald-600 font-heading">{String(data.after)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Executive Report */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 font-heading mb-4 flex items-center gap-2">
          <i className="ri-file-chart-line text-secondary-500"></i>
          Rapport Exécutif — {executiveReport.period}
        </h3>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-background-100 rounded-xl border border-background-200/70 p-4 text-center">
            <span className="text-2xl font-bold text-emerald-600 font-heading">{executiveReport.totalFixesApplied}</span>
            <p className="text-[10px] text-foreground-400 font-body mt-1">Corrections appliquées</p>
          </div>
          <div className="bg-background-100 rounded-xl border border-background-200/70 p-4 text-center">
            <span className="text-2xl font-bold text-primary-600 font-heading">{executiveReport.totalFixesVerified}</span>
            <p className="text-[10px] text-foreground-400 font-body mt-1">Corrections vérifiées</p>
          </div>
          <div className="bg-background-100 rounded-xl border border-background-200/70 p-4 text-center">
            <span className="text-2xl font-bold text-foreground-950 font-heading">{executiveReport.avgTimeToFix}</span>
            <p className="text-[10px] text-foreground-400 font-body mt-1">Temps moyen / correction</p>
          </div>
          <div className="bg-background-100 rounded-xl border border-background-200/70 p-4 text-center">
            <span className="text-2xl font-bold text-emerald-600 font-heading">{executiveReport.successRate}</span>
            <p className="text-[10px] text-foreground-400 font-body mt-1">Taux de succès</p>
          </div>
        </div>

        {/* Metrics Evolution */}
        <div className="bg-background-100 rounded-xl border border-background-200/70 p-5 mb-6">
          <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider font-body mb-4">Évolution des Métriques</h4>
          <div className="space-y-3">
            {executiveReport.metricsImpact.map((m, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-xs font-medium text-foreground-700 font-body w-36 shrink-0">{m.metric}</span>
                <span className="text-xs text-foreground-500 font-body w-28 shrink-0">{m.evolution}</span>
                <div className="flex-1 bg-background-200 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${Math.min(m.gainPercent * 2, 100)}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold text-emerald-600 font-body w-14 text-right">+{m.gainPercent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Gains */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider font-body mb-3">Top 5 Gains par Module</h4>
          <div className="space-y-2">
            {executiveReport.topGains.map((gain, idx) => (
              <div key={idx} className="bg-background-100 rounded-xl border border-background-200/70 p-4 flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 shrink-0">
                  <span className="text-xs font-bold font-heading">{gain.module}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground-700 font-body">{gain.description}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold font-body mt-1">{gain.gain}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Estimate */}
        <div className="bg-gradient-to-r from-emerald-50 to-primary-50 rounded-xl border border-emerald-200/50 p-5">
          <div className="flex items-center gap-2 mb-2">
            <i className="ri-money-dollar-circle-line text-emerald-600 text-lg"></i>
            <h4 className="text-sm font-semibold text-foreground-950 font-heading">ROI Estimé</h4>
          </div>
          <p className="text-xs text-foreground-600 font-body leading-relaxed">{executiveReport.roiEstimate}</p>
        </div>
      </div>

      {/* Fix History */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 font-heading mb-4 flex items-center gap-2">
          <i className="ri-history-line text-primary-500"></i>
          Historique des Corrections
        </h3>
        <div className="bg-background-100 rounded-xl border border-background-200/70 overflow-hidden">
          <div className="divide-y divide-background-200/50">
            {fixHistory.map((fix, idx) => (
              <div key={idx} className="flex items-center gap-4 px-5 py-3 hover:bg-background-50/50 transition-colors">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  fix.status === 'verified' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}></div>
                <span className="text-[10px] font-mono text-foreground-400 shrink-0 w-16">
                  {new Date(fix.timestamp).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-foreground-100 text-foreground-600 shrink-0 font-body">
                  {fix.module}
                </span>
                <span className="text-xs text-foreground-700 font-body flex-1">{fix.title}</span>
                <span className="text-[10px] text-foreground-500 font-body shrink-0 hidden md:block">{fix.before}</span>
                <i className="ri-arrow-right-line text-foreground-300 hidden md:block shrink-0"></i>
                <span className="text-[10px] text-emerald-600 font-semibold font-body shrink-0 hidden md:block">{fix.after}</span>
                <span className="text-[10px] text-emerald-600 font-semibold font-body shrink-0">{fix.gain}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}