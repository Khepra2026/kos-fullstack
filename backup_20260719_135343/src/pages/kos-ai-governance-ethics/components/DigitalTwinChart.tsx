import { useMemo } from 'react';

interface Dimension {
  label: string;
  value: number;
  max: number;
  color: string;
}

const dimensions: Dimension[] = [
  { label: 'Conformite', value: 9.4, max: 10, color: '#22c55e' },
  { label: 'Tracabilite', value: 8.8, max: 10, color: '#06b6d4' },
  { label: 'Ethique', value: 9.1, max: 10, color: '#8b5cf6' },
  { label: 'Securite', value: 9.6, max: 10, color: '#ef4444' },
  { label: 'Performance', value: 9.0, max: 10, color: '#f59e0b' },
  { label: 'Gouvernance', value: 9.2, max: 10, color: '#10b981' },
];

function RadarChart({ data, size = 280 }: { data: Dimension[]; size?: number }) {
  const center = size / 2;
  const radius = size / 2 - 40;
  const angleSlice = (Math.PI * 2) / data.length;

  const points = useMemo(() => {
    return data.map((_d, i) => {
      const angle = i * angleSlice - Math.PI / 2;
      const r = (data[i].value / data[i].max) * radius;
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle),
      };
    });
  }, [data, center, radius, angleSlice]);

  const gridLevels = 4;

  return (
    <svg width={size} height={size} className="mx-auto">
      {Array.from({ length: gridLevels }).map((_, level) => {
        const r = ((level + 1) / gridLevels) * radius;
        return (
          <circle
            key={level}
            cx={center}
            cy={center}
            r={r}
            fill="none"
            className="stroke-background-200"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        );
      })}

      {data.map((_d, i) => {
        const angle = i * angleSlice - Math.PI / 2;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            className="stroke-background-200"
            strokeWidth="1"
          />
        );
      })}

      <polygon
        points={points.map((p) => `${p.x},${p.y}`).join(' ')}
        className="fill-accent-500/15 stroke-accent-500"
        strokeWidth="2"
      />

      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4"
          fill={data[i].color}
          stroke="white"
          strokeWidth="2"
        />
      ))}

      {data.map((d, i) => {
        const angle = i * angleSlice - Math.PI / 2;
        const labelR = radius + 22;
        const x = center + labelR * Math.cos(angle);
        const y = center + labelR * Math.sin(angle);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[10px] fill-foreground-700 font-medium"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

export default function DigitalTwinChart() {
  const overallScore = 9.2;

  return (
    <div className="space-y-6">
      {/* Hero Score */}
      <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 border border-accent-400/30 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
              </span>
              <span className="text-xs font-bold text-accent-300">KOS DIGITAL TWIN — LIVE MIRROR</span>
            </div>
            <h2 className="font-heading text-2xl font-bold text-white mb-2">
              Digital Twin Score : {overallScore}/10
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Jumeau numerique temps reel du systeme AI Governance KOS.
              Replique virtuelle des 68 agents, flux de conformite, tracabilite et etats ethiques.
              Mise a jour continue depuis Supabase avec synchronisation bidirectionnelle.
            </p>
          </div>
          <div className="flex-shrink-0 text-center px-8 py-5 rounded-2xl bg-accent-500/10 border border-accent-400/20">
            <div className="text-5xl font-bold text-accent-400 font-heading">{overallScore}</div>
            <div className="text-xs text-accent-300 mt-1">/ 10.0 — Excellence</div>
          </div>
        </div>
      </div>

      {/* Radar + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
          <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
              <i className="ri-radar-line text-lg"></i>
            </span>
            Carte Radar — 6 Dimensions
          </h3>
          <RadarChart data={dimensions} size={320} />
          <div className="grid grid-cols-3 gap-3 mt-4">
            {dimensions.map((d) => (
              <div key={d.label} className="text-center p-2 rounded-lg bg-background-100">
                <div className="text-sm font-bold" style={{ color: d.color }}>{d.value}</div>
                <div className="text-[10px] text-foreground-500">{d.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
          <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
              <i className="ri-cpu-line text-lg"></i>
            </span>
            Etat du Systeme Digital Twin
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Agents Synchronises', value: 68, max: 68, color: 'bg-emerald-500', pct: 100 },
              { label: 'Pipelines Actifs', value: 12, max: 12, color: 'bg-accent-500', pct: 100 },
              { label: 'Verifications/min', value: 342, max: 500, color: 'bg-primary-500', pct: 68 },
              { label: 'Latence Twin to Live', value: 47, max: 100, color: 'bg-amber-500', pct: 47, suffix: 'ms' },
              { label: 'Data Freshness', value: 99.2, max: 100, color: 'bg-emerald-500', pct: 99.2, suffix: '%' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground-600">{item.label}</span>
                  <span className="text-xs font-bold text-foreground-950">{item.value}{item.suffix || ''} / {item.max}{item.suffix || ''}</span>
                </div>
                <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-accent-50/50 border border-accent-100">
            <h4 className="text-xs font-bold text-foreground-950 mb-2">Derniere Synchronisation</h4>
            <div className="flex items-center gap-2 text-xs text-foreground-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live — Mise a jour en temps reel via WebSocket</span>
            </div>
            <p className="text-[10px] text-foreground-400 mt-1">Source : Supabase realtime + Edge Functions orchestrator</p>
          </div>
        </div>
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: 'ri-archive-line', label: 'Registry Mirror', status: 'Sync', color: 'text-emerald-600 bg-emerald-100' },
          { icon: 'ri-shield-check-line', label: 'Compliance Twin', status: 'Sync', color: 'text-emerald-600 bg-emerald-100' },
          { icon: 'ri-shield-flash-line', label: 'Risk Mirror', status: 'Sync', color: 'text-emerald-600 bg-emerald-100' },
          { icon: 'ri-scales-3-line', label: 'Ethics Twin', status: 'Sync', color: 'text-emerald-600 bg-emerald-100' },
          { icon: 'ri-footprint-line', label: 'Audit Mirror', status: 'Sync', color: 'text-emerald-600 bg-emerald-100' },
          { icon: 'ri-brain-line', label: 'Knowledge Twin', status: 'Sync', color: 'text-emerald-600 bg-emerald-100' },
          { icon: 'ri-mind-map', label: 'Hallucination Twin', status: 'Sync', color: 'text-emerald-600 bg-emerald-100' },
          { icon: 'ri-links-line', label: 'Source Twin', status: 'Sync', color: 'text-emerald-600 bg-emerald-100' },
        ].map((comp) => (
          <div key={comp.label} className="p-4 rounded-xl bg-background-50 border border-background-200/70 text-center hover:border-accent-300 transition-colors">
            <div className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center text-lg mb-2 ${comp.color}`}>
              <i className={comp.icon}></i>
            </div>
            <div className="text-xs font-semibold text-foreground-950">{comp.label}</div>
            <div className="text-[10px] text-emerald-600 mt-1">{comp.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}



