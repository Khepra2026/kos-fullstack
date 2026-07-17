import { memo } from 'react';
import { mockRiskFamilies, mockRiskStatuses } from '@/mocks/riskRegister';

interface Risk {
  id: string;
  famille: string;
  libelle: string;
  probabilite: number;
  impact: number;
  score: number;
  statut: string;
}

interface RiskStatsCardsProps {
  risks: Risk[];
  loading: boolean;
}

function StatBox({ icon, label, value, sublabel, colorClass }: {
  icon: string;
  label: string;
  value: string | number;
  sublabel?: string;
  colorClass: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 md:p-5 bg-background-50 rounded-lg border border-background-200/70">
      <div className={`w-11 h-11 flex items-center justify-center rounded-lg ${colorClass}`}>
        <i className={`${icon} text-lg`} />
      </div>
      <div>
        <div className="text-xl md:text-2xl font-bold text-foreground-950 font-heading">{value}</div>
        <div className="text-xs text-foreground-600 font-body">{label}</div>
        {sublabel && <div className="text-[10px] text-foreground-400 font-body">{sublabel}</div>}
      </div>
    </div>
  );
}

const RiskStatsCards = memo(function RiskStatsCards({ risks, loading }: RiskStatsCardsProps) {
  if (loading || risks.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-20 bg-background-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  const total = risks.length;
  const ouverts = risks.filter(r => r.statut === 'ouvert').length;
  const enTraitement = risks.filter(r => r.statut === 'en_traitement').length;
  const critiques = risks.filter(r => r.score >= 15).length;
  const scoreMoyen = (risks.reduce((a, b) => a + b.score, 0) / total).toFixed(1);
  const maxScore = Math.max(...risks.map(r => r.score));
  const famillesActives = new Set(risks.map(r => r.famille)).size;

  const getMaxFamily = () => {
    const counts: Record<string, number> = {};
    risks.forEach(r => { counts[r.famille] = (counts[r.famille] || 0) + 1; });
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    const fam = mockRiskFamilies.find(f => f.key === top?.[0]);
    return fam?.label || top?.[0] || '—';
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <StatBox icon="ri-file-warning-line" label="Risques totaux" value={total} sublabel={`${ouverts} ouverts`} colorClass="bg-primary-100 text-primary-700" />
      <StatBox icon="ri-fire-line" label="Risques critiques" value={critiques} sublabel="Score ≥ 15" colorClass="bg-red-100 text-red-700" />
      <StatBox icon="ri-bar-chart-box-line" label="Score moyen" value={scoreMoyen} sublabel={`Max: ${maxScore}`} colorClass="bg-accent-100 text-accent-700" />
      <StatBox icon="ri-folder-warning-line" label="En traitement" value={enTraitement} colorClass="bg-amber-100 text-amber-700" />
      <StatBox icon="ri-apps-line" label="Familles actives" value={famillesActives} sublabel={`Top: ${getMaxFamily()}`} colorClass="bg-secondary-100 text-secondary-700" />
      <StatBox icon="ri-time-line" label="Alertes actives" value={ouverts + enTraitement} colorClass="bg-emerald-100 text-emerald-700" />
    </div>
  );
});

export default RiskStatsCards;