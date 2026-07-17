import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MonitoringLog } from '@/pages/monitoring/hooks/useMonitoringData';

interface PerformanceChartProps {
  logs: MonitoringLog[];
}

export default function PerformanceChart({ logs }: PerformanceChartProps) {
  const { t } = useTranslation();

  const buckets = useMemo(() => {
    const perfLogs = logs.filter((l) => l.type === 'performance' && l.duration_ms);
    if (perfLogs.length === 0) return [];

    const sorted = perfLogs.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    const now = Date.now();
    const hourMs = 60 * 60 * 1000;

    const data: { label: string; avg: number; max: number; count: number }[] = [];
    const totalHours = 24;

    for (let i = 0; i < totalHours; i++) {
      const start = now - (totalHours - i) * hourMs;
      const end = now - (totalHours - i - 1) * hourMs;
      const entries = sorted.filter((l) => {
        const t = new Date(l.created_at).getTime();
        return t >= start && t < end;
      });
      const avg = entries.length > 0
        ? Math.round(entries.reduce((s, e) => s + (e.duration_ms || 0), 0) / entries.length)
        : 0;
      const max = entries.length > 0
        ? Math.max(...entries.map((e) => e.duration_ms || 0))
        : 0;
      data.push({
        label: `${i}h`,
        avg,
        max,
        count: entries.length,
      });
    }

    return data;
  }, [logs]);

  if (buckets.length === 0 || buckets.every((b) => b.count === 0)) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
            <i className="ri-timer-line text-teal-600 text-lg"></i>
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              {t('monitoring.performance.title') || 'Temps de réponse API'}
            </h3>
            <p className="text-sm text-slate-500">
              {t('monitoring.performance.empty') || 'Aucune donnée de performance sur cette période'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const maxVal = Math.max(...buckets.map((b) => b.max), 1);
  const chartHeight = 160;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="flex items-center gap-3 p-5 border-b border-slate-100">
        <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
          <i className="ri-timer-line text-teal-600 text-lg"></i>
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            {t('monitoring.performance.title') || 'Temps de réponse API'}
          </h3>
          <p className="text-sm text-slate-500">
            {t('monitoring.performance.subtitle') || 'Moyenne (barre) et maximum (point) par tranche horaire'}
          </p>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-end gap-1" style={{ height: chartHeight }}>
          {buckets.map((bucket) => {
            const avgHeight = (bucket.avg / maxVal) * (chartHeight - 20);
            const maxHeight = (bucket.max / maxVal) * (chartHeight - 20);
            return (
              <div key={bucket.label} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div className="w-full flex flex-col items-center justify-end" style={{ height: chartHeight - 20 }}>
                  <div
                    className="w-full rounded-t-sm bg-teal-200 transition-all"
                    style={{ height: `${Math.max(avgHeight, 2)}px` }}
                  ></div>
                </div>
                <div className="absolute bottom-6 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap z-10 pointer-events-none">
                  {t('monitoring.performance.tooltipAvg') || 'Moy'} : {bucket.avg}ms
                  <br />
                  {t('monitoring.performance.tooltipMax') || 'Max'} : {bucket.max}ms
                  <br />
                  {t('monitoring.performance.tooltipCount') || 'Requêtes'} : {bucket.count}
                </div>
                <span className="text-[10px] text-slate-400">{bucket.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}