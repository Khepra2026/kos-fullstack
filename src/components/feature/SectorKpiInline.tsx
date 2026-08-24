import { useState, useCallback, useId } from 'react';

export interface SectorKpiData {
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: string;
  change: string;
  icon: string;
  desc?: string;
}

interface MiniProgressBarProps {
  value: number;
  target: number;
  color?: string;
}

export function MiniProgressBar({ value, target, color = '#2d7518' }: MiniProgressBarProps) {
  const pct = Math.min((value / target) * 100, 100);
  return (
    <div className="w-full bg-background-200 rounded-full h-2 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
      />
    </div>
  );
}

interface TrendBadgeProps {
  trend: string;
  change: string;
}

export function TrendBadge({ trend, change }: TrendBadgeProps) {
  const isUp = trend === 'up';
  const isDown = trend === 'down';
  const color = isUp
    ? 'text-emerald-600 bg-emerald-50'
    : isDown
      ? 'text-red-600 bg-red-50'
      : 'text-foreground-600 bg-foreground-100';
  const icon = isUp ? 'ri-arrow-up-line' : isDown ? 'ri-arrow-down-line' : 'ri-arrow-right-line';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${color}`}>
      <i className={icon} />
      {change}
    </span>
  );
}

interface SectorKpiCardProps {
  kpi: SectorKpiData;
  color?: string;
  hoverBorderClass?: string;
}

export function SectorKpiCard({ kpi, color = '#2d7518', hoverBorderClass = 'hover:border-emerald-300' }: SectorKpiCardProps) {
  const numericValue = typeof kpi.value === 'number' ? kpi.value : 0;
  return (
    <div className={`bg-white rounded-xl p-4 border border-background-200 group ${hoverBorderClass} transition-all`}>
      <div className="flex items-center justify-between mb-2">
        <div
          className="w-8 h-8 flex items-center justify-center rounded-lg"
          style={{ background: `${color}14` }}
        >
          <i className={`${kpi.icon} text-sm`} style={{ color }} />
        </div>
        <TrendBadge trend={kpi.trend} change={kpi.change} />
      </div>
      <div className="text-2xl font-bold text-foreground-950 mb-0.5">
        {kpi.value}{kpi.unit}
      </div>
      <div className="text-[10px] text-foreground-500 mb-2">{kpi.name}</div>
      <MiniProgressBar value={numericValue} target={kpi.target} color={color} />
      <div className="flex items-center justify-between mt-1 text-[10px] text-foreground-400">
        <span>Cible: {kpi.target}{kpi.unit}</span>
        <span>{Math.round((numericValue / kpi.target) * 100)}%</span>
      </div>
    </div>
  );
}

interface SectorKpiGridProps {
  kpis: SectorKpiData[];
  color?: string;
  hoverBorderClass?: string;
  columns?: string;
  subtitle?: string;
  subtitleIcon?: string;
  subtitleAccentColor?: 'primary' | 'accent' | 'secondary';
}

export function SectorKpiGrid({
  kpis,
  color = '#2d7518',
  hoverBorderClass = 'hover:border-emerald-300',
  columns = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
}: SectorKpiGridProps) {
  return (
    <div className={`grid ${columns} gap-4`}>
      {kpis.map((kpi, i) => (
        <SectorKpiCard key={i} kpi={kpi} color={color} hoverBorderClass={hoverBorderClass} />
      ))}
    </div>
  );
}

interface SectorScoreCardProps {
  score: number;
  maxScore?: number;
  label: string;
  color?: string;
  breakdown: { label: string; val: number }[];
}

export function SectorScoreCard({ score, maxScore = 100, label, color = '#2d7518', breakdown }: SectorScoreCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-background-200">
      <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
        <i className="ri-pie-chart-line" style={{ color }} /> Score Global Secteur
      </h3>
      <div className="text-center mb-6">
        <div className="text-5xl font-bold mb-2" style={{ color }}>{score}</div>
        <div className="text-sm text-foreground-500">/{maxScore} — {label}</div>
      </div>
      <div className="space-y-3">
        {breakdown.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="text-xs text-foreground-600 w-40 whitespace-nowrap">{s.label}</span>
            <div className="flex-1 h-1.5 bg-background-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${s.val}%`,
                  background: s.val >= 80 ? '#059669' : s.val >= 60 ? '#d97706' : '#dc2626',
                }}
              />
            </div>
            <span className="text-xs font-bold text-foreground-950 w-8 text-right">{s.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface QuarterData {
  label: string;
  status: 'completed' | 'in_progress' | 'planned';
  desc: string;
}

interface SectorQuarterSelectorProps {
  quarters: QuarterData[];
  activeColor?: string;
  activeBgClass?: string;
  activeTextClass?: string;
}

export function SectorQuarterSelector({
  quarters,
  activeColor = '#10b981',
  activeBgClass = 'border-emerald-500 bg-emerald-50',
  activeTextClass = 'text-emerald-700',
}: SectorQuarterSelectorProps) {
  const [current, setCurrent] = useState(1);

  const handleSelect = useCallback((i: number) => {
    setCurrent(i);
  }, []);

  return (
    <div>
      <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
        <i className="ri-calendar-line" style={{ color: '#d4a82a' }} /> Calendrier Trimestriel
      </h3>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {quarters.map((q, i) => {
          const isActive = current === i;
          return (
            <button
              key={q.label}
              onClick={() => handleSelect(i)}
              className={`text-center p-3 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? `border-2 ${activeBgClass}`
                  : 'border border-background-200 hover:border-foreground-300'
              }`}
            >
              <div className={`text-lg font-bold mb-1 ${isActive ? activeTextClass : 'text-foreground-950'}`}>
                {q.label}
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  q.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-700'
                    : q.status === 'in_progress'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-foreground-100 text-foreground-600'
                }`}
              >
                {q.status === 'completed' ? '✓ Publié' : q.status === 'in_progress' ? 'En cours' : 'Planifié'}
              </span>
            </button>
          );
        })}
      </div>
      <div className="bg-background-50 rounded-lg p-4">
        <div className="text-xs font-bold text-foreground-500 uppercase tracking-widest mb-1">
          {quarters[current].label}
        </div>
        <p className="text-sm text-foreground-700">{quarters[current].desc}</p>
      </div>
    </div>
  );
}

interface SectorInsightCardProps {
  title: string;
  date: string;
  tag: string;
  icon: string;
  tagBgClass?: string;
  tagTextClass?: string;
  hoverTextClass?: string;
}

export function SectorInsightCard({
  title,
  date,
  tag,
  icon,
  tagBgClass = 'bg-accent-100',
  tagTextClass = 'text-accent-700',
  hoverTextClass = 'group-hover:text-emerald-700',
}: SectorInsightCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 border border-background-200 hover:border-foreground-300 transition-all cursor-pointer group">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg mb-3" style={{ background: 'rgba(212,168,42,0.08)' }}>
        <i className={`${icon} text-lg`} style={{ color: '#d4a82a' }} />
      </div>
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagBgClass} ${tagTextClass}`}>
        {tag}
      </span>
      <h4 className={`text-sm font-bold text-foreground-950 mt-2 mb-1 ${hoverTextClass} transition-colors leading-snug`}>
        {title}
      </h4>
      <p className="text-xs text-foreground-500">{date}</p>
    </div>
  );
}

interface SectorIndiceCardProps {
  name: string;
  score: number;
  desc: string;
  color?: string;
}

export function SectorIndiceCard({ name, score, desc, color = '#2d7518' }: SectorIndiceCardProps) {
  return (
    <div className="bg-background-50 rounded-xl p-5 border border-background-100">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold text-foreground-950">{name}</h4>
        <span className="text-2xl font-bold" style={{ color }}>{score}</span>
      </div>
      <p className="text-xs text-foreground-600 leading-relaxed">{desc}</p>
      <div className="mt-3">
        <MiniProgressBar value={score} target={100} color={score >= 80 ? '#059669' : '#d97706'} />
      </div>
    </div>
  );
}

// ── Sparkline T1-T4 ──
interface SparklineProps {
  t1: number;
  t2: number;
  t3: number;
  t4: number;
  color?: string;
  height?: number;
  className?: string;
}

export function Sparkline({ t1, t2, t3, t4, color = '#2d7518', height = 40, className = '' }: SparklineProps) {
  const uid = useId().replace(/:/g, '');
  const values = [t1, t2, t3, t4];
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const w = 80;
  const h = height;
  const padX = 4;
  const padY = 4;
  const usableW = w - padX * 2;
  const usableH = h - padY * 2;

  const points = values.map((v, i) => {
    const x = padX + (i / 3) * usableW;
    const y = padY + usableH - ((v - min) / range) * usableH;
    return `${x},${y}`;
  });
  const polyline = points.join(' ');

  const fillPoints = `${padX},${h - padY} ${polyline} ${w - padX},${h - padY}`;
  const gradId = `sg-${uid}`;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="flex-shrink-0">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <polygon points={fillPoints} fill={`url(#${gradId})`} />
        <polyline
          points={polyline}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {values.map((v, i) => {
          const x = padX + (i / 3) * usableW;
          const y = padY + usableH - ((v - min) / range) * usableH;
          return (
            <circle key={i} cx={x} cy={y} r="2.5" fill="white" stroke={color} strokeWidth="1.5" />
          );
        })}
      </svg>
      <div className="flex flex-col gap-0.5">
        {['T1','T2','T3','T4'].map((label, i) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="text-[9px] text-foreground-400 w-4">{label}</span>
            <span className="text-[10px] font-bold text-foreground-700">{values[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Quarterly KPI Card with Sparkline ──
interface QuarterlyKpiCardProps {
  name: string;
  value: number;
  target: number;
  unit: string;
  t1: number;
  t2: number;
  t3: number;
  t4: number;
  color?: string;
  progressColor?: string;
}

export function QuarterlyKpiCard({
  name,
  value,
  target,
  unit,
  t1,
  t2,
  t3,
  t4,
  color = '#2d7518',
  progressColor = '#059669',
}: QuarterlyKpiCardProps) {
  const uid = useId().replace(/:/g, '');
  const progress = Math.min(Math.round((value / target) * 100), 100);
  const values = [t1, t2, t3, t4];
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const svgW = 100;
  const svgH = 32;
  const padX = 2;
  const padY = 4;
  const usableW = svgW - padX * 2;
  const usableH = svgH - padY * 2;

  const polyPoints = values.map((v, i) => {
    const x = padX + (i / 3) * usableW;
    const y = padY + usableH - ((v - min) / range) * usableH;
    return `${x},${y}`;
  }).join(' ');

  const fillPts = `${padX},${svgH - padY} ${polyPoints} ${svgW - padX},${svgH - padY}`;
  const gradId = `qg-${uid}`;

  return (
    <div className="bg-white rounded-xl p-4 border border-background-200 hover:border-emerald-200 transition-all group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-foreground-800 leading-snug">{name}</span>
        <span className="text-xs font-bold" style={{ color }}>{value}{unit}</span>
      </div>
      {/* Sparkline */}
      <div className="flex items-center gap-3 mb-2">
        <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="flex-shrink-0">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.03" />
            </linearGradient>
          </defs>
          <polygon points={fillPts} fill={`url(#${gradId})`} />
          <polyline
            points={polyPoints}
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex-1">
          <div className="w-full bg-background-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${color}, ${progressColor})` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[9px] text-foreground-400">Cible: {target}{unit}</span>
            <span className="text-[9px] font-bold text-foreground-600">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Quarterly KPIs Section (grid + header) ──
interface QuarterlyKpisSectionProps {
  quarterlyKpis: { name: string; value: number; target: number; unit: string; t1: number; t2: number; t3: number; t4: number }[];
  color?: string;
  progressColor?: string;
  loading?: boolean;
  fromSupabase?: boolean;
}

export function QuarterlyKpisSection({
  quarterlyKpis,
  color = '#2d7518',
  progressColor = '#059669',
  loading = false,
  fromSupabase = false,
}: QuarterlyKpisSectionProps) {
  return (
    <div className="mt-10 bg-white rounded-xl border border-background-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: `${color}14` }}>
            <i className="ri-calendar-check-line text-sm" style={{ color }} />
          </div>
          <h3 className="text-sm font-bold text-foreground-950">KPIs Trimestriels T1-T4 2026</h3>
        </div>
        <div className="flex items-center gap-2">
          {fromSupabase && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 flex items-center gap-1">
              <i className="ri-database-2-line" /> Supabase
            </span>
          )}
          {loading && (
            <span className="text-[10px] text-foreground-400 flex items-center gap-1">
              <i className="ri-loader-4-line animate-spin" /> Chargement...
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quarterlyKpis.map((qkpi, i) => (
          <QuarterlyKpiCard
            key={i}
            name={qkpi.name}
            value={qkpi.value}
            target={qkpi.target}
            unit={qkpi.unit}
            t1={qkpi.t1}
            t2={qkpi.t2}
            t3={qkpi.t3}
            t4={qkpi.t4}
            color={color}
            progressColor={progressColor}
          />
        ))}
      </div>
    </div>
  );
}



