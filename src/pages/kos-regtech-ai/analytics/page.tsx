import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import {
  BarChart3, TrendingUp, CheckCircle2, XCircle, Clock,
  Activity, Zap, Filter, RefreshCw, Loader2, ArrowLeft,
  PieChart, CalendarDays, Target, Hash,
} from 'lucide-react';

// ── Types ──

interface PipelineRun {
  id: string;
  trigger_type: string;
  regulator_source: string;
  doc_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  current_step: string | null;
  quality_score: number | null;
  audit_id: string | null;
  results: { channel: string; status: string; url?: string; error?: string }[] | null;
  error_message: string | null;
  started_at: string;
  completed_at: string | null;
  created_at: string;
}

interface AnalyticsData {
  totalRuns: number;
  successCount: number;
  failedCount: number;
  successRate: number;
  avgQualityScore: number;
  avgDurationMin: number;
  byRegulator: { regulator: string; count: number; successRate: number; avgQuality: number; avgDuration: number }[];
  byDay: { date: string; count: number; successCount: number; failedCount: number }[];
  byStatus: { status: string; count: number }[];
  recentRuns: PipelineRun[];
}

// ── Hook ──

function usePipelineAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: runs, error: dbError } = await supabase
        .from('kos_pipeline_runs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500);

      if (dbError) throw dbError;

      const pipelineRuns = (runs || []) as PipelineRun[];

      // ── Totals ──
      const totalRuns = pipelineRuns.length;
      const successCount = pipelineRuns.filter(r => r.status === 'completed').length;
      const failedCount = pipelineRuns.filter(r => r.status === 'failed').length;
      const successRate = totalRuns > 0 ? Math.round((successCount / (successCount + failedCount)) * 100) || 0 : 0;

      const completedRuns = pipelineRuns.filter(r => r.status === 'completed' && r.quality_score != null);
      const avgQualityScore = completedRuns.length > 0
        ? Math.round(completedRuns.reduce((sum, r) => sum + (r.quality_score || 0), 0) / completedRuns.length)
        : 0;

      const runsWithDuration = completedRuns.filter(r => r.started_at && r.completed_at);
      const avgDurationMin = runsWithDuration.length > 0
        ? Math.round(
            runsWithDuration.reduce((sum, r) => {
              const duration = (new Date(r.completed_at!).getTime() - new Date(r.started_at).getTime()) / 60000;
              return sum + duration;
            }, 0) / runsWithDuration.length
          )
        : 0;

      // ── By regulator ──
      const regulatorMap = new Map<string, { count: number; successCount: number; qualitySum: number; qualityCount: number; durationSum: number; durationCount: number }>();
      pipelineRuns.forEach(r => {
        const reg = r.regulator_source || 'Inconnu';
        if (!regulatorMap.has(reg)) {
          regulatorMap.set(reg, { count: 0, successCount: 0, qualitySum: 0, qualityCount: 0, durationSum: 0, durationCount: 0 });
        }
        const entry = regulatorMap.get(reg)!;
        entry.count++;
        if (r.status === 'completed') entry.successCount++;
        if (r.quality_score != null) { entry.qualitySum += r.quality_score; entry.qualityCount++; }
        if (r.started_at && r.completed_at) {
          entry.durationSum += (new Date(r.completed_at).getTime() - new Date(r.started_at).getTime()) / 60000;
          entry.durationCount++;
        }
      });

      const byRegulator = Array.from(regulatorMap.entries()).map(([regulator, stats]) => ({
        regulator,
        count: stats.count,
        successRate: stats.count > 0 ? Math.round((stats.successCount / stats.count) * 100) : 0,
        avgQuality: stats.qualityCount > 0 ? Math.round(stats.qualitySum / stats.qualityCount) : 0,
        avgDuration: stats.durationCount > 0 ? Math.round(stats.durationSum / stats.durationCount) : 0,
      })).sort((a, b) => b.count - a.count);

      // ── By day (last 30 days) ──
      const dayMap = new Map<string, { count: number; successCount: number; failedCount: number }>();
      const now = new Date();
      for (let i = 29; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        dayMap.set(key, { count: 0, successCount: 0, failedCount: 0 });
      }
      pipelineRuns.forEach(r => {
        const key = r.created_at ? r.created_at.split('T')[0] : '';
        if (dayMap.has(key)) {
          const entry = dayMap.get(key)!;
          entry.count++;
          if (r.status === 'completed') entry.successCount++;
          if (r.status === 'failed') entry.failedCount++;
        }
      });
      const byDay = Array.from(dayMap.entries()).map(([date, stats]) => ({ date, ...stats }));

      // ── By status ──
      const statusMap = new Map<string, number>();
      pipelineRuns.forEach(r => {
        statusMap.set(r.status, (statusMap.get(r.status) || 0) + 1);
      });
      const byStatus = Array.from(statusMap.entries()).map(([status, count]) => ({ status, count }));

      setData({
        totalRuns,
        successCount,
        failedCount,
        successRate,
        avgQualityScore,
        avgDurationMin,
        byRegulator,
        byDay,
        byStatus,
        recentRuns: pipelineRuns.slice(0, 20),
      });
    } catch (err: any) {
      console.warn('[PipelineAnalytics] Failed:', err);
      setError(err?.message || 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  return { data, loading, error, refetch: fetchAnalytics };
}

// ── Chart Components ──

function BarChartHorizontal({ data, maxValue, valueKey, labelKey, colorBar, formatValue }: {
  data: any[];
  maxValue?: number;
  valueKey: string;
  labelKey: string;
  colorBar: string;
  formatValue?: (v: number) => string;
}) {
  const actualMax = maxValue || Math.max(...data.map(d => d[valueKey]), 1);
  const fmt = formatValue || ((v: number) => String(v));

  return (
    <div className="space-y-2.5">
      {data.map((item, i) => {
        const pct = (item[valueKey] / actualMax) * 100;
        return (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs font-medium w-20 text-right flex-shrink-0" style={{ color: 'oklch(var(--foreground-700))' }}>
              {item[labelKey]}
            </span>
            <div className="flex-1 h-7 rounded-md overflow-hidden relative" style={{ backgroundColor: 'oklch(var(--background-100))' }}>
              <div
                className="h-full rounded-md transition-all duration-700 flex items-center justify-end px-2"
                style={{ width: `${Math.max(pct, 2)}%`, backgroundColor: colorBar }}
              >
                <span className="text-xs font-semibold text-white">{fmt(item[valueKey])}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LineChartSVG({ data, height, lines }: {
  data: { date: string; [key: string]: any }[];
  height: number;
  lines: { key: string; color: string; label: string }[];
}) {
  const width = 700;
  const pad = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;

  const allValues = data.flatMap(d => lines.map(l => d[l.key] || 0));
  const maxVal = Math.max(...allValues, 1);
  const minVal = 0;

  const scaleX = (i: number) => pad.left + (i / Math.max(data.length - 1, 1)) * chartW;
  const scaleY = (v: number) => pad.top + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;

  const buildPath = (key: string) => {
    if (data.length === 0) return '';
    return data.map((d, i) => {
      const x = scaleX(i);
      const y = scaleY(d[key] || 0);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const yTicks = 5;
  const yTickValues = Array.from({ length: yTicks }, (_, i) => Math.round(minVal + (maxVal - minVal) * (i / (yTicks - 1))));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      {/* Grid */}
      {yTickValues.map((v, i) => (
        <g key={i}>
          <line x1={pad.left} x2={width - pad.right} y1={scaleY(v)} y2={scaleY(v)} stroke="oklch(var(--background-200) / 0.5)" strokeWidth="1" />
          <text x={pad.left - 8} y={scaleY(v) + 4} textAnchor="end" className="text-[10px]" fill="oklch(var(--foreground-500))">{v}</text>
        </g>
      ))}
      {/* Lines */}
      {lines.map((line, li) => (
        <path key={li} d={buildPath(line.key)} fill="none" stroke={line.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {/* Dots */}
      {lines.map((line, li) =>
        data.map((d, di) => (
          <circle key={`${li}-${di}`} cx={scaleX(di)} cy={scaleY(d[line.key] || 0)} r="3" fill={line.color} />
        ))
      )}
      {/* X labels */}
      {data.filter((_, i) => i % Math.ceil(data.length / 8) === 0 || i === data.length - 1).map((d, i) => {
        const actualIndex = data.indexOf(d);
        const label = d.date.slice(5);
        return (
          <text key={i} x={scaleX(actualIndex)} y={height - 8} textAnchor="middle" className="text-[10px]" fill="oklch(var(--foreground-500))">{label}</text>
        );
      })}
    </svg>
  );
}

function DonutChartSVG({ segments, size }: {
  segments: { value: number; color: string; label: string }[];
  size: number;
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const radius = size / 2 - 10;
  const innerRadius = radius * 0.6;
  const center = size / 2;

  let cumulative = 0;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto max-w-[200px] mx-auto">
      {segments.map((seg, i) => {
        const startAngle = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
        cumulative += seg.value;
        const endAngle = (cumulative / total) * Math.PI * 2 - Math.PI / 2;

        const x1 = center + radius * Math.cos(startAngle);
        const y1 = center + radius * Math.sin(startAngle);
        const x2 = center + radius * Math.cos(endAngle);
        const y2 = center + radius * Math.sin(endAngle);
        const x3 = center + innerRadius * Math.cos(endAngle);
        const y3 = center + innerRadius * Math.sin(endAngle);
        const x4 = center + innerRadius * Math.cos(startAngle);
        const y4 = center + innerRadius * Math.sin(startAngle);

        const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

        const path = [
          `M ${x1} ${y1}`,
          `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
          `L ${x3} ${y3}`,
          `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
          'Z',
        ].join(' ');

        const midAngle = startAngle + (endAngle - startAngle) / 2;
        const labelR = (radius + innerRadius) / 2;
        const lx = center + labelR * Math.cos(midAngle);
        const ly = center + labelR * Math.sin(midAngle);

        return (
          <g key={i}>
            <path d={path} fill={seg.color} opacity="0.9" />
            {seg.value > 0 && (seg.value / total) > 0.08 && (
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="text-[10px] font-bold" fill="white">
                {seg.value}
              </text>
            )}
          </g>
        );
      })}
      <text x={center} y={center - 6} textAnchor="middle" className="text-lg font-bold" fill="oklch(var(--foreground-950))">{total}</text>
      <text x={center} y={center + 12} textAnchor="middle" className="text-[10px]" fill="oklch(var(--foreground-500))">Total</text>
    </svg>
  );
}

// ── Stats Card ──

function StatsCard({ title, value, subtitle, icon: Icon, color }: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="rounded-2xl p-5 border flex items-start gap-4" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
      <div className="w-11 h-11 flex items-center justify-center rounded-xl flex-shrink-0" style={{ backgroundColor: `${color}15` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="min-w-0">
        <p className="text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>{title}</p>
        <p className="text-2xl font-bold mt-0.5" style={{ color: 'oklch(var(--foreground-950))' }}>{value}</p>
        {subtitle && <p className="text-xs mt-1" style={{ color: 'oklch(var(--foreground-500))' }}>{subtitle}</p>}
      </div>
    </div>
  );
}

// ── Main Page ──

const REGULATOR_COLORS: Record<string, string> = {
  BCEAO: '#D4AF37',
  COBAC: '#86BC25',
  BEAC: '#2E8B57',
  OHADA: '#c9a227',
  GAFI: '#e67e22',
  IFRS: '#3498db',
};

const STATUS_COLORS: Record<string, string> = {
  completed: '#86BC25',
  failed: '#ef4444',
  running: '#f59e0b',
  pending: '#9ca3af',
};

const STATUS_LABELS: Record<string, string> = {
  completed: 'Succès',
  failed: 'Échecs',
  running: 'En cours',
  pending: 'En attente',
};

export default function KOSRegTechAIAnalyticsPage() {
  const { data, loading, error, refetch } = usePipelineAnalytics();
  const [selectedRegulator, setSelectedRegulator] = useState<string | null>(null);

  const filteredByDay = useMemo(() => {
    if (!data) return [];
    return data.byDay;
  }, [data]);

  const filteredByRegulator = useMemo(() => {
    if (!data) return [];
    if (!selectedRegulator) return data.byRegulator;
    return data.byRegulator.filter(r => r.regulator === selectedRegulator);
  }, [data, selectedRegulator]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'oklch(var(--background-50))' }}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'oklch(var(--accent-500))' }} />
          <p className="text-sm" style={{ color: 'oklch(var(--foreground-500))' }}>Chargement des analytics...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'oklch(var(--background-50))' }}>
        <div className="text-center">
          <XCircle className="w-10 h-10 mx-auto mb-3" style={{ color: 'oklch(var(--primary-500))' }} />
          <p className="text-sm font-semibold mb-2" style={{ color: 'oklch(var(--foreground-950))' }}>Erreur de chargement</p>
          <p className="text-xs mb-4" style={{ color: 'oklch(var(--foreground-500))' }}>{error || 'Aucune donnée'}</p>
          <button onClick={refetch} className="px-4 py-2 rounded-xl text-sm font-medium cursor-pointer whitespace-nowrap" style={{ backgroundColor: 'oklch(var(--accent-500))', color: 'oklch(var(--background-50))' }}>
            <RefreshCw className="w-4 h-4 inline mr-1" />Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(var(--background-50))' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-14">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <a href="/kos-regtech-ai/" className="w-10 h-10 flex items-center justify-center rounded-xl transition-all cursor-pointer" style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }}>
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
                <BarChart3 className="w-6 h-6" style={{ color: 'oklch(var(--accent-500))' }} />
                KOS Analytics
              </h1>
              <p className="text-sm mt-1" style={{ color: 'oklch(var(--foreground-500))' }}>
                Tendances des pipelines — Qualité par régulateur, volume quotidien, performances
              </p>
            </div>
          </div>
          <button onClick={refetch} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer whitespace-nowrap transition-all" style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-700))' }}>
            <RefreshCw className="w-4 h-4" />
            Actualiser
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard title="Total pipelines" value={data.totalRuns} subtitle="depuis le lancement" icon={Hash} color="#86BC25" />
          <StatsCard title="Taux de succès" value={`${data.successRate}%`} subtitle={`${data.successCount} succès / ${data.failedCount} échecs`} icon={CheckCircle2} color="#86BC25" />
          <StatsCard title="Score Qualité moyen" value={`${data.avgQualityScore}%`} subtitle="Big Four Quality Score" icon={Target} color="#D4AF37" />
          <StatsCard title="Durée moyenne" value={`${data.avgDurationMin} min`} subtitle="par pipeline complété" icon={Clock} color="#c9a227" />
        </div>

        {/* Charts Row 1: Quality by Regulator + Status Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {/* Quality by Regulator */}
          <div className="lg:col-span-3 rounded-2xl p-6 border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
                <Activity className="w-4 h-4" style={{ color: 'oklch(var(--accent-500))' }} />
                Score Qualité par régulateur
              </h2>
              <div className="flex gap-1">
                <button onClick={() => setSelectedRegulator(null)} className={`px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-all whitespace-nowrap ${!selectedRegulator ? 'text-white' : ''}`} style={!selectedRegulator ? { backgroundColor: 'oklch(var(--accent-500))', color: 'oklch(var(--background-50))' } : { backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }}>Tous</button>
                {data.byRegulator.map(reg => (
                  <button key={reg.regulator} onClick={() => setSelectedRegulator(selectedRegulator === reg.regulator ? null : reg.regulator)} className={`px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-all whitespace-nowrap ${selectedRegulator === reg.regulator ? 'text-white' : ''}`} style={selectedRegulator === reg.regulator ? { backgroundColor: REGULATOR_COLORS[reg.regulator] || '#9ca3af', color: '#fff' } : { backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }}>
                    {reg.regulator}
                  </button>
                ))}
              </div>
            </div>
            {filteredByRegulator.length === 0 ? (
              <p className="text-sm py-8 text-center" style={{ color: 'oklch(var(--foreground-500))' }}>Aucune donnée pour ce filtre</p>
            ) : (
              <BarChartHorizontal
                data={filteredByRegulator}
                valueKey="avgQuality"
                labelKey="regulator"
                maxValue={100}
                colorBar="#86BC25"
                formatValue={(v: number) => `${v}%`}
              />
            )}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {filteredByRegulator.map(reg => (
                <div key={reg.regulator} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'oklch(var(--background-100) / 0.6)' }}>
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 text-xs font-bold text-white" style={{ backgroundColor: REGULATOR_COLORS[reg.regulator] || '#9ca3af' }}>
                    {reg.regulator.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: 'oklch(var(--foreground-900))' }}>{reg.regulator}</p>
                    <p className="text-[10px]" style={{ color: 'oklch(var(--foreground-500))' }}>
                      {reg.count} runs • {reg.successRate}% succès • ~{reg.avgDuration} min
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Distribution */}
          <div className="lg:col-span-2 rounded-2xl p-6 border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
            <h2 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
              <PieChart className="w-4 h-4" style={{ color: 'oklch(var(--accent-500))' }} />
              Distribution par statut
            </h2>
            <DonutChartSVG
              segments={data.byStatus.map(s => ({ value: s.count, color: STATUS_COLORS[s.status] || '#9ca3af', label: STATUS_LABELS[s.status] || s.status }))}
              size={200}
            />
            <div className="flex flex-wrap justify-center gap-3 mt-3">
              {data.byStatus.map(s => (
                <div key={s.status} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[s.status] || '#9ca3af' }} />
                  <span className="text-xs" style={{ color: 'oklch(var(--foreground-600))' }}>{STATUS_LABELS[s.status] || s.status}: {s.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Volume by Day Chart */}
        <div className="rounded-2xl p-6 border mb-8" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
            <CalendarDays className="w-4 h-4" style={{ color: 'oklch(var(--accent-500))' }} />
            Volume quotidien — 30 derniers jours
          </h2>
          {filteredByDay.length === 0 ? (
            <p className="text-sm py-8 text-center" style={{ color: 'oklch(var(--foreground-500))' }}>Aucune donnée</p>
          ) : (
            <div className="overflow-x-auto">
              <div style={{ minWidth: '600px' }}>
                <LineChartSVG
                  data={filteredByDay}
                  height={250}
                  lines={[
                    { key: 'count', color: '#86BC25', label: 'Total' },
                    { key: 'successCount', color: '#D4AF37', label: 'Succès' },
                    { key: 'failedCount', color: '#ef4444', label: 'Échecs' },
                  ]}
                />
              </div>
              <div className="flex justify-center gap-5 mt-3">
                {[
                  { key: 'count', color: '#86BC25', label: 'Total' },
                  { key: 'successCount', color: '#D4AF37', label: 'Succès' },
                  { key: 'failedCount', color: '#ef4444', label: 'Échecs' },
                ].map(l => (
                  <div key={l.key} className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 rounded-full" style={{ backgroundColor: l.color }} />
                    <span className="text-xs" style={{ color: 'oklch(var(--foreground-600))' }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recent Runs Table */}
        <div className="rounded-2xl p-6 border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
            <Zap className="w-4 h-4" style={{ color: 'oklch(var(--accent-500))' }} />
            20 dernières exécutions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid oklch(var(--background-200) / 0.7)' }}>
                  <th className="text-left py-2.5 px-3 text-xs font-semibold" style={{ color: 'oklch(var(--foreground-500))' }}>Date</th>
                  <th className="text-left py-2.5 px-3 text-xs font-semibold" style={{ color: 'oklch(var(--foreground-500))' }}>Régulateur</th>
                  <th className="text-left py-2.5 px-3 text-xs font-semibold" style={{ color: 'oklch(var(--foreground-500))' }}>Document</th>
                  <th className="text-center py-2.5 px-3 text-xs font-semibold" style={{ color: 'oklch(var(--foreground-500))' }}>Statut</th>
                  <th className="text-center py-2.5 px-3 text-xs font-semibold" style={{ color: 'oklch(var(--foreground-500))' }}>Score Qualité</th>
                  <th className="text-center py-2.5 px-3 text-xs font-semibold" style={{ color: 'oklch(var(--foreground-500))' }}>Durée</th>
                </tr>
              </thead>
              <tbody>
                {data.recentRuns.map(run => {
                  const duration = run.started_at && run.completed_at
                    ? Math.round((new Date(run.completed_at).getTime() - new Date(run.started_at).getTime()) / 60000)
                    : null;
                  return (
                    <tr key={run.id} className="hover:bg-background-100/50 transition-all" style={{ borderBottom: '1px solid oklch(var(--background-200) / 0.4)' }}>
                      <td className="py-2.5 px-3 text-xs" style={{ color: 'oklch(var(--foreground-600))' }}>
                        {run.created_at ? new Date(run.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: REGULATOR_COLORS[run.regulator_source] || '#9ca3af' }}>
                          {run.regulator_source || '—'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-xs font-mono" style={{ color: 'oklch(var(--foreground-600))' }}>{run.doc_id || '—'}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{
                          backgroundColor: run.status === 'completed' ? 'oklch(var(--accent-100) / 0.6)' : run.status === 'failed' ? 'oklch(var(--primary-100) / 0.5)' : 'oklch(var(--background-100))',
                          color: run.status === 'completed' ? 'oklch(var(--accent-700))' : run.status === 'failed' ? 'oklch(var(--primary-600))' : 'oklch(var(--foreground-600))',
                        }}>
                          {run.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> : run.status === 'failed' ? <XCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {STATUS_LABELS[run.status] || run.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center text-xs font-semibold" style={{ color: run.quality_score != null && run.quality_score >= 95 ? 'oklch(var(--accent-600))' : run.quality_score != null && run.quality_score >= 80 ? 'oklch(var(--accent-500))' : 'oklch(var(--foreground-600))' }}>
                        {run.quality_score != null ? `${run.quality_score}%` : '—'}
                      </td>
                      <td className="py-2.5 px-3 text-center text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>
                        {duration != null ? `${duration} min` : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}