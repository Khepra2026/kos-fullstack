interface AgentStatCardProps {
  index: number;
  title: string;
  value: string | number;
  unit: string;
  thresholds: { value: number; color: string }[];
  currentValue: number;
  trend?: 'up' | 'down' | 'stable';
}

export default function AgentStatCard({ index, title, value, unit, thresholds, currentValue, trend }: AgentStatCardProps) {
  const getColor = () => {
    const sorted = [...thresholds].sort((a, b) => b.value - a.value);
    for (const t of sorted) {
      if (currentValue >= t.value) return t.color;
    }
    return thresholds[thresholds.length - 1]?.color || 'oklch(var(--foreground-500))';
  };

  const color = getColor();

  return (
    <div className="bg-background-50 border border-background-200/70 rounded-xl p-4 hover:border-background-300/60 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold"
            style={{
              backgroundColor: `${color}20`,
              color,
            }}
          >
            {index}
          </div>
          <span className="text-[11px] font-semibold text-foreground-600 font-heading truncate max-w-[180px]">
            {title}
          </span>
        </div>
        {trend && (
          <span className="text-[10px] text-foreground-400">
            {trend === 'up' && <i className="ri-arrow-up-line text-emerald-500"></i>}
            {trend === 'down' && <i className="ri-arrow-down-line text-red-500"></i>}
            {trend === 'stable' && <i className="ri-subtract-line text-foreground-400"></i>}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-bold text-foreground-950 font-heading tabular-nums">
          {value}
        </span>
        <span className="text-xs text-foreground-400 font-body">{unit}</span>
      </div>

      <div className="mt-3 w-full h-1.5 bg-background-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${Math.min(currentValue * 10, 100)}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}



