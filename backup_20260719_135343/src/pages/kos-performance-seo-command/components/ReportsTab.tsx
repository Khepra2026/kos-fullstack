import { executiveReport as mockReport } from '@/mocks/performanceSEOCommand';

interface ReportData {
  period: string;
  lighthouseMobile: { current: number; previous: number; delta: number };
  lighthouseDesktop: { current: number; previous: number; delta: number };
  lcpMobile: { current: string; previous: string; delta: string };
  cls: { current: string; previous: string; delta: string };
  tbt: { current: string; previous: string; delta: string };
  accessibility: { current: number; previous: number; delta: number };
  seoScore: { current: number; previous: number; delta: number };
  securityGrade: { current: string; previous: string; delta: string };
  totalPageWeightMB: { current: number; previous: number; delta: string };
  topRisks: string[];
  topOpportunities: string[];
  criticalPriorities: { action: string; agent: string; eta: string; roi: string }[];
  estimatedRoi: string;
}

interface ReportsTabProps {
  report?: ReportData;
  isLive?: boolean;
}

export default function ReportsTab({ report: propReport, isLive }: ReportsTabProps) {
  const executiveReport = propReport || mockReport;

  return (
    <div className="space-y-8">
      {/* Live Data Badge */}
      {isLive !== undefined && (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${isLive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
          <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
          {isLive ? 'Données Live — Supabase' : 'Données Mock — Démo'}
        </div>
      )}

      {/* Header */}
      <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                <i className="ri-file-chart-line text-sm"></i>
              </div>
              <h3 className="text-sm font-semibold text-foreground-950 font-heading">Rapport Exécutif Hebdomadaire</h3>
            </div>
            <p className="text-xs text-foreground-500 font-body ml-10">Période : {executiveReport.period} · Généré automatiquement chaque lundi 08:00 GMT</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 font-body">AAA — Big Four Certified</span>
        </div>

        {/* Score Evolution */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <MetricDelta label="Lighthouse Mobile" current={executiveReport.lighthouseMobile.current} previous={executiveReport.lighthouseMobile.previous} delta={executiveReport.lighthouseMobile.delta} />
          <MetricDelta label="Lighthouse Desktop" current={executiveReport.lighthouseDesktop.current} previous={executiveReport.lighthouseDesktop.previous} delta={executiveReport.lighthouseDesktop.delta} />
          <MetricDelta label="LCP Mobile" current={executiveReport.lcpMobile.current} previous={executiveReport.lcpMobile.previous} delta={executiveReport.lcpMobile.delta} unit="" />
          <MetricDelta label="TBT" current={executiveReport.tbt.current} previous={executiveReport.tbt.previous} delta={executiveReport.tbt.delta} unit="" />
          <MetricDelta label="CLS" current={executiveReport.cls.current} previous={executiveReport.cls.previous} delta={executiveReport.cls.delta} unit="" />
          <MetricDelta label="Accessibilité" current={executiveReport.accessibility.current} previous={executiveReport.accessibility.previous} delta={executiveReport.accessibility.delta} />
          <MetricDelta label="SEO Score" current={executiveReport.seoScore.current} previous={executiveReport.seoScore.previous} delta={executiveReport.seoScore.delta} />
          <MetricDelta label="Poids total" current={`${executiveReport.totalPageWeightMB.current} Mo`} previous={`${executiveReport.totalPageWeightMB.previous} Mo`} delta={executiveReport.totalPageWeightMB.delta} unit="" />
        </div>

        {/* Risks */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-3 font-body">Risques</h4>
          <div className="space-y-2">
            {executiveReport.topRisks.map((risk, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-foreground-700 font-body">
                <i className="ri-error-warning-line text-red-500 text-xs shrink-0"></i>
                <span>{risk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-3 font-body">Opportunités</h4>
          <div className="space-y-2">
            {executiveReport.topOpportunities.map((opp, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-foreground-700 font-body">
                <i className="ri-lightbulb-line text-emerald-500 text-xs shrink-0"></i>
                <span>{opp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Priorities */}
        <div>
          <h4 className="text-xs font-semibold text-foreground-800 uppercase tracking-wider mb-3 font-body">Priorités Critiques</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-background-200">
                  <th className="text-left py-2 px-3 font-semibold text-foreground-600 font-body">Action</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground-600 font-body">Agent</th>
                  <th className="text-center py-2 px-3 font-semibold text-foreground-600 font-body">ETA</th>
                  <th className="text-right py-2 px-3 font-semibold text-foreground-600 font-body">ROI Estimé</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-background-100">
                {executiveReport.criticalPriorities.map((p, i) => (
                  <tr key={i} className="hover:bg-background-100">
                    <td className="py-2.5 px-3 text-foreground-900 font-body">{p.action}</td>
                    <td className="py-2.5 px-3 text-foreground-600 font-body">{p.agent}</td>
                    <td className="py-2.5 px-3 text-center text-foreground-600 font-mono">{p.eta}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-600 font-semibold font-body">{p.roi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ROI Summary */}
        <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <div className="flex items-center gap-2">
            <i className="ri-funds-line text-emerald-600 text-lg"></i>
            <div>
              <h4 className="text-sm font-semibold text-emerald-900 font-heading">ROI Estimé</h4>
              <p className="text-sm text-emerald-700 font-body">{executiveReport.estimatedRoi}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricDelta({ label, current, previous, delta, unit }: { label: string; current: number | string; previous: number | string; delta: number | string; unit?: string }) {
  const isPositive = typeof delta === 'number' ? delta >= 0 : !String(delta).startsWith('-');
  const isGood = label.includes('LCP') || label.includes('TBT') || label.includes('CLS') || label.includes('Poids') ? !isPositive : isPositive;
  return (
    <div className="bg-background-100 rounded-xl border border-background-200/70 p-3">
      <div className="text-[10px] font-medium text-foreground-500 font-body uppercase mb-1">{label}</div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-lg font-bold text-foreground-950 font-heading">{current}</span>
        <span className={`text-[10px] font-semibold font-body ${isGood ? 'text-emerald-600' : 'text-red-600'}`}>
          {typeof delta === 'number' && delta >= 0 ? '+' : ''}{delta}
        </span>
      </div>
      <div className="text-[9px] text-foreground-400 font-body">Précédent : {previous}</div>
    </div>
  );
}



