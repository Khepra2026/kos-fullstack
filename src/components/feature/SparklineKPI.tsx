import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { supabase } from '@/lib/supabase';

export type SparklineMetric = 'latency_avg' | 'success_rate' | 'failover_count';

interface HourlyRow {
  hour: string;
  latency_avg: number | null;
  success_rate: number | null;
  failover_count: number | null;
}

interface SparklineKPIProps {
  metric: SparklineMetric;
  color?: string;
  showTooltip?: boolean;
  height?: number;
}

const DEFAULT_COLORS: Record<SparklineMetric, string> = {
  latency_avg: '#16a34a',   // green-600 — latence = bon indicateur
  success_rate: '#0891b2',  // cyan-600 — succès = accent-like
  failover_count: '#dc2626', // red-600 — alerte
};

function formatHourLabel(hour: string): string {
  const d = new Date(hour);
  return `${d.getDate()}/${d.getMonth() + 1} ${d.getHours()}h`;
}

export function SparklineKPI({
  metric,
  color,
  showTooltip = false,
  height = 48,
}: SparklineKPIProps) {
  const [data, setData] = useState<HourlyRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from('kos_routing_kpis_hourly')
      .select('hour, latency_avg, success_rate, failover_count')
      .order('hour', { ascending: true })
      .limit(48)
      .then(({ data: raw, error }) => {
        if (cancelled) return;
        if (error) {
          setData([]);
          setLoading(false);
          return;
        }
        const rows = (raw || []) as unknown as HourlyRow[];
        const formatted = rows.map((r) => ({
          ...r,
          label: formatHourLabel(r.hour),
          [metric]:
            metric === 'success_rate'
              ? Math.round((r[metric] ?? 0) * 100)
              : Math.round(r[metric] ?? 0),
        }));
        setData(formatted);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [metric]);

  const strokeColor = color || DEFAULT_COLORS[metric];

  const latestValue = data.length > 0 ? data[data.length - 1][metric] : undefined;

  const unitLabel =
    metric === 'latency_avg'
      ? 'ms'
      : metric === 'success_rate'
        ? '%'
        : '';

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
  }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-md border border-background-200 bg-background-50 px-2 py-1 text-[10px] text-foreground-700 shadow-sm">
        {label}: {payload[0].value}{unitLabel}
      </div>
    );
  };

  return (
    <div>
      <div style={{ height }}>
        {loading || data.length === 0 ? (
          <div className="h-full w-full animate-pulse rounded bg-background-200" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              <Line
                type="monotone"
                dataKey={metric}
                stroke={strokeColor}
                strokeWidth={1.5}
                dot={false}
                activeDot={{ r: 3, fill: strokeColor, stroke: '#fff', strokeWidth: 2 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      {latestValue !== undefined && (
        <div className="mt-1 flex items-center justify-between">
          <span className="text-[10px] text-foreground-400">
            {data.length}h d&apos;historique
          </span>
          <span className="text-[10px] font-semibold" style={{ color: strokeColor }}>
            {latestValue}
            {unitLabel}
          </span>
        </div>
      )}
    </div>
  );
}