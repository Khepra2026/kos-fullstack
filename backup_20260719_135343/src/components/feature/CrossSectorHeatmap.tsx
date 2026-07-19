import { useMemo } from 'react';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

export interface CrossSectorHeatmapSector {
  id: string;
  name: string;
  icon: string;
  color: string;
  score: number;
  breakdown: { label: string; val: number }[];
}

export interface CrossSectorHeatmapDimension {
  key: string;
  label: string;
  icon: string;
}

interface CrossSectorHeatmapProps {
  sectors: CrossSectorHeatmapSector[];
  dimensions: CrossSectorHeatmapDimension[];
  quarter?: number;
  title?: string;
  subtitle?: string;
  maxWidth?: string;
  variant?: 'default' | 'compact';
}

export function CrossSectorHeatmap({
  sectors,
  dimensions,
  quarter = 1,
  title = 'Heatmap — Forces & Faiblesses par Secteur',
  subtitle = 'Lecture : plus la couleur est intense, plus la performance est élevée sur cette dimension.',
  maxWidth = 'max-w-5xl',
  variant = 'default',
}: CrossSectorHeatmapProps) {
  const quarterLabel = ['T1 2026', 'T2 2026', 'T3 2026', 'T4 2026'][quarter] || 'T2 2026';

  const sectorsWithQuarter = useMemo(() => {
    if (quarter === 1) return sectors;
    const quarterlyFactors = [1, 1, 1.03, 1.06];
    const factor = quarterlyFactors[quarter] || 1;
    return sectors.map(s => ({
      ...s,
      score: Math.min(Math.round(s.score * factor), 100),
      breakdown: s.breakdown.map(b => ({
        ...b,
        val: Math.min(Math.round(b.val * factor), 100),
      })),
    }));
  }, [sectors, quarter]);

  const heatCellStyle = (val: number) => {
    if (val >= 80) return { bg: `rgba(5,150,105,${(val / 100) * 0.35})`, text: '#059669' };
    if (val >= 60) return { bg: `rgba(217,119,6,${(val / 100) * 0.35})`, text: '#d97706' };
    return { bg: `rgba(220,38,38,${(val / 100) * 0.35})`, text: '#dc2626' };
  };

  if (variant === 'compact') {
    return (
      <div className="bg-background-50 border border-background-200/70 rounded-lg overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-[140px_repeat(auto-fit,minmax(0,1fr))] border-b border-background-200 bg-background-100">
            <div className="px-3 py-2 text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Secteur</div>
            {dimensions.map(dim => (
              <div key={dim.key} className="px-3 py-2 text-center text-[10px] font-bold text-foreground-500 uppercase tracking-wider flex items-center justify-center gap-1">
                <i className={`${dim.icon} text-[10px] opacity-60`} />
                {dim.label}
              </div>
            ))}
          </div>
          {sectorsWithQuarter.map(s => (
            <div key={s.id} className="grid grid-cols-[140px_repeat(auto-fit,minmax(0,1fr))] border-b border-background-100">
              <div className="px-3 py-2 flex items-center gap-1.5">
                <i className={`${s.icon} text-xs`} style={{ color: s.color }} />
                <span className="text-[10px] font-bold text-foreground-900 truncate">{s.name}</span>
              </div>
              {dimensions.map((dim, di) => {
                const b = s.breakdown[di];
                const val = b?.val ?? 0;
                const cell = heatCellStyle(val);
                return (
                  <div key={dim.key} className="px-3 py-2 text-center flex items-center justify-center" style={{ background: cell.bg }}>
                    <span className="text-xs font-bold" style={{ color: cell.text }}>{val}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-background-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-5">
            <BigFourSubtitleBar label="Vue Synthétique" variant="left-accent" icon="ri-radar-line" accentColor="accent" />
          </div>
          <h2 className="text-3xl font-display font-bold text-foreground-950 mb-3">{title}</h2>
          <p className="text-foreground-600 max-w-2xl mx-auto">{subtitle}</p>
          <div className="mt-4">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-accent-100 text-accent-700 inline-flex items-center gap-1">
              <i className="ri-calendar-line text-xs" />
              {quarterLabel}
            </span>
          </div>
        </div>
        <div className={`bg-white rounded-xl border border-background-200 overflow-x-auto ${maxWidth} mx-auto`}>
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[160px_repeat(auto-fit,minmax(0,1fr))] border-b border-background-200 bg-background-50">
              <div className="px-4 py-3 text-xs font-bold text-foreground-500 uppercase tracking-wider">Secteur</div>
              {dimensions.map(dim => (
                <div key={dim.key} className="px-4 py-3 text-center text-xs font-bold text-foreground-500 uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <i className={`${dim.icon} text-xs opacity-60`} />
                  {dim.label}
                </div>
              ))}
            </div>
            {sectorsWithQuarter.map(s => (
              <div key={s.id} className="grid grid-cols-[160px_repeat(auto-fit,minmax(0,1fr))] border-b border-background-100">
                <div className="px-4 py-3 flex items-center gap-2">
                  <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
                  <span className="text-xs font-bold text-foreground-900">{s.name}</span>
                </div>
                {dimensions.map((dim, di) => {
                  const b = s.breakdown[di];
                  const val = b?.val ?? 0;
                  const cell = heatCellStyle(val);
                  return (
                    <div key={dim.key} className="px-4 py-3 text-center flex items-center justify-center" style={{ background: cell.bg }}>
                      <span className="text-sm font-bold" style={{ color: cell.text }}>{val}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CrossSectorHeatmap;



