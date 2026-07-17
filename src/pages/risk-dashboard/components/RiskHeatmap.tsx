import { memo } from 'react';
import { mockRiskFamilies } from '@/mocks/riskRegister';

interface DashboardRow {
  famille: string;
  nb_risques: number;
  score_moyen: string;
  score_max: number;
}

interface RiskHeatmapProps {
  dashboard: DashboardRow[];
  loading: boolean;
}

const familleOrder = ['strategique', 'operationnel', 'reglementaire', 'financier', 'esg', 'cyber', 'ia', 'fraude', 'reputation'];
const scoreLabels = [1, 2, 3, 4, 5];

function getHeatColor(score: number): string {
  if (score <= 5) return 'bg-emerald-400';
  if (score <= 10) return 'bg-amber-400';
  if (score <= 15) return 'bg-orange-400';
  return 'bg-red-500';
}

function getTextColor(score: number): string {
  if (score <= 10) return 'text-foreground-950';
  return 'text-white';
}

const RiskHeatmap = memo(function RiskHeatmap({ dashboard, loading }: RiskHeatmapProps) {
  if (loading || dashboard.length === 0) {
    return (
      <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
        <div className="h-48 bg-background-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  const byFamille: Record<string, DashboardRow> = {};
  dashboard.forEach(d => { byFamille[d.famille] = d; });

  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-foreground-950 font-heading">Heatmap Risques par Famille</h3>
        <div className="flex items-center gap-2 text-[10px] font-body">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />Faible</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />Modéré</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-orange-400" />Élevé</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-red-500" />Critique</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          {/* Header */}
          <div className="grid grid-cols-[140px_repeat(5,1fr)] gap-1 mb-1">
            <div className="text-[10px] font-semibold text-foreground-500 font-body uppercase">Famille</div>
            {scoreLabels.map(s => (
              <div key={s} className="text-center text-[10px] font-semibold text-foreground-500 font-body">Score {s * 5 - 4}–{s * 5}</div>
            ))}
          </div>

          {/* Rows */}
          {familleOrder.map(famKey => {
            const fam = mockRiskFamilies.find(f => f.key === famKey);
            const row = byFamille[famKey];
            const score = row ? Math.round(parseFloat(row.score_moyen)) : 0;
            const bucket = Math.min(5, Math.ceil(score / 5));

            return (
              <div key={famKey} className="grid grid-cols-[140px_repeat(5,1fr)] gap-1 mb-1">
                <div className="flex items-center gap-2 text-xs font-body text-foreground-700 py-1.5">
                  <span className={`w-2.5 h-2.5 rounded-sm ${fam?.color || 'bg-background-300'}`} />
                  <span className="truncate">{fam?.label || famKey}</span>
                </div>
                {scoreLabels.map(s => {
                  const isActive = s === bucket && score > 0;
                  const opacity = isActive ? 'opacity-100' : 'opacity-20';
                  return (
                    <div key={s} className={`h-8 rounded-md flex items-center justify-center text-xs font-bold transition-all ${isActive ? getHeatColor(score) + ' ' + getTextColor(score) : 'bg-background-200/70'} ${opacity}`}>
                      {isActive ? score : ''}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default RiskHeatmap;