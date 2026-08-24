import { coreWebVitalsTrend as mockCWV, coreWebVitalsByPage as mockByPage, cwvDistribution as mockDist } from '@/mocks/performanceSEOCommand';

interface CWVPoint {
  date: string;
  lcp: number;
  fcp: number;
  cls: number;
  tbt: number;
  inp: number;
}

interface CWVPage {
  page: string;
  url: string;
  lcpMobile: number;
  lcpDesktop: number;
  clsMobile: number;
  clsDesktop: number;
  tbtMobile: number;
  tbtDesktop: number;
  inpMobile: number;
  inpDesktop: number;
  status: string;
}

interface CWVDist {
  good: number;
  needsImprovement: number;
  poor: number;
  totalPages: number;
  passRate: number;
  targetPassRate: number;
  lcpGood: number;
  lcpImprovement: number;
  lcpPoor: number;
  clsGood: number;
  clsImprovement: number;
  clsPoor: number;
  tbtGood: number;
  tbtImprovement: number;
  tbtPoor: number;
  inpGood: number;
  inpImprovement: number;
  inpPoor: number;
}

interface CoreWebVitalsTabProps {
  cwvTrend?: CWVPoint[];
  byPage?: CWVPage[];
  distribution?: CWVDist;
  isLive?: boolean;
}

function statusBadge(status: string) {
  if (status === 'good') return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Good', icon: 'ri-check-line' };
  if (status === 'needs-improvement') return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'À améliorer', icon: 'ri-alert-line' };
  return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'Poor', icon: 'ri-close-line' };
}

function scoreCell(value: number, threshold: number, unit: string) {
  const good = value <= threshold;
  const warn = value <= threshold * 1.4;
  const color = good ? 'text-emerald-600' : warn ? 'text-amber-600' : 'text-red-600';
  return (
    <span className={`font-mono text-xs ${color}`}>
      {value}{unit}
    </span>
  );
}

export default function CoreWebVitalsTab({ cwvTrend: propCWV, byPage: propByPage, distribution: propDist, isLive }: CoreWebVitalsTabProps) {
  const cwvData = propCWV || mockCWV;
  const byPage = propByPage || mockByPage;
  const dist = propDist || mockDist;
  const latest = cwvData[cwvData.length - 1];
  const thresholds = { lcp: 2.5, fcp: 1.8, cls: 0.1, tbt: 150, inp: 200 };

  const metrics = [
    { key: 'lcp', label: 'LCP', fullLabel: 'Largest Contentful Paint', value: latest.lcp, unit: 's', threshold: thresholds.lcp, icon: 'ri-image-line', color: 'primary' },
    { key: 'inp', label: 'INP', fullLabel: 'Interaction to Next Paint', value: latest.inp, unit: 'ms', threshold: thresholds.inp, icon: 'ri-cursor-line', color: 'accent' },
    { key: 'cls', label: 'CLS', fullLabel: 'Cumulative Layout Shift', value: latest.cls, unit: '', threshold: thresholds.cls, icon: 'ri-layout-line', color: 'secondary' },
    { key: 'fcp', label: 'FCP', fullLabel: 'First Contentful Paint', value: latest.fcp, unit: 's', threshold: thresholds.fcp, icon: 'ri-time-line', color: 'primary' },
    { key: 'tbt', label: 'TBT', fullLabel: 'Total Blocking Time', value: latest.tbt, unit: 'ms', threshold: thresholds.tbt, icon: 'ri-timer-line', color: 'accent' },
  ] as const;

  const distMetrics = [
    { key: 'LCP', good: dist.lcpGood, imp: dist.lcpImprovement, poor: dist.lcpPoor, total: dist.totalPages, threshold: '2.5s' },
    { key: 'INP', good: dist.inpGood, imp: dist.inpImprovement, poor: dist.inpPoor, total: dist.totalPages, threshold: '200ms' },
    { key: 'CLS', good: dist.clsGood, imp: dist.clsImprovement, poor: dist.clsPoor, total: dist.totalPages, threshold: '0.1' },
    { key: 'TBT', good: dist.tbtGood, imp: dist.tbtImprovement, poor: dist.tbtPoor, total: dist.totalPages, threshold: '150ms' },
  ];

  return (
    <div className="space-y-8">
      {/* Live Data Badge */}
      {isLive !== undefined && (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${isLive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
          <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
          {isLive ? 'Données Live — Supabase' : 'Données Mock — Démo'}
        </div>
      )}

      {/* Pass Rate Banner */}
      <div className={`rounded-xl border p-5 ${dist.passRate >= 90 ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${dist.passRate >= 90 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
            <i className={`${dist.passRate >= 90 ? 'ri-check-double-line' : 'ri-alert-line'} text-2xl`}></i>
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold font-heading ${dist.passRate >= 90 ? 'text-emerald-900' : 'text-amber-900'}`}>
              Core Web Vitals — Pass Rate : {dist.passRate}%
            </h3>
            <p className={`text-sm font-body ${dist.passRate >= 90 ? 'text-emerald-700' : 'text-amber-700'}`}>
              {dist.good} pages Good · {dist.needsImprovement} à améliorer · {dist.poor} Poor · Cible : {dist.targetPassRate}%
            </p>
          </div>
          {/* Progress bar */}
          <div className="w-32">
            <div className="flex justify-between text-[10px] text-foreground-500 mb-1 font-body">
              <span>{dist.passRate}%</span>
              <span>{dist.targetPassRate}%</span>
            </div>
            <div className="h-2 bg-background-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${dist.passRate >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                style={{ width: `${Math.min((dist.passRate / dist.targetPassRate) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {metrics.map(m => {
          const isGood = m.key === 'cls' ? m.value <= m.threshold : m.value <= m.threshold;
          return (
            <div key={m.key} className={`rounded-xl border p-4 ${isGood ? 'border-emerald-200 bg-emerald-50/50' : 'border-amber-200 bg-amber-50/50'}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${isGood ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  <i className={`${m.icon} text-sm`}></i>
                </div>
                <span className={`text-[10px] font-medium uppercase tracking-wider font-body ${isGood ? 'text-emerald-700' : 'text-amber-700'}`}>{m.key}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-bold font-heading ${isGood ? 'text-emerald-700' : 'text-amber-700'}`}>{m.value}</span>
                <span className={`text-sm font-body ${isGood ? 'text-emerald-600' : 'text-amber-600'}`}>{m.unit}</span>
              </div>
              <p className="text-[10px] text-foreground-500 mt-1 font-body">{m.fullLabel}</p>
              <div className="flex items-center gap-1 mt-2">
                <span className={`text-[10px] font-semibold font-body ${isGood ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {isGood ? '✓' : '⚠'} Seuil {m.threshold}{m.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Distribution Chart */}
      <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
        <h3 className="text-sm font-semibold text-foreground-950 mb-4 font-heading">Distribution Core Web Vitals — 12 pages auditées</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {distMetrics.map(dm => {
            const goodPct = Math.round((dm.good / dm.total) * 100);
            const impPct = Math.round((dm.imp / dm.total) * 100);
            const poorPct = Math.round((dm.poor / dm.total) * 100);
            return (
              <div key={dm.key} className="bg-background-50 rounded-lg border border-background-200/70 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-foreground-700 font-body">{dm.key}</span>
                  <span className="text-[10px] text-foreground-500 font-body">Seuil {dm.threshold}</span>
                </div>
                <div className="h-3 flex rounded-full overflow-hidden">
                  {goodPct > 0 && <div className="bg-emerald-500 h-full" style={{ width: `${goodPct}%` }} title={`Good: ${dm.good}`}></div>}
                  {impPct > 0 && <div className="bg-amber-500 h-full" style={{ width: `${impPct}%` }} title={`Needs Improvement: ${dm.imp}`}></div>}
                  {poorPct > 0 && <div className="bg-red-500 h-full" style={{ width: `${poorPct}%` }} title={`Poor: ${dm.poor}`}></div>}
                </div>
                <div className="flex items-center gap-3 mt-2 text-[10px]">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-foreground-600 font-body">{dm.good} Good</span>
                  </span>
                  {dm.imp > 0 && (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span className="text-foreground-600 font-body">{dm.imp}</span>
                    </span>
                  )}
                  {dm.poor > 0 && (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className="text-foreground-600 font-body">{dm.poor}</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Per-Page Breakdown */}
      <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
        <h3 className="text-sm font-semibold text-foreground-950 mb-4 font-heading">Détail par Page — Mobile vs Desktop</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-background-200">
                <th className="text-left py-2.5 px-3 font-semibold text-foreground-600 font-body">Page</th>
                <th className="text-center py-2.5 px-2 font-semibold text-foreground-600 font-body">LCP M</th>
                <th className="text-center py-2.5 px-2 font-semibold text-foreground-600 font-body">LCP D</th>
                <th className="text-center py-2.5 px-2 font-semibold text-foreground-600 font-body">CLS M</th>
                <th className="text-center py-2.5 px-2 font-semibold text-foreground-600 font-body">TBT M</th>
                <th className="text-center py-2.5 px-2 font-semibold text-foreground-600 font-body">INP M</th>
                <th className="text-center py-2.5 px-3 font-semibold text-foreground-600 font-body">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-background-100">
              {byPage.map((row, i) => {
                const badge = statusBadge(row.status);
                return (
                  <tr key={i} className="hover:bg-background-100 transition-colors">
                    <td className="py-2.5 px-3">
                      <span className="font-medium text-foreground-900 font-body">{row.page}</span>
                      <span className="text-[10px] text-foreground-400 ml-2 font-mono">{row.url}</span>
                    </td>
                    <td className="py-2.5 px-2 text-center">{scoreCell(row.lcpMobile, 2.5, 's')}</td>
                    <td className="py-2.5 px-2 text-center">{scoreCell(row.lcpDesktop, 2.5, 's')}</td>
                    <td className="py-2.5 px-2 text-center">{scoreCell(row.clsMobile, 0.1, '')}</td>
                    <td className="py-2.5 px-2 text-center">{scoreCell(row.tbtMobile, 150, 'ms')}</td>
                    <td className="py-2.5 px-2 text-center">{scoreCell(row.inpMobile, 200, 'ms')}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
                        <i className={`${badge.icon} text-[9px]`}></i>
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-2 mt-3 text-[10px] text-foreground-500 font-body">
          <span>M = Mobile</span>
          <span className="w-1 h-1 rounded-full bg-foreground-400"></span>
          <span>D = Desktop</span>
          <span className="w-1 h-1 rounded-full bg-foreground-400"></span>
          <span>Seuils : LCP 2.5s · CLS 0.1 · TBT 150ms · INP 200ms</span>
        </div>
      </div>

      {/* Trend Table */}
      <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
        <h3 className="text-sm font-semibold text-foreground-950 mb-4 font-heading">Évolution Core Web Vitals (9 semaines)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-background-200">
                <th className="text-left py-2 px-3 font-semibold text-foreground-600 font-body">Date</th>
                <th className="text-center py-2 px-3 font-semibold text-foreground-600 font-body">LCP (s)</th>
                <th className="text-center py-2 px-3 font-semibold text-foreground-600 font-body">FCP (s)</th>
                <th className="text-center py-2 px-3 font-semibold text-foreground-600 font-body">CLS</th>
                <th className="text-center py-2 px-3 font-semibold text-foreground-600 font-body">TBT (ms)</th>
                <th className="text-center py-2 px-3 font-semibold text-foreground-600 font-body">INP (ms)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-background-100">
              {cwvData.map((row, i) => {
                const isLatest = i === cwvData.length - 1;
                return (
                  <tr key={i} className={isLatest ? 'bg-primary-50 font-semibold' : 'hover:bg-background-100'}>
                    <td className="py-2.5 px-3 font-medium text-foreground-900 font-body">
                      {row.date}
                      {isLatest && <span className="ml-2 px-1.5 py-0.5 rounded-full text-[9px] bg-primary-100 text-primary-700 font-semibold">Actuel</span>}
                    </td>
                    <td className={`py-2.5 px-3 text-center font-mono ${row.lcp > 2.5 ? 'text-red-600 font-semibold' : 'text-emerald-600'}`}>{row.lcp}</td>
                    <td className={`py-2.5 px-3 text-center font-mono ${row.fcp > 1.8 ? 'text-red-600 font-semibold' : 'text-emerald-600'}`}>{row.fcp}</td>
                    <td className={`py-2.5 px-3 text-center font-mono ${row.cls > 0.1 ? 'text-red-600 font-semibold' : 'text-emerald-600'}`}>{row.cls}</td>
                    <td className={`py-2.5 px-3 text-center font-mono ${row.tbt > 150 ? 'text-red-600 font-semibold' : 'text-emerald-600'}`}>{row.tbt}</td>
                    <td className={`py-2.5 px-3 text-center font-mono ${row.inp > 200 ? 'text-red-600 font-semibold' : 'text-emerald-600'}`}>{row.inp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Threshold Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {metrics.map(m => {
          const pct = m.key === 'cls' ? (m.value / (m.threshold * 2)) * 100 : (m.value / (m.threshold * 1.5)) * 100;
          const isGood = m.key === 'cls' ? m.value <= m.threshold : m.value <= m.threshold;
          return (
            <div key={m.key} className={`rounded-xl border p-3 ${isGood ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
              <span className={`text-[10px] font-medium font-body uppercase ${isGood ? 'text-emerald-700' : 'text-amber-700'}`}>{m.key}</span>
              <div className="h-2 bg-background-200 rounded-full overflow-hidden mt-2 mb-1">
                <div className={`h-full rounded-full ${isGood ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${Math.min(pct, 100)}%` }}></div>
              </div>
              <div className="flex justify-between text-[9px] font-body">
                <span className={isGood ? 'text-emerald-600' : 'text-amber-600'}>0</span>
                <span className={isGood ? 'text-emerald-600' : 'text-amber-600'}>Seuil {m.threshold}{m.unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}





